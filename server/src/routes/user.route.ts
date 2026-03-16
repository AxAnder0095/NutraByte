import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/user", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.createUser);

// Follow/unfollow routes
router.post("/user/:id/follow/:targetId", userController.followUser);
router.delete("/user/:id/follow/:targetId", userController.unfollowUser);

// Like/unlike and save/unsave routes
router.post("/user/:id/like/:postId", userController.likePost);
router.delete("/user/:id/like/:postId", userController.unlikePost);

// Save/unsave routes
router.post("/user/:id/save/:postId", userController.savePost);
router.delete("/user/:id/save/:postId", userController.unsavePost);

export default router;