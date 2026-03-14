import mongoose from "mongoose";

interface ISample {
    _id?: mongoose.Types.ObjectId; // Optional _id field for MongoDB documents
    name: string;
    value: number;
}

const SampleSchema = new mongoose.Schema<ISample>({
    name: { type: String, required: [true, "Name is required"] },
    value: { type: Number, required: [true, "Value is required"] },
}, {
    timestamps: true,
});

const Sample = mongoose.model<ISample>("Sample", SampleSchema);

export default Sample;