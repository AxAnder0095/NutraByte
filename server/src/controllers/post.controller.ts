import Post from "../models/post.model";
import { Request, Response } from "express";

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};


export const createPost = async (req: Request, res: Response) => {
    try {
        const { user, content, imageUrl } = req.body;
        const newPost = new Post({ user, content, imageUrl });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
};