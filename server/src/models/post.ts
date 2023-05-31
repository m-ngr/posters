import { Schema, model } from "mongoose";

interface IPost {
  name?: string;
  title: string;
  content: string;
  postedAt: Date;
}

const postSchema = new Schema<IPost>({
  name: { type: String, minlength: 1, maxlength: 40 },
  title: { type: String, required: true, minlength: 1, maxlength: 100 },
  content: { type: String, required: true, minlength: 1, maxlength: 5000 },
  postedAt: { type: Date, required: true },
});

export default model("post", postSchema);
