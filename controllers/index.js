import mongoose from "mongoose";
import express from "express";
import ReviewPost from "../models/reviewPost.js";

const router = express.Router();


export const getReviews = async (req, res) => {
    try {
        const reviewPosts = await ReviewPost.find();

        res.status(200).json(reviewPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createReview = async (req , res) => {
  const { name , book , author , review , genre , selectedFile } = req.body;
  const newReview = new ReviewPost({ name , book , author , review , genre , selectedFile });
  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (e) {
   res.json("Error is " + e)
  }
};

export const updateReview = async (req , res) => {
  const { id } = req.params;
  const { name, book , author , review , genre} = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  const updatedReview = { name, book , author , review , genre , id }
  const upr = await ReviewPost.findByIdAndUpdate( id , updatedReview , {new: true} );
  res.json(upr);
}
 
export const deleteReview = async (req , res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  await ReviewPost.findByIdAndRemove( id );
  res.json({ message: 'Post Deleted'});
}


export const likeReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const rv = await ReviewPost.findById(id);

  const updatedrv = await ReviewPost.findByIdAndUpdate(id, { likeCount: rv.likeCount + 1 }, { new: true });
  
  res.json(updatedrv);
}