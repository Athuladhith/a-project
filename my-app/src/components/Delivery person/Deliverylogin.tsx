import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {deliveryPersonLogin} from '../../actions/DeliveryAction'
import { RootState } from '../../store';
import { toast } from 'react-toastify';
const Deliverylogin: React.FC = () => {
    const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate=useNavigate()
  const dispatch =useDispatch();
  const{isAuthenticated,loading,error}=useSelector((state:RootState)=>state.deliveryPerson)
  

 useEffect(()=>{
  if (isAuthenticated) {
    toast.success("Login successful!"); 
    setTimeout(() => {
    navigate('/deliveryhome')
      
    }, 1000); 
  }
  if (error) {
    console.log(error);
    toast.error("Login failed. Please try again."); 
  }
 },[dispatch,isAuthenticated,error])
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   
    const personData = {
      email,
      password,
    };

    dispatch(deliveryPersonLogin(personData) as any);
  }
  return (
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler} >
            <h1 className="mb-3">Delivery person Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>
            
            <div className="google-login">
              
            </div>
            
          </form>
        </div>
      </div>
  );
};

export default Deliverylogin;