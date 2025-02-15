import React, { useEffect, useState } from 'react';
import MainLayout from './MainLayout';
import axios from 'axios';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Api from '../../api/AApi';

const Profile: React.FC = () => {
  const [restaurants, setRestaurant] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, restaurant } = useSelector((state: RootState) => state.restaurant);
  
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const restaurantId = localStorage.getItem('restaurantid');
        if (!restaurantId) {
          setError('No restaurant ID found in local storage.');
          setLoading(false);
          return;
        }

        const response = await Api.get(`http://localhost:5000/api/restaurant/restaurantdetails/${restaurantId}`);
        setRestaurant(response.data);
      } catch (error) {
        setError('Error fetching restaurant details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <MainLayout>
      <div className="container mt-4">
        <h1>Profile</h1>
        {restaurant ? (
          <div className="profile-card">
            <div className="profile-header">
              <img
                src={restaurants.avatar || '/images/default-restaurant.png'}
                alt="Restaurant Avatar"
                className="avatar"
              />
              <h2>{restaurants.restaurantName}</h2>
            </div>
            <div className="profile-details">
              <p><strong>Owner:</strong> {restaurants.ownerName}</p>
              <p><strong>Email:</strong> {restaurants.email}</p>
              <p><strong>Phone:</strong> {restaurants.phoneNumber}</p>
              <p><strong>Address:</strong> {restaurants.address}</p>
            </div>
            {/* Add the Edit Profile button */}
            <div className="profile-actions mt-3">
              <Link to={`/edit-profile/${restaurants._id}`} className="btn btn-primary">
                Edit Profile
              </Link>
            </div>
          </div>
        ) : (
          <div>No restaurant details available.</div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
