import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId; // Optional _id field for MongoDB documents
    username: string;
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: [true, "Username is required"], unique: true },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: { type: String, required: [true, "Password is required"] },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;