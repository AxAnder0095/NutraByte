import User from "../models/user.model";
import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/post.model";

const getParam = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) {
        return value[0];
    }

    return value;
};

type AuthPayload = {
    sub?: string;
    [key: string]: unknown;
};

type AuthenticatedRequest = Request & {
    auth?: AuthPayload;
};

const getAuth0Sub = (req: AuthenticatedRequest) => {
    const sub = req.auth?.sub;
    return typeof sub === "string" ? sub : null;
};

const ensureActorOwnsUserId = async (
    req: AuthenticatedRequest,
    res: Response,
    id: string,
) => {
    const auth0Sub = getAuth0Sub(req);

    if (!auth0Sub) {
        res.status(401).json({ message: "Missing Auth0 subject in token" });
        return false;
    }

    const actorOwnsId = await User.exists({ _id: id, auth0Id: auth0Sub });
    if (!actorOwnsId) {
        res.status(403).json({ message: "You can only modify your own user resource" });
        return false;
    }

    return true;
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
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
        const authReq = req as AuthenticatedRequest;
        const auth0Id = getAuth0Sub(authReq);

        if (!auth0Id) {
            return res.status(401).json({ message: "Missing Auth0 subject in token" });
        }

        const existingUser = await User.findOne({ auth0Id }).select("-password");
        if (existingUser) {
            return res.status(200).json(existingUser);
        }

        const { username, email } = req.body as { username?: string; email?: string };

        if (!username || !email) {
            return res.status(400).json({
                message: "username and email are required when creating a new user",
            });
        }

        const newUser = new User({ auth0Id, username, email });
        await newUser.save();
        const savedUser = await User.findById(newUser._id).select("-password");
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

export const followUser = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest;
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

        const isAuthorized = await ensureActorOwnsUserId(authReq, res, id);
        if (!isAuthorized) {
            return;
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

        const updatedUser = await User.findById(id).select("-password");
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error following user", error });
    }
};

export const unfollowUser = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const id = getParam(req.params.id);
        const targetId = getParam(req.params.targetId);

        if (!id || !targetId) {
            return res.status(400).json({ message: "Missing user id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(targetId)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const isAuthorized = await ensureActorOwnsUserId(authReq, res, id);
        if (!isAuthorized) {
            return;
        }

        await Promise.all([
            User.findByIdAndUpdate(id, { $pull: { following: targetId } }),
            User.findByIdAndUpdate(targetId, { $pull: { followers: id } }),
        ]);

        const updatedUser = await User.findById(id).select("-password");
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
        const authReq = req as AuthenticatedRequest;
        const id = getParam(req.params.id);
        const postId = getParam(req.params.postId);

        if (!id || !postId) {
            return res.status(400).json({ message: "Missing id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const isAuthorized = await ensureActorOwnsUserId(authReq, res, id);
        if (!isAuthorized) {
            return;
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
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error liking post", error });
    }
};

export const unlikePost = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const id = getParam(req.params.id);
        const postId = getParam(req.params.postId);

        if (!id || !postId) {
            return res.status(400).json({ message: "Missing id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const isAuthorized = await ensureActorOwnsUserId(authReq, res, id);
        if (!isAuthorized) {
            return;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { likedPosts: postId } },
            { new: true },
        ).select("-password");

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
        const authReq = req as AuthenticatedRequest;
        const id = getParam(req.params.id);
        const postId = getParam(req.params.postId);

        if (!id || !postId) {
            return res.status(400).json({ message: "Missing id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const isAuthorized = await ensureActorOwnsUserId(authReq, res, id);
        if (!isAuthorized) {
            return;
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
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error saving post", error });
    }
};

export const unsavePost = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const id = getParam(req.params.id);
        const postId = getParam(req.params.postId);

        if (!id || !postId) {
            return res.status(400).json({ message: "Missing id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const isAuthorized = await ensureActorOwnsUserId(authReq, res, id);
        if (!isAuthorized) {
            return;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { savedPosts: postId } },
            { new: true },
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error unsaving post", error });
    }
};