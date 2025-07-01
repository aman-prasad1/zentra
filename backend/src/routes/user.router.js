import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { 
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
    assignAdmin,
    changePassword,
    forgetPasswrod,
    resetPassword,
    getUserDetails,
    updateProfile,
    deleteUser,
 } from '../controllers/user.controller.js';


const router = Router();

// User routes
router.route("/register").post(upload.single('avatar'), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/verify-user").post(verifyUser);
router.route("/change-password").put(verifyJWT, changePassword);
router.route("/forgot-password").post(forgetPasswrod);
router.route("/reset-password/:token").put(resetPassword);
router.route("/get-user").get(verifyJWT, getUserDetails);
router.route("/update-profile").put(verifyJWT, upload.single('newAvatar'), updateProfile);
router.route("/delete-user").delete(verifyJWT, deleteUser);


// Admin routes
router.route("/assign-admin").post(verifyJWT, authorizeRoles("admin"), assignAdmin);


export default router;