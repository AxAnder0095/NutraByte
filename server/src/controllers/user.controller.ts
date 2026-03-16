import User from "../models/user.model";
import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/post.model";

// const getParam = (value: string | string[] | undefined) =>
//     Array.isArray(value) ? value[0] : value;

const getParam = (value: string | string[] | undefined) => {
    console.log("getParam received value:", value); // Debugging log
    if (Array.isArray(value)) {
        return value[0];
    }

    return value;
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

export const followUser = async (req: Request, res: Response) => {
    try {
        const id = getParam(req.params.id);
        const targetId = getParam(req.params.targetId);

        if (!id || !targetId) {
            return res.status(400).json({ message: "Missing user id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(targetId)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        if (id === targetId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const [actor, target] = await Promise.all([
            User.findById(id),
            User.findById(targetId),
        ]);

        if (!actor || !target) {
            return res.status(404).json({ message: "User not found" });
        }

        await Promise.all([
            User.findByIdAndUpdate(id, { $addToSet: { following: targetId } }),
            User.findByIdAndUpdate(targetId, { $addToSet: { followers: id } }),
        ]);

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error following user", error });
    }
};

export const unfollowUser = async (req: Request, res: Response) => {
    try {
        const id = getParam(req.params.id);
        const targetId = getParam(req.params.targetId);

        if (!id || !targetId) {
            return res.status(400).json({ message: "Missing user id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(targetId)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        await Promise.all([
            User.findByIdAndUpdate(id, { $pull: { following: targetId } }),
            User.findByIdAndUpdate(targetId, { $pull: { followers: id } }),
        ]);

        const updatedUser = await User.findById(id);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error unfollowing user", error });
    }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const id = getParam(req.params.id);
        const postId = getParam(req.params.postId);

        if (!id || !postId) {
            return res.status(400).json({ message: "Missing id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const [user, post] = await Promise.all([
            User.findById(id),
            Post.findById(postId),
        ]);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $addToSet: { likedPosts: postId } },
            { new: true },
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error liking post", error });
    }
};

export const unlikePost = async (req: Request, res: Response) => {
    try {
        const id = getParam(req.params.id);
        const postId = getParam(req.params.postId);

        if (!id || !postId) {
            return res.status(400).json({ message: "Missing id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { likedPosts: postId } },
            { new: true },
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error unliking post", error });
    }
};

export const savePost = async (req: Request, res: Response) => {
    try {
        const id = getParam(req.params.id);
        const postId = getParam(req.params.postId);

        if (!id || !postId) {
            return res.status(400).json({ message: "Missing id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const [user, post] = await Promise.all([
            User.findById(id),
            Post.findById(postId),
        ]);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $addToSet: { savedPosts: postId } },
            { new: true },
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error saving post", error });
    }
};

export const unsavePost = async (req: Request, res: Response) => {
    try {
        const id = getParam(req.params.id);
        const postId = getParam(req.params.postId);

        if (!id || !postId) {
            return res.status(400).json({ message: "Missing id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { savedPosts: postId } },
            { new: true },
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error unsaving post", error });
    }
};