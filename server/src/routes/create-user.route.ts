import { Router } from 'express';
import { createUser } from '../controllers/create-user.controller';

const router = Router();

// Route for creating a new user (called by Auth0 webhook)
router.post("/auth/create-user", createUser);

export default router;