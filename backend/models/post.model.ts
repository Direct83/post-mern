import mongoose from 'mongoose';

const PostModelSchema = new mongoose.Schema({
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

export interface PostModelType extends mongoose.Document {
  title: string,
  text: string,
  creator: string,
  like: [],
  dislike: [],
}
export const PostModel: mongoose.Model<PostModelType> = mongoose.model('PostModel', PostModelSchema);
