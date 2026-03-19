import { Request, Response } from "express";
import User from "../models/user.model";

interface CreateUserBody {
    auth0Id: string;
    email: string;
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    console.log("Received create user request");
    const secret = req.headers["x-auth0-secret"];

    if (secret !== process.env.WEBHOOK_SECRET) {
        console.log("Unauthorized request: invalid secret");
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const { auth0Id, email} = req.body as CreateUserBody;

    try {
        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) {
            console.log("User already exists:", existingUser);
            res.status(200).json(existingUser);
            return;
        }

        const newUser = await User.create({ auth0Id, email});
        console.log("User created successfully:", newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
