import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { TAX_RATE } from '../constants.js';


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
        
        product.save();
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
    order.save();

    // handling online payment
    if (paymentMethod === "Online") {
        // TODO: request a rayzor payment of totalPrice

    } else {
        // if payment method is Cash On Delivery
        return res
            .status(200)
            .json(
                new ApiResponse(200, order, "Order Placed Successfully")
            )
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {order, }, "Order Created. Wating for payment")
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
            new ApiResponse(200, orders, "Order fetched successfully")
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
            new ApiResponse(200, order, "Order fetched Successfully")
        )
})

export {
    makeOrder,
    getMyOrders,
    getOneOrder,
}