// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import api from '../../api/Api'
// import io from 'socket.io-client';
// const socket = io('http://localhost:5000')

// // interface FoodItem {
// //   id: string;
// //   name: string;
// //   quantity: number;
// //   image: string; // Assuming this field contains the image URL or path
// // }

// // interface Address {
// //   street: string;
// //   city: string;
// //   state: string;
// //   postalCode: string;
// //   country: string;
// // }


// interface Address {
//   _id: string;
//   street: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
// }

// interface FoodItem {
//   foodItem: string;  // Food item ID
//   quantity: number;
//   image?: string;    // Optional image if required
// }

// interface OrderDetails {
//   _id: string;
//   user: User;
//   foodItems: FoodItem[];
//   totalAmount: number;
//   address: Address;
//   paymentMethod: string;
//   orderStatus: string;
//   paymentId: string;
//   paymentStatus: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const OrderDetailsPage: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { paymentId, paymentMethod } = location.state || {};
//   const [orderStatus, setOrderStatus] = useState<string>('Preparing');
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
//   const [detailedFoodItems, setDetailedFoodItems] = useState<FoodItem[]>([]);
//   const [final,setfinal]=useState<OrderDetails | null>(null)
//   const [image,setimage]=useState<string>('')
//   const [street,setstreet] =useState<string>('')
//   const [city,setcity] =useState<string>('')
//   const [state,setstate] =useState<string>('')
//   const [pin,setpin] =useState<string | undefined>('')


//   useEffect(() => {
//     if (!paymentId) {
//       navigate('/checkout');
//       return;
//     }

//     const fetchOrderDetails = async () => {
//       try {
        
//         // Fetch order details
//         const response = await api.get(`http://localhost:5000/api/users/orders/${paymentId}`);
//         const orderData = response.data;
//         const fetchedOrders = response.data.map((order: any) => ({
//           id: order._id,
//           user:order.user,
//           foodItems: order.foodItems.map((item: any) => ({
//             foodItemName: item.foodItem.name,
//             quantity: item.quantity,
            
//           })),
//           totalAmount: order.totalAmount,
//           deliveryAddress: order.address,
//           paymentMethod: order.paymentMethod,
//           orderStatus: "pending",
//         }));
        
//         console.log(fetchedOrders.id,"715")
//         console.log(fetchedOrders,"716")
//         console.log(orderData,"order 717")
//         setOrderDetails(fetchedOrders);
//         setfinal(fetchedOrders[0]);
//         console.log(fetchedOrders[0],"finallll")
//         const name=fetchedOrders[0]?.foodItems[0].foodItemName
//         console.log(name,"food name")
//         const foodResponse = await api.get(`http://localhost:5000/api/users/${name}`);
        
//         setimage(foodResponse.data.image)
//         setOrderStatus(orderData.orderStatus);
        


//         socket.emit('orderNotification', {
//           restaurantId: fetchedOrders.id, 
//           orderDetails: fetchedOrders,
//         });
//         // socket.emit('orderNotification', { 
//         //   paymentId, 
//         //   orderDetails 
//         // });


//         // Fetch details for each food item

       
//         const foodItemPromises = fetchedOrders.foodItems.map(async (item: { foodItem: string; quantity: number }) => {
          
//           const foodResponse = await api.get(`http://localhost:5000/api/users/${item.foodItem}`);
          
//           return {
//             id: foodResponse.data._id,
//             name: foodResponse.data.name,
//             image: foodResponse.data.image,
//             quantity: item.quantity
//           };
//         });
       

//         const foodItemsDetails = await Promise.all(foodItemPromises);
//         setDetailedFoodItems(foodItemsDetails);

//       } catch (error) {
//         console.error('Error fetching order details:', error);
//       }
//     };

//     fetchOrderDetails();
//   }, [paymentId, navigate]);

//   if (!orderDetails) {
//     return <div>Loading order details...</div>;
//   }

//   const { address, totalAmount, orderStatus: status } = orderDetails;
//   console.log(orderDetails, 'order detail in the orderdetails page');
//   console.log(final?.address,"111111111111111")
//   console.log(final?.address.street,"finallll222222222222222")
//   setstreet(final?.address.street || '')
//   setcity(final?.address.city || '')
//   setstate(final?.address.city || '')
//   setpin(final?.address.postalCode || '')
//   console.log(detailedFoodItems,"image3333333333333333")
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold mb-6">Order Details</h1>

//       <div className="border p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
//         <div className="mb-4">
//           <p className="text-lg">
//             <span className="font-bold">Payment Method:</span> {final?.paymentMethod}
//           </p>
//           {/* <p className="text-lg">
//             <span className="font-bold">Payment ID:</span> {paymentId}
//           </p> */}
//           <p className="text-lg">
//             <span className="font-bold">Total Amount:</span> ₹{final?.totalAmount}
//           </p>
//         </div>

//         <h2 className="text-2xl font-semibold mb-4">Order Status</h2>
//         <p className="text-lg">
//           <span className="font-bold">Current Status:</span> {final?.orderStatus}
//         </p>

