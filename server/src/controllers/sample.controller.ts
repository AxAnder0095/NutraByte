import { Request, Response } from "express";
import Sample from "../models/sample.model";

export const getSampleData = async (req: Request, res: Response) => {
    try {
        const samples = await Sample.find();
        res.status(200).json(samples);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sample data", error });
    }
};

export const createSampleData = async (req: Request, res: Response) => {
    try {
        const { name, value } = req.body;
        const newSample = await Sample.create({ name, value });
        res.status(201).json(newSample);
    } catch (error) {
        res.status(500).json({ message: "Error creating sample data", error });
    }
};

export const getSampleDataById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sample = await Sample.findById(id);
        if (!sample) {
            return res.status(404).json({ message: "Sample data not found" });
        }
        res.status(200).json(sample);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sample data", error });
    }
};