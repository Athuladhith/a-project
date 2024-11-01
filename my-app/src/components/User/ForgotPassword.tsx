import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
interface userdata{
    email:string
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userdata={email}
dispatch(passwordforgot(userdata as userdata))
    

    toast.success("If this email is registered, you will receive a password reset link.");
    
    
    navigate("/forgototp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Forgot Password?</h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email address. We will send you a link to reset your password.
        </p>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email_field" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email_field"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
