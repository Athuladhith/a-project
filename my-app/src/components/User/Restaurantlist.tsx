// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store';
// import { fetchRestaurants } from '../../actions/AdminAction';
// import { useNavigate } from 'react-router-dom';
// import rating from '../../Images/4.jpg';
// import axios from 'axios';

// const RestaurantList = () => {
//  const dispatch = useDispatch<AppDispatch>();
//  const navigate = useNavigate();
//  const [location, setLocation] = useState<string>('Fetching location...');
//  const { restaurant } = useSelector((state: RootState) => state.admin);
//  console.log(restaurant, "restaurants");

// useEffect(() => {
//  dispatch(fetchRestaurants());
//  }, [dispatch]);

//  useEffect(() => {
//  const fetchLocation = () => {
//  if (navigator.geolocation) {
//  navigator.geolocation.getCurrentPosition(
// async (position) => {
//  const { latitude, longitude } = position.coords;
//  try {
//  const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
//  params: {
//  key: '3ce2218fd3d44c718c25ab466bd269d7', 
//  q: `${latitude},${longitude}`,
//  pretty: 1,
//  no_annotations: 1,
//  },
// });
 
//  const locationName = response.data.results[0].components.city || 
// response.data.results[0].components.town || 
// response.data.results[0].components.village || 
// 'City not found';
//  setLocation(locationName);
//  localStorage.setItem('userLocation', locationName);
//  } catch (error) {
//  console.error('Error fetching location name:', error);
//  setLocation('Unable to fetch location name');
// }
// },
//  (error) => {
//  console.error('Error fetching location:', error);
//  setLocation('Unable to fetch location');
//  }
//  );
//  } else {
//  setLocation('Geolocation not supported');
//  }
//  };

//  fetchLocation();
//  }, []);

// // Filter restaurants based on the fetched location
//  const filteredRestaurants = restaurant.filter((data: any) => {
//  return data.city?.toLowerCase() === location.toLowerCase();
// });

//  return (
//  <>
//  <h1 className='mt-7 font-bold text-2xl'>Restaurants with online food delivery in {location}</h1>
//  <div className='grid grid-cols-4 gap-4 w-11/12'>
//  {filteredRestaurants.length > 0 ? (
//  filteredRestaurants.map((data: any) => (
//  <div
//  key={data._id}
// className="max-w-sm overflow-hidden mt-4 cursor-pointer"
//  onClick={() => navigate(`/restaurant/${data._id}`)}
//  >
//  <img
// className="w-52 h-36 object-cover rounded-2xl"
//  src={data.avatar}
//  alt={data.restaurantName}
//  />
//  <div className="px-4 py-2">
//  <div className="font-semibold text-xl text-gray-800">
// {data.restaurantName.slice(0, 10)}...
//  </div>
// <div className='flex items-center'>
//   <img src={rating} className='w-5 h-5 rounded-full' alt="rating" />
//  <div className="font-semibold text-lg text-gray-800 ml-1">
//  Rating
//  </div>
//  </div>
//  <p className="text-gray-500 text-base">
//  Cuisine<br />
//  {data.address}
//  </p>
// </div>
//  </div>
// ))
//  ) : (
//  <p className="text-gray-500 text-xl">No restaurants available in {location}</p>
//  )}
//  </div>
//  </>
//  );
// };

// export default RestaurantList;




import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchRestaurants } from '../../actions/AdminAction';
import { useNavigate } from 'react-router-dom';
// import rating from '../../images/rating.png';

const RestaurantList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { restaurant } = useSelector((state: RootState) => state.admin);

  React.useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className='grid grid-cols-4 gap-4 w-11/12'>
      {restaurant.map((data: any) => (
        <div
          key={data._id}
          className="max-w-sm overflow-hidden mt-4 cursor-pointer"
          onClick={() => navigate(`/restaurant/${data._id}`)}
        >
          <img
            className="w-52 h-36 object-cover rounded-2xl"
            src={data.avatar}
            alt={data.restaurantName}
          />
          <div className="px-4 py-2">
            <div className="font-semibold text-xl text-gray-800">
              {data.restaurantName.slice(0, 10)}...
            </div>
            <div className='flex items-center'>
              {/* <img src={rating} className='w-5 h-5 rounded-full' /> */}
              <div className="font-semibold text-lg text-gray-800 ml-1">
                Rating
              </div>
            </div>
            <p className="text-gray-500 text-base">
              Cuisine<br />
              {data.address}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;