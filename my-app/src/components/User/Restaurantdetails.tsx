// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import Menu from './Menu';
// import Headder from './Header';
// import Footer from './Footer';
// import { addToCart } from '../../actions/CartActions';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import api from '../../api/Api'

// const RestaurantDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [restaurant, setRestaurant] = useState<any>(null);
//   const [foodItems, setFoodItems] = useState<any[]>([]);
//   const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
//   const [filter, setFilter] = useState<string>('All');
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const storedUser = localStorage.getItem('userdetails');
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   // Fetch data
//   useEffect(() => {
//     const fetchDetails = async (page = 1) => {
//       try {
      
//         const restaurantResponse = await api.get(`http://localhost:5000/api/users/restaurant/${id}`);
//         setRestaurant(restaurantResponse.data);

//         // Fetch food items with pagination
//         const foodItemsResponse = await api.get(`http://localhost:5000/api/users/fooditems?restaurant=${id}&page=${page}&limit=10`);
        
//         // Set food items and pagination state
//         setFoodItems(foodItemsResponse.data.foodItems);
//         setPagination({
//           currentPage: foodItemsResponse.data.pagination.currentPage,
//           totalPages: foodItemsResponse.data.pagination.totalPages,
//         });
//       } catch (error) {
//         console.error('Error fetching restaurant or food items:', error);
//       }
//     };

//     fetchDetails(pagination.currentPage); // Pass the current page to fetch data
//   }, [id, pagination.currentPage]);

//   const handleAddToCart = (item: any) => {
//     if (user) {
//       dispatch(addToCart(item, user?.id) as any);
//       toast.success(`${item.name} added to cart!`, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } else {
//       toast.error('Please log in to add items to your cart', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };
//   const handleReportRestaurant = async () => {
//     try {
//       if (user) {
//         await api.post(`http://localhost:5000/api/users/report/${id}`, {
//           userId: user,
//         });
//         toast.success('Restaurant reported successfully', {
//           position: 'top-right',
//           autoClose: 3000,
//         });
//       } else {
//         toast.error('Please log in to report this restaurant', {
//           position: 'top-right',
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       console.error('Error reporting restaurant:', error);
//       toast.error('Failed to report the restaurant');
//     }
//   };

