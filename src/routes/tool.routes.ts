import { Router } from 'express';
import { 
  getTools, 
  getFeaturedTools, 
  getMyTools, 
  getToolById, 
  createTool, 
  updateTool, 
  deleteTool, 
  updateToolStatus, 
  toggleFeatureTool,
  getAnalytics
} from '../controllers/tool.controller';
import { auth } from '../middleware/auth';
import { verifyAdmin } from '../middleware/verifyAdmin';

const router = Router();

router.get('/featured', getFeaturedTools);
router.get('/my-tools', auth, getMyTools);
router.get('/analytics', auth, verifyAdmin, getAnalytics);
router.get('/:id', getToolById);
router.get('/', getTools);

router.post('/', auth, createTool);
router.put('/:id', auth, updateTool);
router.delete('/:id', auth, deleteTool);

router.patch('/:id/status', auth, verifyAdmin, updateToolStatus);
router.patch('/:id/feature', auth, verifyAdmin, toggleFeatureTool);

export default router;
