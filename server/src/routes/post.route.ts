import { Router } from "express";
import * as postController from "../controllers/post.controller";

const router = Router();

router.get("/posts", postController.getAllPosts);
router.post("/posts", postController.createPost);

export default router;