import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/user", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.createUser);

export default router;