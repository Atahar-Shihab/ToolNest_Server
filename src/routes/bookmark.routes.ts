import { Router } from 'express';
import { toggleBookmark, getBookmarks, checkBookmark } from '../controllers/bookmark.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/toggle', auth, toggleBookmark);
router.get('/', auth, getBookmarks);
router.get('/check/:toolId', auth, checkBookmark);

export default router;
