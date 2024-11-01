import express from 'express';
import authenticateJWT from '../middlewares/authmiddleware';
const router = express.Router();
import {deliveryPersonLogin,deliveryorder} from '../controllers/Deliverycontroller'


router.post('/login',authenticateJWT,deliveryPersonLogin)
router.get('/deliveryorder/:id',deliveryorder)

export default router