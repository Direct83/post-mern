import mongoose from 'mongoose';
var PostModelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    like: {
        type: Array,
        default: [],
    },
    dislike: {
        type: Array,
        default: [],
    },
});
export var PostModel = mongoose.model('PostModel', PostModelSchema);
