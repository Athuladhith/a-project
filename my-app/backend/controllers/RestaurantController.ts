import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import Restaurant, {IRestaurant} from '../models/restaurantModel'
import Category,{ICategory} from '../models/categoryModel';
import FoodItem from '../models/fooditemModel';
import Conversation from '../models/conversationModel';
import multer from 'multer';
import path from 'path';
import jwt, { SignOptions } from 'jsonwebtoken';
import Cuisine from '../models/cuisineModel'
import AuthenticatedRequest from '../middlewares/authmiddleware';
import verifyToken from '../middlewares/authmiddleware';
import Order from '../models/orderModel';
import { sendEmail } from '../services/emailservices'; 

import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import crypto from 'crypto';

const storage = multer.memoryStorage();
const upload = multer({ storage });




// export const registerRestaurant = [
//     upload.single('avatar'),
//     async (req: Request, res: Response): Promise<void> => {
//       const { restaurantName, ownerName, email, phoneNumber, address, password,avatar } = req.body;
      
//       console.log(avatar,"avvvvvvvvvv")
//       try {
       
//         const restaurantExists = await Restaurant.findOne({ email });
//         if (restaurantExists) {
//           res.status(400).json({ message: 'Restaurant already exists' });
//           return;
//         }
  
      
//         const newRestaurant = new Restaurant({
//           restaurantName,
//           ownerName,
//           email,
//           phoneNumber,
//           address,
//           password: await bcrypt.hash(password, 10), 
//           avatar
//         });
  
       
//         await newRestaurant.save();
  
//         res.status(201).json({
//           message: 'Restaurant registered successfully.',
//         });
//       } catch (error) {
//         res.status(500).json({ message: 'Registration failed, please try again.' });
//       }
//     },
//   ];



