import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { 
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
    sendContactMessage,
    
    updateRole,
    deleteUser,
    getSingleUser,
    getAllUser,
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
router.route("/delete-profile").delete(verifyJWT, deleteProfile);
router.route("/refresh-tokens").post(refreshAccessToken);
router.route("/contact-message").post(verifyJWT, sendContactMessage);


// Admin routes
router.route("/admin/all-user").get(verifyJWT, authorizeRoles("admin"), getAllUser);
router.route("/admin/user/:id")
    .put(verifyJWT, authorizeRoles("admin"), updateRole)
    .delete(verifyJWT, authorizeRoles("admin"), deleteUser)
    .get(verifyJWT, authorizeRoles("admin"), getSingleUser)


export default router;