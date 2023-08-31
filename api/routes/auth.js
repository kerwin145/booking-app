import express from 'express'
import { login, regsiter } from '../controllers/auth.js';

const router = express.Router();

router.post("/register", regsiter)
router.post("/login", login)

export default router