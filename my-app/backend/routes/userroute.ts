import express from 'express';
import {getUserAddresses,getOrdersByUserId,getCategory,addAddress,getFoodItemsByRestaurants,addMessage,checkConversationExistence,createConversation, registerUser,verifyOtp,googleRegister,login,fetchfoodlist,fetchrestaurant,addToCart,getCartItems,reportRestaurant,clearCart,removeCartItem,getCartItemsByUserId,getFoodItemById,getFoodItemsByCategory,getRestaurantById,createOrder,saveOrder, getOrderDetailss, getFoodItemByIddd} from '../controllers/Usercontroller';
import {getRestaurants}from '../controllers/AdminController'
import authenticateJWT from '../middlewares/authmiddleware';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/verify-otp',verifyOtp)
router.post('/googlesignup',googleRegister)
router.post('/login',login)
router.get('/restaurants',authenticateJWT,getRestaurants)
router.get('/foodlist/:id',authenticateJWT,fetchfoodlist)
router.post('/addtocart',authenticateJWT,addToCart)
router.get('/usercart',authenticateJWT, getCartItemsByUserId)
router.get('/fooditemid',authenticateJWT, getFoodItemById)
router.get('/fooditem',authenticateJWT, getFoodItemsByCategory)
router.get('/fooditems',authenticateJWT, getFoodItemsByRestaurants);
router.get('/restaurant/:id',authenticateJWT, getRestaurantById);
router.delete('/clearCart', authenticateJWT,clearCart);
router.delete('/removeItem',authenticateJWT, removeCartItem)

router.get('/getrestaurant/:id',authenticateJWT,fetchrestaurant)
router.post('/report/:id',authenticateJWT,reportRestaurant)

router.get('/user/:userId',  getUserAddresses);


router.post('/addaddress',  addAddress);
router.get('/addresses/:id', getUserAddresses);
router.post('/createOrder',createOrder)
router.post('/saveOrder',saveOrder)


router.post('/conversations',authenticateJWT,createConversation)
router.get('/conversations/exist/:restaurantId/:userId',authenticateJWT,checkConversationExistence);
router.post('/messages',authenticateJWT,addMessage)
router.get('/orderss/:userId',authenticateJWT, getOrdersByUserId);
router.get('/orders/:paymentId',authenticateJWT, getOrderDetailss);
router.get('/:id',authenticateJWT, getFoodItemByIddd)

router.get('/category',authenticateJWT,getCategory)




export default router;