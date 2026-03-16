import Post from "../models/post.model";
import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user.model";

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate("user", "username");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};


export const createPost = async (req: Request, res: Response) => {
    try {
        const { user, content, imageUrl } = req.body;

        console.log("Received post data:", { user, content, imageUrl }); // Debugging log
        if (!user || !mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ message: "A valid userId is required" });
        }

        // const userExists = await User.exists({ _id: userId });
        // if (!userExists) {
        //     return res.status(404).json({ message: "User not found" });
        // }
        const userDoc = await User.findById(user); // Fetch the user document to ensure it exists and to populate the post
        if (!userDoc) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new Post({ user: userDoc._id, username: userDoc.username, content, imageUrl }); // Store both userID and username in the post document
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
};