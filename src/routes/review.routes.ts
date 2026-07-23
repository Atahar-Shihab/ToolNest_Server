import { Router } from 'express';
import { getReviews, getMyReviews, addReview, deleteReview } from '../controllers/review.controller';
import { auth } from '../middleware/auth';
import { verifyAdmin } from '../middleware/verifyAdmin';

const router = Router();

router.get('/my-reviews', auth, getMyReviews);
router.get('/:toolId', getReviews);
router.post('/', auth, addReview);
router.delete('/:id', auth, deleteReview);

export default router;
