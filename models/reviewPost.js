import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name:String,
  creator:String, 
  book:String,
  author:String,
  genre:String,
  review:String,
  selectedFile : String,
  createdAt : { 
    type : Date,
    default : new Date()
  },
  likes : {
  type : [String],
  default : []
  },
});

const ReviewPost = mongoose.model('ReviewPost' , reviewSchema);
export default ReviewPost;
