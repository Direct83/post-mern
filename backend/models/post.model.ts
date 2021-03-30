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
    userName: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
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
interface Creator {
  userName: string,
  userId: string,
}
export interface PostModelType extends mongoose.Document {
  title: string,
  text: string,
  creator: Creator,
  like: [],
  dislike: [],
}
export const PostModel: mongoose.Model<PostModelType> = mongoose.model('PostModel', PostModelSchema);
