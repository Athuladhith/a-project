import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose'; 
import DeliveryPerson, { IDeliveryPerson } from '../models/deliverypersonModel';
import Order from '../models/orderModel';

export const deliveryPersonLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
console.log(email,"dev emial")
console.log(password,'pass555')
  try {
    const deliveryPerson: IDeliveryPerson | null = await DeliveryPerson.findOne({ email });
    console.log(deliveryPerson,'5556')

    if (!deliveryPerson) {
      res.status(400).json({ message: 'Email not registered' });
      return;
    }
console.log('557')
   
    if (deliveryPerson.isBlocked) {
      res.status(403).json({ message: 'Your account is blocked' });
      return;
    }
    console.log('558')
   
    const isPasswordCorrect = await bcrypt.compare(password, deliveryPerson.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Wrong password' });
      return;
    }
    console.log('559')
   
    const userId = (deliveryPerson._id as mongoose.Types.ObjectId).toHexString();

    console.log(userId,"uu dev 009")
    const token = jwt.sign(
      { userId, email: deliveryPerson.email },
      'your_secret_key', 
      { expiresIn: '1h' } as SignOptions
    );
console.log(jwt,"jwt")
   console.log('byee')
    res.status(200).json({
      message: 'Login successful',
      userId,
      deliveryPerson,
      token,
    });
  } catch (error) {
    
    res.status(500).json({ message: 'Server error' });
  }
};


export const deliveryorder=async (req: Request, res: Response): Promise<void> => {
  try{
  const{id}=req.params
  
  console.log(id,"parmskk")
  const orderdetails=await Order.findById({_id:id})
  console.log("first")
  console.log(orderdetails,"order details 00003")
  res.json(orderdetails)
  }catch (error) {
    res.status(500).json({ message: 'Failed to fetch order' });
}
}
