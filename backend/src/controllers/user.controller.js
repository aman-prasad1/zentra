import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';

const generateAccessRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, "Error while generating access and refresh tokens");
    }
}

const registerUser = asyncHandler(async (req, res) => {

    // extracting name, email, password and confirmPassword from requres body
    const { name, email, password, confirmPassword } = req.body;
    const avatarLocalPath = req.file?.path;


    // if any fields are missing, remove saved avatar and throw an error
    if ([name, email, password, confirmPassword].some((field) => !field || field?.trim() === "")) {
        fs.unlink(avatarLocalPath, (error) => {});
        throw new ApiError(400, "All fields are required");
    }

    if(password != confirmPassword) {
        fs.unlink(avatarLocalPath, (error) => {});
        throw new ApiError(400, "Confirm Passwrod and Password should be same");
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }


    // checking user already existed or not
    const existedUser = await User.findOne({ "email": email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 3 * 60 * 1000);

    // if user already exists and verified
    if (existedUser && existedUser.isVerified === true) {
        fs.unlink(avatarLocalPath, (error) => {});
        throw new ApiError(400, "User with this email already exists");
    }

    // if user already exists but not verified
    if (existedUser && existedUser.isVerified === false) {

        // if old verifyCode expired, update user details and send new OTP
        if (existedUser.verifyCodeExpiry < new Date()) {
            existedUser.name = name;
            existedUser.email = email;
            existedUser.password = password;
            existedUser.verifyCode = verifyCode;
            existedUser.verifyCodeExpiry = verifyCodeExpiry; // expire in 3 minutes from now
            const avatar = await uploadOnCloudinary(avatarLocalPath); // upload avatar on cloudinary
            existedUser.avatar = avatar.url;
            await existedUser.save();
            
            const subject = "Zentra Verification Code";
            const message = `Your verification code: ${verifyCode}`;
            const emailResponse = await sendVerificationEmail(email, subject, message); // sending verification OTP
            if (!emailResponse.success) {
                throw new ApiError(500, "Something went wrong while sending verification mail");
            } else {
                return res
                .status(200)
                .json(
                    new ApiResponse(200, {}, "OTP sent to you mail")
                )
            }
        } else { // if verify code is not expired, throw error 
            fs.unlink(avatarLocalPath, (error) => {});
            throw new ApiError(400, "Try again after some time");
        }
    }

    // user does not exisits
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    
    const user = new User({
        name: name,
        email: email,
        avatar: avatar.url,
        password: password,
        verifyCode: verifyCode,
        verifyCodeExpiry: verifyCodeExpiry
    });

    await user.save();

    const subject = "Zentra Verification Code";
    const message = `Your verification code: ${verifyCode}`;
    const emailResponse = await sendVerificationEmail(email, subject, message); // sending verification OTP
    if (!emailResponse.success) {
        throw new ApiError(500, "Something went wrong while sending verification mail");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "OTP sent to you mail")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // checking for all fields
    if([email, password].some((field) => !field || field?.trim() === "")) {
        throw new ApiError(401, "All fields are required");
    }

    const user = await User.findOne({email: email});

    if(!user || user.isVerified === false) {
        throw new ApiError(404, "User Not Found");
    }

    // Matching password
    const isPasswordMatched = await user.isPasswordCorrect(password);
    
    if(!isPasswordMatched) {
        throw new ApiError(400, "Incorrect Password");
    }

    const {accessToken, refreshToken} = await generateAccessRefreshToken(user?._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {accessToken, refreshToken}, "User logged In Successfully")
    );
})

const logoutUser = asyncHandler(async (req, res) => {
    
    // finding user and unset refresh token
    await User.findOneAndUpdate(
        req.user._id,
        {
            $unset: {refreshToken: 1}
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    res
    .status(201)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(201, {}, "User logged Out")
    )
    
})

const verifyUser = asyncHandler(async (req, res) => {
    const { email, verifyCode } = req.body;

    // Checking for email and verfiyCode
    if(!email || email.trim() === "") {
        throw new ApiError(400, "Email is required");
    }
    if(!verifyCode) {
        throw new ApiError(400, "Verification Code is required");
    }

    const user = await User.findOne({email: email});

    if(!user) {
        throw new ApiError(400, "User with this email does not exists");
    }

    // if user is already verified the throw error
    if(user.isVerified) {
        throw new ApiError(400, "User with this email already verified");
    }

    // checking verification code expiry
    if(user.verifyCodeExpiry < new Date()) {
        throw new ApiError(400, "Verification Code expired. Please try again");
    }

    // matching verification code
    if(user.verifyCode !== verifyCode) {
        throw new ApiError(400, "Incorrect verification code");
    }

    // updating user
    user.isVerified = true;
    await user.save({validateBeforeSave: false});

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "User verified Successfully")
        );
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if(newPassword !== confirmNewPassword) {
        throw new ApiError(400, "New Password and Confirm Password should be same");
    }

    const user = await User.findById(req.user._id);

    const passwordMatched = await user.isPasswordCorrect(oldPassword);

    if(!passwordMatched) {
        throw new ApiError(400, "Incorrect Password");
    }
    
    // checking if newPasswrod and oldPassword were not same
    const isSame = await user.isPasswordCorrect(newPassword);
    if(isSame) {
        throw new ApiError(400, "New Password cannot same as old password");
    }

    user.password = newPassword;
    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Passwrod updated")
        )

})

// Admin controllers
const assignAdmin = asyncHandler(async (req, res) => {
    const { userEmail } = req.body;

    if(!userEmail || userEmail.trim() === "") {
        throw new ApiError(400, "User Email required");
    }

    const user = await User.findOne({email: userEmail});

    if(!user) {
        throw new ApiError(400, "User with this email does not exists");
    }
    if(!user.isVerified) {
        throw new ApiError(400, "Requested User is not verified");
    }
    if(user.role === "admin") {
        throw new ApiError(401, "Requested user is already admin");
    }

    // assigining user as admin
    user.role = "admin";
    await user.save({validateBeforeSave: false});

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Requested user is now admin")
        )
})




export {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
    changePassword,
    assignAdmin,
}