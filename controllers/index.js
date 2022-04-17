import mongoose from "mongoose";
import express from "express";
import ReviewPost from "../models/reviewPost.js";

const router = express.Router();


export const getReviews = async (req, res) => {
    try {
        const reviewPosts = await ReviewPost.find();
        console.log("322");
        res.status(200).json(reviewPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createReview = async (req , res) => {
  const rv = req.body;
  const newReview = new ReviewPost({ ...rv , creator: req.userId , createdAt : new Date().toISOString() });
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
  if(!req.userId) return res.json({ message:'Unauthenticated!'});
 
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  const rv = await ReviewPost.findById(id);
  
  const index = rv.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    rv.likes.push(req.userId);
  } else {
    rv.likes = rv.likes.filter((id) => id !== String(req.userId))
  }

  const updatedrv = await ReviewPost.findByIdAndUpdate(id, rv , { new: true });
  
  res.json(updatedrv);
}