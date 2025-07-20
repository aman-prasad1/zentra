import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { TAX_RATE } from '../constants.js';
import { createRazorpayOrder, verifyRazorpayPayment } from '../utils/Razorpay.js';


const makeOrder = asyncHandler(async (req, res) => {
    const {
        shippingInfo,
        orderedProducts,
        paymentMethod,
    } = req.body;
    
    // checking shippingInfo
    if (!shippingInfo ||
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.state ||
        !shippingInfo.country ||
        !shippingInfo.pinCode ||
        !shippingInfo.phoneNo
    ) {
        throw new ApiError(400, "Shipping Information is required");
    }

    // Accepting online and Cash on Delivery only
    if (!["COD", "Online"].includes(paymentMethod)) {
        throw new ApiError(400, "Invalid payement type");
    }

    // checking orderedProducts array is available
    if (!orderedProducts) {
        throw new ApiError(400, "Ordered Product list required");
    }
    
    // declaring variabels for calculating prices
    let itemsPrice = 0, taxPrice = 0, shippingPrice = 30;
    const orderItems = [];
    
    // checking all prducts are available on store
    // looping the the given orderedItems and making array of correct orderItems array
    for (let i = 0; i < orderedProducts.length; i++) {
        // checking for order id and quantity is provided
        if(!orderedProducts[i].id || !orderedProducts[i].quantity) {
            throw new ApiError(400, "Ordered Products details required");
        }
        
        // Checking for provided products are valid or not
        const product = await Product.findById(orderedProducts[i].id);
        if (!product) {
            throw new ApiError(404, `ProductId: ${orderedProducts[i].id} is invalid`);
        }

        // changing -ve quantity to -ve quantity
        orderedProducts[i].quantity = Math.abs(orderedProducts[i].quantity)
        
        // checking required stock is avalilable
        if(orderedProducts[i].quantity > product.stock) {
            throw new ApiError(402, `Product: ${orderedProducts[i].id} is low in stock`)
        }

        // Updating product stock
        product.stock = product.stock - orderedProducts[i].quantity;

        // calculating prices
        itemsPrice += product.price * orderedProducts[i].quantity;

        // pushing correct format orderItems to save
        orderItems.push({
            name: product.name,
            price: product.price,
            quantity: orderedProducts[i].quantity,
            image: product.images[0],
            product: product._id
        })
        
        await product.save();
    }

    // calculating tax price on all products and calculating total price 
    taxPrice = (itemsPrice * TAX_RATE) / 100;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // saving orders
    const order = new Order({
        shippingInfo: shippingInfo,
        orderItems: orderItems,
        user: req.user._id,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice
    })
    
    // handling online payment
    if (paymentMethod === "Online") {
        const razorpayResponse = await createRazorpayOrder(order.totalPrice, order._id);
        
        if(razorpayResponse.success) {
            order.razorpay_order_id = razorpayResponse.orderId;
        } else {
            throw new ApiError(500, "Something went wrong while making payment Id");
        }
    }

    await order.save();
    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Order Created. Wating for payment", {order, RAZORPAY_KEY_ID:RAZORPAY_KEY_ID})
        )
})

const verifyOrderPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const verificationResponse = await verifyRazorpayPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if(!verificationResponse.success) {
        // if payement not verified
        throw new ApiError(400, "Payment not verified");
    }

    const order = await Order.find({razorpay_order_id: razorpay_order_id});
    order.razorpay_payment_id = razorpay_payment_id;
    order.razorpay_signature = razorpay_signature;
    order.paidAt = new Date();

    await order.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Payment verified Successfully", {order})
        )
})

const getMyOrders = asyncHandler(async (req, res) => {
    
    // finding user
    const orders = await Order.find({user: req.user?._id});

    if(!orders) {
        throw new ApiError(400, "No orders from this user");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Order fetched successfully", {orders})
        )
})

const getOneOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(!order || order.user.toString() != req.user._id.toString()) {
        throw new ApiError(400, "Invalid Order ID");
    }


    return res
        .status(200)
        .json(
            new ApiResponse(200, "Order fetched Successfully", {order})
        )
})

// Admin controllers
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "All orders fetched", {orders})
        )
})

const ordersByUser = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.params.id});

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Fetched all orders by this user", {orders})
        )
})

const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const { orderStatus } = req.body;

    if(!order) {
        throw new ApiError(404, "Order not found");
    }

    if(order.orderStatus === "Delivered") {
        throw new ApiError(400, "Order allready Delivered");
    }

    // checking if payment is in online mode and pending then cann't change the orderStatus
    if(order.paymentMethod === "Online" && order.paidAt === null) {
        throw new ApiError(400, "Payment Method is online mode and payment is pending");
    }

    if(orderStatus === "Shipped") {
        order.orderStatus = "Shipped";

    } else if(orderStatus === "Delivered") {
        order.orderStatus = "Delivered";
        order.paidAt = new Date();
        order.deliveredAt = new Date();

    } else {
        throw new ApiError(400, "Invalid order Status");
    }

    // saving order
    await order.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Updated Successfully", {order})
        )
})

export {
    makeOrder,
    verifyOrderPayment,
    getMyOrders,
    getOneOrder,

    getAllOrders,
    ordersByUser,
    updateOrderStatus,
}