//   const handleChatWithRestaurant = () => {
//     if (user) {
//       navigate(`/chat/${id}`); // Navigate to the chat page with restaurant ID
//     } else {
//       toast.error('Please log in to start chatting with the restaurant');
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination((prev) => ({
//         ...prev,
//         currentPage: newPage,
//       }));
//     }
//   };
//   const filteredFoodItems = foodItems.filter((item) => {
//     if (filter === 'All') {
//       return true; // Show all items
//     }
//     return item.foodType === filter; // Match Veg or Non-Veg
//   });

//   return (
//     <>
//       <Headder />
//       <div className="container mx-auto p-4">
//         {restaurant && (
//           <div className="flex flex-col md:flex-row mb-6">
//             <div className="w-full md:w-1/2">
//               <img className="w-full h-64 md:h-auto object-cover rounded-2xl mb-4" src={restaurant.avatar} alt={restaurant.restaurantName} />
//             </div>
//             <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-center">
//               <h1 className="text-4xl font-bold text-gray-800 mb-4">{restaurant.restaurantName}</h1>
//               <p className="text-gray-500 text-lg mb-4">{restaurant.address}</p>
//               <p className="text-gray-600 mb-2">Contact: {restaurant.phoneNumber}</p>
//             </div>
//             <button
//                 onClick={handleReportRestaurant}
//                 className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Report Restaurant
//               </button>
//             <button
//                 onClick={handleChatWithRestaurant}
//                 className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 Chat with Restaurant
//               </button>
//           </div>
//         )}

//         <Menu />
//         <br/>
//         <br/>
//         {/* Filter Buttons */}
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={() => setFilter('All')}
//             className={`px-4 py-2 rounded mr-4 ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter('Veg')}
//             className={`px-4 py-2 rounded mr-4 ${filter === 'Veg' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Veg
//           </button>
//           <button
//             onClick={() => setFilter('Non-Veg')}
//             className={`px-4 py-2 rounded ${filter === 'Non-Veg' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           >
//             Non-Veg
//           </button>
//         </div>

       
//         <br/>
//         <br/>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//   {filteredFoodItems.length > 0 ? (
//     filteredFoodItems.map((item: any) => (
//       <div key={item._id} className="max-w-sm overflow-hidden border rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 bg-white">
//         <img
//           className="w-full h-40 object-cover rounded-t-xl mb-3"
//           src={`data:image/jpeg;base64,${item.image}`}
//           alt={item.name}
//         />
//         <div className="px-4 py-2">
//           <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
//           <p className="text-gray-700">Price: ${item.price}</p>
//           <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
//           <button
//             onClick={() => handleAddToCart(item)}
//             className="w-full py-2 mt-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     ))
//   ) : (
//     <p className="text-center text-gray-600">No food items available</p>
//   )}
// </div>
      

        

//         {/* Pagination Controls */}
//         <div className="flex justify-center mt-4">
//           <button onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={pagination.currentPage === 1} className="mr-2 px-4 py-2 bg-gray-300 rounded">
//             Previous
//           </button>
//           <span className="px-4 py-2">Page {pagination.currentPage} of {pagination.totalPages}</span>
//           <button onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages} className="ml-2 px-4 py-2 bg-gray-300 rounded">
//             Next
//           </button>
//         </div>
//       </div>

//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default RestaurantDetail;


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Menu from './Menu';
import Headder from './Header';
import Footer from './Footer';
import { addToCart } from '../../actions/CartActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../api/Api';

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [filter, setFilter] = useState<string>('All');
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('userdetails');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchDetails = async (page = 1) => {
      try {
        const restaurantResponse = await api.get(`http://localhost:5000/api/users/restaurant/${id}`);
        setRestaurant(restaurantResponse.data);

        const foodItemsResponse = await api.get(`http://localhost:5000/api/users/fooditems?restaurant=${id}&page=${page}&limit=10`);
        
        setFoodItems(foodItemsResponse.data.foodItems);
        setPagination({
          currentPage: foodItemsResponse.data.pagination.currentPage,
          totalPages: foodItemsResponse.data.pagination.totalPages,
        });
      } catch (error) {
        console.error('Error fetching restaurant or food items:', error);
      }
    };

    fetchDetails(pagination.currentPage);
  }, [id, pagination.currentPage]);

  const handleAddToCart = (item: any) => {
    if (user) {
      dispatch(addToCart(item, user?.id) as any);
      toast.success(`${item.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Please log in to add items to your cart', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const openModal = (item: any) => {
    setSelectedFood(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFood(null);
    setIsModalOpen(false);
  };

  const handleReport = (itemId: string) => {
    // Add logic to report the food item here, e.g., make an API call
    console.log(`Reporting item with ID: ${itemId}`);
    toast.success("Reported successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const openChat = () => {
    navigate(`/chat/${restaurant._id}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  const filteredFoodItems = foodItems.filter((item) => {
    if (filter === 'All') return true;
    return item.foodType === filter;
  });

  return (
    <>
      <Headder />
      <div className="container mx-auto p-4">
        {restaurant && (
          <div className="flex flex-col md:flex-row mb-6">
            <div className="w-full md:w-1/2">
              <img className="w-full h-64 md:h-auto object-cover rounded-2xl mb-4" src={restaurant.avatar} alt={restaurant.restaurantName} />
            </div>
            <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{restaurant.restaurantName}</h1>
              <p className="text-gray-500 text-lg mb-4">{restaurant.address}</p>
              <p className="text-gray-600 mb-2">Contact: {restaurant.phoneNumber}</p>
              <button onClick={openChat} className="py-2 px-4 bg-green-500 text-white rounded-lg mt-4 hover:bg-green-600 transition duration-300">
                Chat with Restaurant
              </button>
            </div>
          </div>
        )}

        <Menu />

        <div className="flex justify-center mb-6">
          <button onClick={() => setFilter('All')} className={`px-4 py-2 rounded mr-4 ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            All
          </button>
          <button onClick={() => setFilter('Veg')} className={`px-4 py-2 rounded mr-4 ${filter === 'Veg' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Veg
          </button>
          <button onClick={() => setFilter('Non-Veg')} className={`px-4 py-2 rounded ${filter === 'Non-Veg' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Non-Veg
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoodItems.length > 0 ? (
            filteredFoodItems.map((item: any) => (
              <div key={item._id} className="max-w-sm overflow-hidden border rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 bg-white">
                <img
                  onClick={() => openModal(item)}
                  className="w-full h-40 object-cover rounded-t-xl mb-3 cursor-pointer"
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.name}
                />
                <div className="px-4 py-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-700">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-2 mt-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No food items available</p>
          )}
        </div>

        {isModalOpen && selectedFood && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 text-xl">&times;</button>
              <img className="w-full h-60 object-cover rounded-lg mb-4" src={`data:image/jpeg;base64,${selectedFood.image}`} alt={selectedFood.name} />
              <h2 className="text-2xl font-bold mb-2">{selectedFood.name}</h2>
              <p className="text-gray-700 mb-2">Price: ${selectedFood.price}</p>
              <p className="text-gray-600 mb-4">Quantity: {selectedFood.quantity}</p>
              <button
                onClick={() => handleAddToCart(selectedFood)}
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleReport(selectedFood._id)}
                className="w-full py-2 mt-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
              >
                Report
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}>
            Previous
          </button>
          <span className="mx-4">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages}>
            Next
          </button>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default RestaurantDetail;
