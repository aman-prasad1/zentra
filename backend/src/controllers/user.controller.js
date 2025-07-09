import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import crypto from 'crypto';
import fs from 'fs';
import jwt from 'jsonwebtoken';

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

            await deleteFromCloudinary(existedUser.avatar.public_id);

            const avatar = await uploadOnCloudinary(avatarLocalPath); // upload avatar on cloudinary
            existedUser.avatar.public_url = avatar.url;
            existedUser.avatar.public_id = avatar.public_id;

            
            const subject = "Zentra Verification Code";
            const message = `Your verification code: ${verifyCode}`;
            const emailResponse = await sendVerificationEmail(email, subject, message); // sending verification OTP
            if (!emailResponse.success) {
                await deleteFromCloudinary(avatar.public_id);
                throw new ApiError(500, "Something went wrong while sending verification mail");
            } else {
                await existedUser.save(); // save user if everything is ok
                return res
                .status(200)
                .json(
                    new ApiResponse(200, "OTP sent to you mail")
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
        avatar: {
            public_id: avatar.public_id,
            public_url: avatar.url
        },
        password: password,
        verifyCode: verifyCode,
        verifyCodeExpiry: verifyCodeExpiry
    });

    
    const subject = "Zentra Verification Code";
    const message = `Your verification code: ${verifyCode}`;
    const emailResponse = await sendVerificationEmail(email, subject, message); // sending verification OTP
    if (!emailResponse.success) {
        await deleteFromCloudinary(avatar.public_id);
        throw new ApiError(500, "Something went wrong while sending verification mail");
    }
    
    await user.save(); // if every thing is ok, save user details

    return res
    .status(200)
    .json(
        new ApiResponse(200, "OTP sent to you mail")
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

    const loggedUser = await User.findById(user._id).select("-password -refreshToken -verifyCode -verifyCodeExpiry -resetPasswordToken -resetPasswordTokenExpire");

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
        new ApiResponse(200, "User logged In Successfully", {user: loggedUser})
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
        new ApiResponse(201, "User logged Out")
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
            new ApiResponse(200, "User verified Successfully")
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
            new ApiResponse(200, "Passwrod updated")
        )

})

const forgetPasswrod = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if(!email || email.trim() === "") {
        throw new ApiError(400, "Please enter Email");
    }

    const user = await User.findOne({email: email});

    if(!user || !user.isVerified) {
        throw new ApiError(400, "User with this email does not exists");
    }
    
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${process.env.CORS_ORIGIN}/user/reset-password/${resetToken}`;
    const message = `Your password reset URL is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    const emailResponse = await sendVerificationEmail(email, "Password Recovery", message);

    if(emailResponse.success === false) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        
        throw new ApiError(500, "Something went wrong while sending Recovery Mail");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Password Recovery mail sent")
        )
})

const resetPassword = asyncHandler(async (req, res) => {
    const { email, newPassword, confirmNewPassword } = req.body;

    if([email, newPassword, confirmNewPassword].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");


    const user = await User.findOne({email: email});

    if(!user || !user.isVerified) {
        throw new ApiError(400, "User does not exists");
    }

    if( !user.resetPasswordToken 
        || user.resetPasswordToken !== resetPasswordToken 
        || user.resetPasswordTokenExpire < new Date()) 
    {
        throw new ApiError(400, "Reset Password Token is Invalid or Expired");
    }

    if(newPassword !== confirmNewPassword) {
        throw new ApiError(400, "New Password and Confirm Password should be same")
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Password changed")
        )
})

const getUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken -verifyCode -verifyCodeExpiry -resetPasswordToken -resetPasswordTokenExpire");

    return res
        .status(200)
        .json(
            new ApiResponse(200, "User fetched Successfully", {user})
        )
})