export const registerRestaurant = [
  upload.single('avatar'),
  async (req: Request, res: Response): Promise<void> => {
    const { restaurantName, ownerName, email, phoneNumber, address, city ,avatar} = req.body;
    // const avatar = req.file ? req.file.filename : undefined; 

    try {
      
      const restaurantExists = await Restaurant.findOne({ email });
      if (restaurantExists) {
        res.status(400).json({ message: 'Restaurant already exists' });
        return;
      }

      // Generate a random password
      const generatedPassword = crypto.randomBytes(8).toString('hex');
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // Create a new restaurant entry
      const newRestaurant = new Restaurant({
        restaurantName,
        ownerName,
        email,
        phoneNumber,
        address,
        city,
        password: hashedPassword,
        avatar
      });

      // Save new restaurant to the database
      await newRestaurant.save();

      // Send email with the generated password
      const emailSubject = 'Restaurant Registration - Password Details';
      const emailText = `Welcome ${restaurantName}!\n\nYour account has been created successfully. Here are your login details:\n\nEmail: ${email}\nPassword: ${generatedPassword}\n\nPlease log in and change your password as soon as possible.`;
      
      await sendEmail(email, emailSubject, emailText);

      res.status(201).json({
        message: 'Restaurant registered successfully. Password has been sent to your email.',
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed, please try again.' });
    }
  },
];



  export const restaurantlogin = async (req: Request, res: Response): Promise<void> => {
    console.log("r1")
    const { email, password } = req.body;
  
    try {
      const restaurant: IRestaurant | null = await Restaurant.findOne({ email });
      console.log(restaurant,"restoaurant user")
      if (!restaurant) {
        res.status(400).json({ message: 'Email not registered' });
        return;
      }

  
      if (restaurant.password && (await bcrypt.compare(password, restaurant.password))) {
        const token = jwt.sign(
          { userId: restaurant._id.toHexString(), email: restaurant.email },
          'your_jwt_secret_key_here', 
          { expiresIn: '1h' } as SignOptions
        );
  
        res.status(200).json({
          message: 'Login successful',
          userId: restaurant._id.toHexString(),
          restaurant,
          token,
        });
      } else {
        res.status(400).json({ message: 'Wrong password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  export const getOrderstorestaurant = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // restaurant ID from frontend
      console.log(id, 'restaurant ID from frontend');
  
      // Find all orders that contain food items associated with this restaurant
      const orders = await Order.find({ "foodItems.restaurant": id }) // Filter by restaurant ID in foodItems
        .populate('user', 'name email phoneNumber') // Populate user data
        .populate('address', 'street city state postalCode country') // Populate address data
        .populate({
          path: 'foodItems.foodItem',
          select: 'name category cuisine price'
        }); // Populate food item data
  
      console.log(orders, 'orders from backend');
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  };
  export const addCategory = [
    upload.single('avatar'),
    async (req: Request, res: Response): Promise<void> => {
      const { name, description } = req.body;
      const avatar = req.file;
  
      try {
        
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
          res.status(400).json({ message: 'Category already exists' });
          return;
        }
  
        
        const newCategory = new Category({
          name,
          description,
          avatar: avatar ? avatar.buffer.toString('base64') : 'No avatar provided',
        });
  
        
        await newCategory.save();
  
        res.status(201).json({
          message: 'Category registered successfully.',
          category: newCategory,
        });
      } catch (error) {
        res.status(500).json({ message: 'Registration failed, please try again.' });
      }
    },
  ];


  export const addCuisine = [
    upload.single('avatar'),
    async (req: Request, res: Response): Promise<void> => {
      const { name, description } = req.body;
      const avatar = req.file;
      console.log(req.body)
  
      try {
        
        const cuisineExists = await Cuisine.findOne({ name });
        if (cuisineExists) {
          res.status(400).json({ message: 'Cuisine already exists' });
          return;
        }
  
      
        const newCuisine = new Cuisine({
          name,
          description,
          avatar: avatar ? avatar.buffer.toString('base64') : 'No avatar provided',
        });
  
       
        await newCuisine.save();
  
        res.status(201).json({
          message: 'Cuisine registered successfully.',
          cuisine: newCuisine,
        });
      } catch (error) {
        res.status(500).json({ message: 'Registration failed, please try again.' });
      }
    }
  ];

  // export const addFoodItem = [
  //   upload.single('image'),
  //   async (req: Request, res: Response): Promise<void> => {
  //     const { name, price, quantity, category, cuisine } = req.body;
  //     const image = req.file;
  
  //     try {
  //       // Validate category and cuisine
  //       const categoryExists = await Category.findById(category);
  //       const cuisineExists = await Cuisine.findById(cuisine);
  
  //       if (!categoryExists || !cuisineExists) {
  //         res.status(400).json({ message: 'Invalid category or cuisine' });
  //         return;
  //       }
  
  //       // Create a new food item entry
  //       const newFoodItem = new FoodItem({
  //         name,
  //         price: parseFloat(price),
  //         quantity: parseInt(quantity, 10),
  //         category,
  //         cuisine,
  //         image: image ? image.buffer.toString('base64') : 'No image provided',
  //       });
  
  //       // Save the new food item to the database
  //       await newFoodItem.save();
  
  //       res.status(201).json({
  //         message: 'Food item added successfully.',
  //         foodItem: newFoodItem,
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ message: 'Failed to add food item. Please try again.' });
  //     }
  //   },
  // ];


  export const addFoodItem = [
    upload.single('image'),
    async (req: Request, res: Response): Promise<void> => {
      const { name, price, quantity, category, cuisine, restaurantid,foodType } = req.body;
      const image = req.file;
  
      try {
        
        const categoryExists = await Category.findById(category);
        const cuisineExists = await Cuisine.findById(cuisine);
  console.log('elloooo')
        if (!categoryExists || !cuisineExists) {
          res.status(400).json({ message: 'Invalid category or cuisine' });
          return;
        }
  console.log('yessss')
        if (!mongoose.Types.ObjectId.isValid(restaurantid)) {
          console.log('noooooo')
          res.status(400).json({ message: 'Invalid restaurant ID' });
          return;
        }
        console.log('down')
  
        const restaurantId = new mongoose.Types.ObjectId(restaurantid);
       
        const newFoodItem = new FoodItem({
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity, 10),
          category,
          cuisine,
          image: image ? image.buffer.toString('base64') : 'No image provided',
          restaurant: restaurantId, 
          foodType

        });
  
        await newFoodItem.save();
  
        res.status(201).json({
          message: 'Food item added successfully.',
          foodItem: newFoodItem,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add food item. Please try again.' });
      }
    },
  ];


  // test


 
  export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find({});
        res.json(categories);
        console.log(categories, 'Categories fetched successfully');
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
  };
  export const getCuisine = async (req: Request, res: Response): Promise<void> => {
    try {
        const cuisines = await Cuisine.find({});
        res.json(cuisines);
        console.log(cuisines, 'Categories fetched successfully');
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
  };

  // export const addFoodItem = [
   
  //   upload.single('image'),
  //   async (req: Request, res: Response): Promise<void> => {
  //     const { name, price, quantity, category, cuisine } = req.body;
  //     const image = req.file;
     
  
  //     try {
  //       const categoryExists = await Category.findById(category);
  //       const cuisineExists = await Cuisine.findById(cuisine);
  
  //       if (!categoryExists || !cuisineExists) {
  //         res.status(400).json({ message: 'Invalid category or cuisine' });
  //         return;
  //       }
  
  //       const newFoodItem = new FoodItem({
  //         name,
  //         price: parseFloat(price),
  //         quantity: parseInt(quantity, 10),
  //         category,
  //         cuisine,
  //         image: image ? image.buffer.toString('base64') : 'No image provided',
          
  //       });
  
  //       await newFoodItem.save();
  
  //       res.status(201).json({
  //         message: 'Food item added successfully.',
  //         foodItem: newFoodItem,
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ message: 'Failed to add food item. Please try again.' });
  //     }
  //   },
  // ];

  export const Deletecuisine = async (req: Request, res: Response): Promise<void> => {
    try {
  
      console.log('enterrrr')
      const { id } = req.params;
      console.log( req.params,'paramssss')
  
      // Find and delete the food item by ID
      const cuisine = await Cuisine.findByIdAndDelete(id);
      console.log('yesssss')
  
      if (!cuisine) {
        console.log('noooo')
        res.status(404).json({ message: 'Food item not found' });
        return;
      }
  
      res.status(200).json({ message: 'Food item has been deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the food item' });
    }
  };
  
  export const Deletecatagory = async (req: Request, res: Response): Promise<void> => {
    try {
  
      console.log('enterrrr')
      const { id } = req.params;
      console.log( req.params,'paramssss')
  
      // Find and delete the food item by ID
      const catagory = await Category.findByIdAndDelete(id);
      console.log('yesssss')
  
      if (!catagory) {
        console.log('noooo')
        res.status(404).json({ message: 'Food item not found' });
        return;
      }
  
      res.status(200).json({ message: 'Food item has been deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the food item' });
    }
  };

  export const getFooditem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { restaurantId } = req.params;
        const fooditem = await FoodItem.find({ restaurant: restaurantId });
        res.json(fooditem);
        console.log(fooditem, 'Categories fetched successfully');
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
  };

  export const getFoodItemById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; 

    try {
        const foodItem = await FoodItem.findById(id); 

        if (!foodItem) {
            res.status(404).json({ message: 'Food item not found' });
            return;
        }

        res.json(foodItem);
        console.log(foodItem, 'Food item fetched successfully');
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch food item' });
    }
};

