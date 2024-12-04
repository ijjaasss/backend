import express from 'express'
import { isAdmin } from '../middileware/AdminMidillware.js';
import { alllusers } from '../controller/admincontroller.js';

const router = express.Router();

router.get('/user',isAdmin,alllusers)

export default router;