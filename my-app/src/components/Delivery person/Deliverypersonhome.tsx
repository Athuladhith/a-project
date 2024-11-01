import React, { useState, useEffect } from 'react';
import MainLayout from './MainLayout';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store';

import { io } from 'socket.io-client';
import axios from 'axios';
import { TableContainer, Typography } from '@mui/material';
const socket = io('http://localhost:5000');

interface DecodedToken {
  deliveryPersonId: string;
}

// interface OrderDetails {
//   orderId?: string;
 
//   // Add any other expected properties here
// }
// interface OrderDetails {
//   orderId?: string;
//   name?: string;
//   address?: string;
//   paymentMethod?: string;
//   amount?: number;
// }

interface OrderDetails {
  id: string;
  user:string;
  foodItems: { foodItemName: string; quantity: number }[];
  totalAmount: number;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  orderStatus: 'pending' | 'accepted' | 'rejected';
}


const DeliveryPersonHome: React.FC = () => {
  const [deliveryPersonId, setDeliveryPersonId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([
    " "
  ]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, deliveryPerson } = useSelector((state: RootState) => state.deliveryPerson);

  console.log(deliveryPerson, "delivery person info");
  console.log(isAuthenticated, "is authenticated");

  const token = localStorage.getItem('deliveryPersonToken');
  const userid = localStorage.getItem('userId');
  console.log(userid, "User ID");

  // Function to parse JWT token and extract delivery person ID
  function parseJwt(token: string): DecodedToken | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as DecodedToken;
    } catch (error) {
      console.error('Failed to parse token:', error);
      return null;
    }
  }

  const newToken = token ? parseJwt(token) : null;

  useEffect(() => {
    if (newToken) {
      setDeliveryPersonId(newToken.deliveryPersonId);
    }
  }, [newToken]);

 useEffect(() => {
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/deliveryperson/deliveryorder/${notifications}`);
      console.log("API response data:", response.data); // Check the structure here
      const fetchedOrders = response.data.map((order: any) => ({
        id: order._id,
        user:order.user,
        foodItems: order.foodItems.map((item: any) => ({
          foodItemName: item.foodItem.name,
          quantity: item.quantity,
        })),
        totalAmount: order.totalAmount,
        deliveryAddress: order.address,
        paymentMethod: order.paymentMethod,
        orderStatus: "pending",
      }));
     
      setOrderDetails(fetchedOrders);
      

     
    } catch (error) {
      console.error("Error fetching delivery order:", error);
    }
  };

  fetchOrderDetails();
}, [notifications]);
  useEffect(() => {
    // Listen to the 'delivery' event and handle incoming data
    socket.on('delivery', (order:OrderDetails) => {
      
      
      setOrderDetails(prevOrders => [order, ...prevOrders])
     
      }
    );

    // Clean up the socket listener on component unmount
    return () => {
      socket.off('delivery');
    };
  }, []);

console.log(orderDetails,"stae")


  return (
    <MainLayout>
      <div>
        <h2>Order Details</h2>
        <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Food Items</th>
            <th>Total Amount</th>
            <th>Delivery Address</th>
            <th>Payment Method</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((order) => (
            <tr >
              <td>{order.id}</td>
              <td>
                {/* {order.order.foodorders.map((order.order, index) => (
                  <div key={index}>
                    <strong>{order.order.foodorderName}</strong> (Qty: {order.order.quantity})
                  </div>
                ))} */}
              </td>
              <td>${orderDetails[0].order.totalAmount}</td>
              {/* {order.order.deliveryAddress.map((item)=>{
                <td>{item.city}</td>
              })} */}
              <td>{orderDetails[0].paymentMethod}</td>
              <td>{orderDetails[0].orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </MainLayout>
  );
};

export default DeliveryPersonHome;
