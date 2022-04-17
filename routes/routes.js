import express from "express";
const router = express.Router();
import { getReviews , createReview, updateReview, deleteReview ,likeReview} from "../controllers/index.js";
import auth from "../middleware/auth.js"

router.get('/' , getReviews );
router.post('/' ,auth, createReview);
router.patch('/:id',auth, updateReview);
router.delete('/:id' ,auth, deleteReview);
router.patch('/:id/likerv' , auth,likeReview);
export default router; 