//         {/* Status Display */}
//         {orderStatus === 'Preparing' && (
//           <p className="text-yellow-600">Your order is being prepared. Estimated time: 30 minutes.</p>
//         )}
//         {orderStatus === 'Out for Delivery' && (
//           <p className="text-green-600">Your order is out for delivery. Please be ready to receive it.</p>
//         )}
//         {orderStatus === 'Delivered' && (
//           <p className="text-blue-600">Your order has been delivered. Enjoy your meal!</p>
//         )}

//         <h2 className="text-2xl font-semibold mt-6 mb-4">Delivery Address</h2>
//         <p className="text-lg">
//           {/* {street},{state},{city},{pin} */}
//           {/* {final?.address.street},{final?.address.city},{final?.address.state},{final?.address.postalCode} */}
//            {/* {address.street}, {address.state}, {address.postalCode}, {address.country} */}
//         </p>
//         <h2 className="text-2xl font-semibold mt-6 mb-4">Ordered Items</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {final?.foodItems.map((item: FoodItem) => (
//             <div className="border rounded-lg p-4 shadow-lg">
//               <img
//                 src={`data:image/jpeg;base64,${image}`} // Assuming the image field contains the filename or URL
//                 alt={image}
//                 className="w-full h-40 object-cover rounded-t-lg"
//               />
//               <div className="p-2">
//                 <h3 className="text-lg font-bold">{item.foodItem}</h3>
//                 <p className="text-md">Quantity: {item.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-8">
//           <button
//             onClick={() => navigate('/home')}
//             className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     </div>
    
//   );
// };

// export default OrderDetailsPage;






import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/Api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface FoodItem {
  foodItem: string;
  quantity: number;
  image?: string;
}

interface OrderDetails {
  _id: string;
  user: User;
  foodItems: FoodItem[];
  totalAmount: number;
  deliveryAddress: Address;
  paymentMethod: string;
  orderStatus: string;
  paymentId: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

const OrderDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { paymentId, paymentMethod } = location.state || {};
  const [orderStatus, setOrderStatus] = useState<string>('Preparing');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [detailedFoodItems, setDetailedFoodItems] = useState<FoodItem[]>([]);
  const [final, setFinal] = useState<OrderDetails | null>(null);
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    if (!paymentId) {
      navigate('/checkout');
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`http://localhost:5000/api/users/orders/${paymentId}`);
        const orderData = response.data;
        const fetchedOrders = response.data.map((order: any) => ({
          id: order._id,
          user: order.user,
          foodItems: order.foodItems.map((item: any) => ({
            foodItemName: item.foodItem.name,
            quantity: item.quantity,
          })),
          totalAmount: order.totalAmount,
          deliveryAddress: order.address,
          paymentMethod: order.paymentMethod,
          orderStatus: 'pending',
        }));

        setOrderDetails(fetchedOrders);
        setFinal(fetchedOrders[0]);
        console.log(fetchedOrders[0].address,"aabbccdd")

        const name = fetchedOrders[0]?.foodItems[0].foodItemName;
        const foodResponse = await api.get(`http://localhost:5000/api/users/${name}`);
        setImage(foodResponse.data.image);
        setOrderStatus(orderData.orderStatus);

        socket.emit('orderNotification', {
          restaurantId: fetchedOrders.id,
          orderDetails: fetchedOrders,
        });

        const foodItemPromises = fetchedOrders[0].foodItems.map(async (item: { foodItem: string; quantity: number }) => {
          const foodResponse = await api.get(`http://localhost:5000/api/users/${item.foodItem}`);
          return {
            id: foodResponse.data._id,
            name: foodResponse.data.name,
            image: foodResponse.data.image,
            quantity: item.quantity,
          };
        });

        const foodItemsDetails = await Promise.all(foodItemPromises);
        setDetailedFoodItems(foodItemsDetails);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [paymentId, navigate]);

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }
  console.log(final?.deliveryAddress,"97979")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Order Details</h1>

      <div className="border p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <div className="mb-4">
          <p className="text-lg">
            <span className="font-bold">Payment Method:</span> {final?.paymentMethod}
          </p>
          <p className="text-lg">
            <span className="font-bold">Total Amount:</span> ₹{final?.totalAmount}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Order Status</h2>
        <p className="text-lg">
          <span className="font-bold">Current Status:</span> {final?.orderStatus}
        </p>

        {orderStatus === 'Preparing' && (
          <p className="text-yellow-600">Your order is being prepared. Estimated time: 30 minutes.</p>
        )}
        {orderStatus === 'Out for Delivery' && (
          <p className="text-green-600">Your order is out for delivery. Please be ready to receive it.</p>
        )}
        {orderStatus === 'Delivered' && (
          <p className="text-blue-600">Your order has been delivered. Enjoy your meal!</p>
        )}

        <h2 className="text-2xl font-semibold mt-6 mb-4">Delivery Address</h2>
        <p className="text-lg">
          {final?.deliveryAddress?.street}, {final?.deliveryAddress?.city}, {final?.deliveryAddress?.state}, {final?.deliveryAddress?.postalCode}
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Ordered Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {final?.foodItems.map((item: FoodItem, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg">
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt={item.foodItem}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="text-lg font-bold">{item.foodItem}</h3>
                <p className="text-md">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/home')}
            className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
