import express from 'express'
const router = express.Router();
import {signup,login,profile} from '../controllers/userController'
import protect from '../middlewares/authMiddleware';

router.post('/signup', signup);
router.post('/login',protect, login);
router.get('/:id', protect,profile);

export default router;


