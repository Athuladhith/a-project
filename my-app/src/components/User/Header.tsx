import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import logo from '../../Images/foody.png';
import lens from '../../Images/search images.png';
import profile from '../../Images/av.jpg';
import cartimage from '../../Images/cart.jpg';
import { RootState } from '../../store';
import api from '../../api/Api';

const Headder: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]); 
  const [allRestaurants, setAllRestaurants] = useState<any[]>([]); 
  const [location, setLocation] = useState<string>('Fetching location...'); 

  // Fetch all restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/admin/restaurants');
        setAllRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    fetchRestaurants();
  }, []);

  // Handle search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRestaurants([]);
    } else {
      const filtered = allRestaurants.filter((restaurant: any) =>
        restaurant?.restaurantName?.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchQuery, allRestaurants]);

  // Fetch user's location and extract city name
  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                  key: '3ce2218fd3d44c718c25ab466bd269d7', 
                  q: `${latitude},${longitude}`,
                  pretty: 1,
                  no_annotations: 1,
                },
              });
              // Extract city or equivalent from response
              const locationName = response.data.results[0].components.city || 
                                   response.data.results[0].components.town || 
                                   response.data.results[0].components.village || 
                                   'City not found';
              setLocation(locationName);
              localStorage.setItem('userLocation', locationName);
            } catch (error) {
              console.error('Error fetching location name:', error);
              setLocation('Unable to fetch location name');
            }
          },
          (error) => {
            console.error('Error fetching location:', error);
            setLocation('Unable to fetch location');
          }
        );
      } else {
        setLocation('Geolocation not supported');
      }
    };

    fetchLocation();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const handleProfileClick = () => {
    navigate('/userprofile');
  };

  // const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md w-full">
        {/* Left Section: Logo and Location */}
        <div className="flex items-center justify-between md:justify-start w-full md:w-auto mb-4 md:mb-0">
          <Link to="/home" className="flex items-center">
            <img src={logo} className="w-12 h-12 sm:w-16 sm:h-16 mr-4 cursor-pointer" alt="Logo" />
          </Link>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
            {/* <span className="text-sm sm:text-lg font-medium">Others</span> */}
            <div className="flex items-center ml-0 md:ml-4">
              <span className="text-sm sm:text-lg font-medium">Location: {location}</span> 
              <img src={lens} className="w-3 h-3 sm:w-4 sm:h-4 ml-2" alt="Arrow Icon" />
            </div>
          </div>
        </div>

        {/* Middle Section: Search */}
        <div className="relative flex items-center w-full md:w-auto mb-4 md:mb-0">
          <img src={lens} className="w-4 h-4 sm:w-5 sm:h-5 mr-2" alt="Search Icon" />
          <input
            type="text"
            placeholder="Search for restaurants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-auto border rounded-lg py-1 px-3 focus:outline-none focus:border-gray-500"
          />
          {searchQuery && filteredRestaurants.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-48 overflow-y-auto z-10">
              {filteredRestaurants.map((restaurant) => (
                <li
                  key={restaurant._id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    navigate(`/restaurant/${restaurant._id}`);
                    setSearchQuery('');
                  }}
                >
                  {restaurant.restaurantName}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Section: Profile, Cart, and SignOut */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative flex items-center space-x-1 hover:text-blue-600 transition duration-200">
            <img src={cartimage} className="w-5 h-5 sm:w-7 sm:h-7" alt="Cart Icon" />
            {/* {itemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {itemCount}
              </span>
            )} */}
            <span className="text-sm sm:text-lg font-medium">Cart</span>
          </Link>
          <Link to='/orders' className="relative flex items-center space-x-1 hover:text-blue-600 transition duration-200">
          <span className="text-sm sm:text-lg font-medium">Orders</span>
          </Link>

          <div className="flex items-center space-x-1">
            <img
              src={profile}
              className="w-5 h-5 sm:w-7 sm:h-7 cursor-pointer"
              alt="Profile Icon"
              onClick={handleProfileClick}
            />
            <button
              className="text-sm sm:text-lg font-medium"
              onClick={handleLogout}
            >
              SignOut
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headder;
