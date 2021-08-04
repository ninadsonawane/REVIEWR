import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name:String,
  book:String,
  author:String,
  genre:String,
  review:String,
  selectedFile : String,
  createdAt : {
    type : Date,
    default : new Date()
  },
  likeCount : {
  type : Number,
  default : 0
  },
});

const ReviewPost = mongoose.model('ReviewPost' , reviewSchema);
export default ReviewPost;
