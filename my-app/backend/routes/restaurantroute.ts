import express from 'express';
import restauthenticateJWT from '../middlewares/restaurantmiddleware';
import {restaurantlogin,addCategory,updateRestaurant,getOrderstorestaurant,addCuisine,getCategories,getRestaurantConversations,getCuisine,addFoodItem,Deletecatagory,getRestaurantDetails,Deletecuisine,getFooditem,getFoodItemById,updateFoodItemById} from '../controllers/RestaurantController'


const router = express.Router();

router.post('/restaurantlogin',restaurantlogin)
router.post('/addcategory',restauthenticateJWT,addCategory)
router.post('/addcuisine',restauthenticateJWT,addCuisine)
router.post('/addfooditem',restauthenticateJWT,addFoodItem)
router.get('/categories',getCategories)
router.get('/cuisine',restauthenticateJWT,getCuisine)
router.delete('/catagory/:id',restauthenticateJWT,Deletecatagory)
router.delete('/cuisine/:id',restauthenticateJWT,Deletecuisine)
router.get('/fooditem/:restaurantId',restauthenticateJWT,getFooditem)
router.get('/fetchfoodItems/:id',restauthenticateJWT,getFoodItemById)
router.put('/updatefoodItems/:id',restauthenticateJWT,updateFoodItemById)

router.get('/restaurantdetails/:id',restauthenticateJWT, getRestaurantDetails);

router.post('/addfooditem',addFoodItem)
router.get('/conversations/:id', getRestaurantConversations);
router.get('/orders/:id', getOrderstorestaurant);

router.put('/updateresto/:id', updateRestaurant);


export default router