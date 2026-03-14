import { Router } from "express";
import { getSampleData, createSampleData, getSampleDataById } from "../controllers/sample.controller";

const router = Router();

router.get('/sample', getSampleData);
router.get('/sample/:id', getSampleDataById);
router.post('/sample', createSampleData);

export default router;