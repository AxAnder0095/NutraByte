import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId; // Optional _id field for MongoDB documents
    auth0Id: string;
    username: string;
    email: string;
    password?: string;
    following: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    likedPosts: mongoose.Types.ObjectId[];
    savedPosts: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<IUser>({
    auth0Id: { type: String, required: [true, "Auth0 user id is required"], unique: true },
    username: { type: String, required: [true, "Username is required"], unique: true },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: { type: String, required: false, select: false },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;