const updateProfile = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const avatarLocalPath = req.file?.path;

    if(!name && !avatarLocalPath) {
        fs.unlink(avatarLocalPath, (error) => {});
        throw new ApiError(400, "Update fields are required");
    }

    const user = await User.findById(req.user._id).select("-password -refreshToken -verifyCode -verifyCodeExpiry -resetPasswordToken -resetPasswordTokenExpire");

    // if avatar is not requested to change
    if(!avatarLocalPath) {
        user.name = name;
        await user.save();

        return res
            .status(200)
            .json(
                new ApiResponse(200, "Profile updated successfully", {user})
            )
    }

    // if avatar is requested to change.
    const newAvatar = await uploadOnCloudinary(avatarLocalPath);

    if(!newAvatar) {
        fs.unlink(avatarLocalPath, (error) => {});
        throw new ApiError(400, "Something went wrong while updating profile picture");
    }
    
    // deleting old avatar
    const oldPublic_id = user.avatar.public_id;
    await deleteFromCloudinary(oldPublic_id);

    user.avatar.public_id = newAvatar.public_id;
    user.avatar.public_url = newAvatar.url;
    if(name && name.trim() !== "") {
        user.name = name;
    }
    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Profile updated Successfully", {user})
        )
})

const deleteProfile = asyncHandler(async (req, res) => {
    const { password } = req.body;

    if(!password) {
        throw new ApiError(400, "Password is required");
    }

    const user = await User.findById(req.user._id);

    if(!user) {
        throw new ApiError(400, "User does not exists");
    }

    const isPasswordMatched = await user.isPasswordCorrect(password);
    if(!isPasswordMatched) {
        throw new ApiError(400, "Incorrect Password");
    }

    // removing avatar from cloudinary
    const imageId = user.avatar.public_id;

    await user.deleteOne();
    await deleteFromCloudinary(imageId);

    return res
        .status(201)
        .json(
            new ApiResponse(201, "User deleted Successfully")
        )

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incommingRefreshToken) {
        throw new ApiError(401, "Unauthorized Access");
    }

    const decodedToken = jwt.verify(
        incommingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken._id);
    
    if(!user) {
        throw new ApiError(400, "Invalid Refresh Token");
    }

    if(incommingRefreshToken !== user.refreshToken) {
        throw new ApiError(400, "RefreshToken expired or used");
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "Tokens refreshed", {accessToken, refreshToken})
        )
})

// Admin controllers
const updateRole = asyncHandler(async (req, res) => {
    const { newRole } = req.body;

    if(!newRole || newRole.trim() === "") {
        throw new ApiError(400, "New Role required");
    }

    if(!["user", "admin"].includes(newRole)) {
        throw new ApiError(400, "Invalid Role Type");
    }

    const user = await User.findById(req.params.id);


    if(!user) {
        throw new ApiError(400, "User with this email does not exists");
    }
    if(!user.isVerified) {
        throw new ApiError(400, "Requested User is not verified");
    }

    // assigining user as admin
    user.role = newRole;
    await user.save({validateBeforeSave: false});

    return res
        .status(200)
        .json(
            new ApiResponse(200, `Requested User is now ${newRole}`)
        )
})

const deleteUser = asyncHandler(async (req, res) => {
    
    const userToDelete = await User.findById(req.params.id);

    if(!userToDelete) {
        throw new ApiError(400, "User does not exists");
    }

    // removing avatar from cloudinary
    const imageId = userToDelete.avatar.public_id;

    await userToDelete.deleteOne();
    await deleteFromCloudinary(imageId);

    return res
        .status(201)
        .json(
            new ApiResponse(201, "User deleted Successfully")
        )
})

const getSingleUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id).select("-password");

    if(!user) {
        throw new ApiError(400, "User does not exists");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "User fetched successfully", {user})
        )
})

const getAllUser = asyncHandler(async (req, res) => {

    const allUsers = await User.find().select("-password -refreshToken -verifyCode -verifyCodeExpiry -resetPasswordToken -resetPasswordTokenExpire");

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Fetched all users Successfully", {allUsers})
        )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
    changePassword,
    forgetPasswrod,
    resetPassword,
    getUserDetails,
    updateProfile,
    deleteProfile,
    refreshAccessToken,
    
    updateRole,
    deleteUser,
    getSingleUser,
    getAllUser,
}