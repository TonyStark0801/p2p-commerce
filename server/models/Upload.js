import mongoose from "mongoose";

const upload = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
});

const Upload = mongoose.model("Upload", upload);

export default Upload;