export const updateFoodItemById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; 
  console.log(id,"idd upadte food")
  const { name, price, quantity, category, cuisine, image, restaurantid } = req.body; 
console.log(price,"ppp")
  try {
      const foodItem = await FoodItem.findById(id); 
console.log(foodItem?.price,"update food")
      if (!foodItem) {
          res.status(404).json({ message: 'Food item not found' });
          return;
      }

      
      foodItem.name = name || foodItem.name;
      foodItem.price = price || foodItem.price;
      foodItem.quantity = quantity || foodItem.quantity;
      // foodItem.category = category || foodItem.category;
      // foodItem.cuisine = cuisine || foodItem.cuisine;
      // foodItem.image = image || foodItem.image;
      

      const updatedFoodItem = await foodItem.save(); 

      res.json(updatedFoodItem); 
      console.log(updatedFoodItem, 'Food item updated successfully');
  } catch (error) {
      res.status(500).json({ message: 'Failed to update food item' });
  }
};


export const getRestaurantDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const restaurantId = req.params.id;
console.log(restaurantId,"res002")
    // Validate restaurant ID
    if (!restaurantId) {
      return res.status(400).json({ message: 'Restaurant ID is required' });
    }

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId)
     console.log(restaurant,"003")

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Return restaurant details
    return res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// messages/..........................



export const getRestaurantConversations = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params; // Get restaurantId from the request parameters
console.log(id,"resto found onnresto 034")
  try {
    // Find conversations for the restaurant
    const conversations = await Conversation.find({restaurantId: id }).populate('messages.sender'); // Populate sender info if needed
console.log(conversations,"con 044")
    if (!conversations || conversations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No conversations found for this restaurant',
        conversations: [],
      });
    }

    // Return the found conversations
    return res.status(200).json({
      success: true,
      message: 'Conversations retrieved successfully',
      conversations,
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later',
    });
  }
};


export const getRestaurantDetailss = async (req: Request, res: Response) => {
  try {
      const restaurant = await Restaurant.findById(req.params.id);

      if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
      }

      res.status(200).json(restaurant);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

// Update Restaurant Details
export const updateRestaurant = async (req: Request, res: Response) => {
  const { restaurantName, ownerName, phoneNumber, address, city, password } = req.body;
  console.log(req.body,"check body")
  let avatar = req.body.avatar; // avatar might be base64 encoded

  try {
      const restaurant = await Restaurant.findById(req.params.id);

      if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
      }

      // Update restaurant fields
      restaurant.restaurantName = restaurantName || restaurant.restaurantName;
      restaurant.ownerName = ownerName || restaurant.ownerName;
      restaurant.phoneNumber = phoneNumber || restaurant.phoneNumber;
      restaurant.address = address || restaurant.address;
      restaurant.city = city || restaurant.city;

      // If new password is provided, hash it before saving
      if (password) {
          const salt = await bcrypt.genSalt(10);
          restaurant.password = await bcrypt.hash(password, salt);
      }

      // Handle avatar update if provided
      if (avatar) {
          restaurant.avatar = avatar;
      }

      await restaurant.save();

      res.status(200).json({ message: 'Restaurant updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};