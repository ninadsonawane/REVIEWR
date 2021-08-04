import express from "express";
const router = express.Router();
import { getReviews , createReview, updateReview, deleteReview ,likeReview} from "../controllers/index.js";

router.get('/' , getReviews );
router.post('/' , createReview);
router.patch('/:id', updateReview);
router.delete('/:id' , deleteReview);
router.patch('/:id/likerv' , likeReview);
export default router;
