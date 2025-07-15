import mongoose, { Document, Schema } from "mongoose";

// Define the interface
export interface IFile extends Document {
    filename: string;
    secure_url: string;
    format: string;
    sizeInBytes: string;
    sender?: string;
    receiver?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define schema
const fileSchema = new Schema<IFile>(
    {
        filename: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            required: true,
        },
        sizeInBytes: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
        },
        receiver: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Export model
const File = mongoose.model<IFile>("File", fileSchema);
export default File;
