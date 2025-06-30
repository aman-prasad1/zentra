import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        trim: true,
        minLength: [3, "Name must contains atleast 2 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        trim: true,
        index: true,
        lowercase: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "Password must contains atleast 6 characters"]
    },
    verifyCode: {
        type: Number,
        required: true
    },
    verifyCodeExpiry: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);