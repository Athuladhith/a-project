import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import MainLayout from './MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../../api/AApi';

const EditRestaurant: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Get restaurant ID from route params

    const [restaurant, setRestaurant] = useState({
        ownerName: "",
        phoneNumber: "",
        address: "",
        city: "", // Add city field
        password: "", // Password field for security, optional
        confirmPassword: "", // Confirm password field
    });

    const { ownerName, phoneNumber, address, city, password, confirmPassword } = restaurant;

    const [errors, setErrors] = useState({
        ownerName: "",
        phoneNumber: "",
        address: "",
        city: "", // Add city validation
        password: "",
        confirmPassword: "",
    });

    // Fetch restaurant details from the server
    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const { data } = await Api.get(`http://localhost:5000/api/restaurant/restaurantdetails/${id}`);
                setRestaurant({
                    ownerName: data.ownerName,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    city: data.city,
                    password: "",
                    confirmPassword: "",
                });
            } catch (error) {
                toast.error("Failed to load restaurant details");
            }
        };

        fetchRestaurantDetails();
    }, [id]);

    const validateForm = () => {
        let formErrors = { ...errors };

        formErrors.ownerName = ownerName ? "" : "Owner name is required";
        formErrors.phoneNumber = phoneNumber.length === 10 && /^[0-9]+$/.test(phoneNumber) ? "" : "Invalid phone number";
        formErrors.address = address ? "" : "Address is required";
        formErrors.city = city ? "" : "City is required"; // Add city validation
        formErrors.password = password.length >= 8 ? "" : "Password must be at least 8 characters long";
        formErrors.confirmPassword = password === confirmPassword ? "" : "Passwords do not match";

        setErrors(formErrors);

        return Object.values(formErrors).every((error) => error === "");
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("Validation failed");
            return;
        }

        const formData = new FormData();
        formData.set("ownerName", ownerName);
        formData.set("phoneNumber", phoneNumber);
        formData.set("address", address);
        formData.set("city", city); 
        if (password) formData.set("password", password);

        try {
            await axios.put(`http://localhost:5000/api/restaurant/updateresto/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success("Restaurant details updated successfully!");
            navigate('/restauranthome');
        } catch (error) {
            toast.error("Failed to update restaurant details");
        }
    };

    return (
        <MainLayout>
            <div className='row wrapper'>
                <div className='col-10 col-lg-5 registration-form'>
                    <form className='shadow-lg' onSubmit={submitHandler}>
                        <h1 className='mb-3'>Edit Restaurant</h1>

                        <div className='form-group'>
                            <label htmlFor='ownerName_field'>Owner Name</label>
                            <input
                                type="text"
                                id="ownerName_field"
                                className={`form-control ${errors.ownerName && 'is-invalid'}`}
                                name="ownerName"
                                value={ownerName}
                                onChange={onChange}
                            />
                            {errors.ownerName && <div className="invalid-feedback">{errors.ownerName}</div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='phoneNumber_field'>Phone Number</label>
                            <input
                                type="number"
                                id="phoneNumber_field"
                                className={`form-control ${errors.phoneNumber && 'is-invalid'}`}
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={onChange}
                            />
                            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='address_field'>Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className={`form-control ${errors.address && 'is-invalid'}`}
                                name="address"
                                value={address}
                                onChange={onChange}
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='city_field'>City</label>
                            <input
                                type="text"
                                id="city_field"
                                className={`form-control ${errors.city && 'is-invalid'}`}
                                name="city"
                                value={city}
                                onChange={onChange}
                            />
                            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password_field'>Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className={`form-control ${errors.password && 'is-invalid'}`}
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='confirmPassword_field'>Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword_field"
                                className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>

                        <button type='submit' className='btn btn-block py-3'>Update</button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default EditRestaurant;
