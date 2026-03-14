import express from 'express';
import { getTestStatus } from '../controllers/controller.test';

const router = express.Router();

router.get('/test', getTestStatus);

export default router;