import { Router } from 'express';
import { getUsers, changeUserRole, deleteUser, getTopContributors, getUserStats } from '../controllers/user.controller';
import { auth } from '../middleware/auth';
import { verifyAdmin } from '../middleware/verifyAdmin';

const router = Router();

router.get('/top-contributors', getTopContributors);
router.get('/stats', auth, verifyAdmin, getUserStats);
router.get('/', auth, verifyAdmin, getUsers);
router.patch('/:id/role', auth, verifyAdmin, changeUserRole);
router.delete('/:id', auth, verifyAdmin, deleteUser);

export default router;
