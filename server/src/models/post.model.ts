import mongoose from "mongoose";
import User from "./user.model";

interface IPost {
    _id?: mongoose.Types.ObjectId; // Optional _id field for MongoDB documents
    user: mongoose.Types.ObjectId | any; // Reference to the User model
    content: string;
    imageUrl?: string; // Optional image URL
}

const PostSchema = new mongoose.Schema<IPost>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: [true, "Content is required"] },
    imageUrl: { type: String }, // Optional field for image URL
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;