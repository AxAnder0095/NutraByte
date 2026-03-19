import { Router } from "express";
import { checkJwt } from "../middleware/auth.middleware"
import * as userController from "../controllers/user.controller";

const router = Router();
    
router.get("/user", checkJwt, userController.getAllUsers);
router.get("/user/:id", checkJwt, userController.getUserById);
// router.post("/user/create", checkJwt, userController.createUser);

// Follow/unfollow routes
router.post("/user/:id/follow/:targetId", checkJwt, userController.followUser);
router.delete("/user/:id/follow/:targetId", checkJwt, userController.unfollowUser);

// Like/unlike and save/unsave routes
router.post("/user/:id/like/:postId", checkJwt, userController.likePost);
router.delete("/user/:id/like/:postId", checkJwt, userController.unlikePost);

// Save/unsave routes
router.post("/user/:id/save/:postId", checkJwt, userController.savePost);
router.delete("/user/:id/save/:postId", checkJwt, userController.unsavePost);

export default router;