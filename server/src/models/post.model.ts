import mongoose from "mongoose";

interface IPost {
    _id?: mongoose.Types.ObjectId; // Optional _id field for MongoDB documents
    user: mongoose.Types.ObjectId; // Reference to the User model
    username?: string; // Optional username field for easier access to the username without needing to populate
    content: string;
    imageUrl?: string; // Optional image URL
}

const PostSchema = new mongoose.Schema<IPost>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String }, // Optional field for username
    content: { type: String, required: [true, "Content is required"] },
    imageUrl: { type: String }, // Optional field for image URL
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;