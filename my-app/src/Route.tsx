import React, { useEffect } from 'react';

import './App.css';
// import './index.css'
import { BrowserRouter as Router, Routes,Route, Navigate } from "react-router-dom";
import Login from './components/User/Login';
import Register from './components/User/Register';
import OtpVerification from './components/User/Otpverification';
import Home from './components/User/Home';
import Adminlogin from './components/Admin/Adminlogin';
import AdminHome from './components/Admin/AdminHome';
import RegisterRestaurant from './components/Admin/RegisterRestaurant';
import RegisterDeliveryPerson from './components/Admin/RegisterDeliveryPerson';
import User from './components/Admin/User';
import TablePage from './components/Admin/TablePage';
import Restaurant from './components/Admin/Restaurant'
import Deliveryperson from './components/Admin/Deliveryperson'
import Restaurantlogin from './components/Restaurant/Restaurantlogin';
import Restauranthome from './components/Restaurant/Restauranthome';
import AddCategory from './components/Restaurant/CategoryAdd';
import AddCuisine from './components/Restaurant/Cuisineadd';
import AddFoodItem from './components/Restaurant/Addfooditem';
import Category from './components/Restaurant/Category';
import Cuisine from './components/Restaurant/Cuisine'
import Cat from './components/Restaurant/Cat'
import { CustomNavbar } from './components/User/NavbarComponent';
import FoodMenu from './components/User/Foodlist'
import FoodItemTable from './components/Restaurant/FoodItem'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import Cart from './components/User/Cart';
import EditFoodItem from './components/Restaurant/Editfooditem';
import Navbar from './components/User/Navbar';
import Landing from './components/User/Landing'
import FoodItems from './components/User/Fooditems';
import RestaurantDetail from './components/User/Restaurantdetails';
import Profile from './components/Restaurant/Profile';
import { PrivateOutlet } from './utils/PrivateOutlet';
import CheckoutPage from './components/User/Checkout';
import UserProfile from './components/User/UserProfile';
import ChatPage from './components/User/Chat';
import AddAddress from './components/User/AddAddress';
import RestaurantMessages from './components/Restaurant/Messages';
import Deliverylogin from './components/Delivery person/Deliverylogin';
import DeliveryPersonHome from './components/Delivery person/Deliverypersonhome';
import OrdersPage from './components/User/Order';
import OrderDetailsPage from './components/User/Orderplace';
import EditRestaurant from './components/Restaurant/Editprofile';
import ForgotPassword from './components/User/ForgotPassword';



// function ProtectedRoute({ children, isAuthenticated }: { children: JSX.Element; isAuthenticated: boolean }) {
//   return isAuthenticated ? children : <Navigate to="/login" />;
// }

// function ProtectRoute({ children, isAuthenticated }: { children: JSX.Element; isAuthenticated: boolean }) {
//   return isAuthenticated ? children : <Navigate to="/adminlogin" />;
// }


function AppRoutes() {

  console.log("first")
const token = localStorage.getItem('token');
console.log(token,"token2");
  const admintoken=localStorage.getItem('admintoken')
  console.log(admintoken,"admin")
 console.log(token,"token")
  const { isAuthenticatedUser, loading, error, user } = useSelector((state: RootState) => state.auth);
  console.log(isAuthenticatedUser,"uusseerr500")
  const {isAuthenticated,restaurant} =useSelector((state:RootState)=>state.restaurant )
  console.log(isAuthenticated,"is resto")
  // const  isAuthenticated=token?true:false
  const isuserAuthenticated=!! token
  const adminisAuthenticated =!! admintoken
  
  console.log(isAuthenticatedUser,"auth")



// const token = localStorage.getItem('token');
//   console.log(token,'token in the api.tsx')
//   const admintoken =localStorage.getItem('admintoken')
  


//   // const isAuthenticated = !!token;
//   const adminAuthenticated=!!admintoken
//   // const { cartItems } = useSelector((state: RootState) => state.cart);
//   const{isAuthenticatedUser,loading,error,user}=useSelector((state:RootState)=>state.auth)
//   useEffect(()=> {
//     // if(user!== null){
//     //   localStorage.setItem('user', JSON.stringify(user));
//     // }
//     // if(admintoken!== null){
//     //   localStorage.setItem('admin', JSON.stringify(user));
//     // }
//   },[user,admintoken])

 


//   console.log(isAuthenticatedUser, "auth")
//   const isUserAuthenticated= token? true: false;
//   const isaAdminAuthenticated=admintoken?true:false;
//   console.log(isUserAuthenticated, "ïuuu")
//   console.log(isaAdminAuthenticated,'adminlogin')

  return (


    <Router>
      <Routes>


{/*       
          <Route
            path="/login" element={<Login />}
            
          />
        <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={isUserAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />   


          <Route
            path="/adminlogin"
            element={isaAdminAuthenticated ? <Navigate to="/adminhome" /> : <Adminlogin />}
          />
          <Route
            path="/adminhome"
            element={
              <ProtectRoute isAuthenticated={isaAdminAuthenticated}>
                <AdminHome />
              </ProtectRoute>
            }
          />
          <Route
  path="/adminhome"
  element={
    admintoken ? <AdminHome /> : <Navigate to="/adminlogin" />
  }
/> */}

        {/* <Route path='/' element={isuserAuthenticated?<Home/>:<Login/>} /> */}
      <Route path='/' element={<Landing />} />
        {/* <Route path='/login' element={isuserAuthenticated?<Home/>:<Login/>} /> */} 
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/otp' element={<OtpVerification />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Orders' element={<OrdersPage />} />

        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/chat/:id' element={<ChatPage/>} />
        <Route path='/addaddress' element={<AddAddress />} />
        <Route path='/orderplaced' element={<OrderDetailsPage/>}/>
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/admin' element={adminisAuthenticated?<AdminHome/>:<Adminlogin />} />
        <Route path='/admin-home' element={adminisAuthenticated?<AdminHome/>:<Adminlogin />} />
        <Route path='/restaurantregister' element={adminisAuthenticated?<RegisterRestaurant />:<Adminlogin />} />
        <Route path='/deliverypersonregister' element={adminisAuthenticated?<RegisterDeliveryPerson />:<Adminlogin />} />
        <Route path='/user' element={adminisAuthenticated?<TablePage/>:<Adminlogin />} />
        <Route path='/restaurant' element={adminisAuthenticated?<Restaurant/>:<Adminlogin />} />
        <Route path='/delivery-person' element={adminisAuthenticated?<Deliveryperson />:<Adminlogin/>}/>
        <Route path='/restaurantlogin' element={<Restaurantlogin />} />


        <Route element={<PrivateOutlet />}>
        <Route path='/restauranthome' element={<Restauranthome />} />
        </Route>

        <Route path='/messages' element={<RestaurantMessages />} />
        
        <Route path='/addcategory' element={<AddCategory/>} />
        <Route path='/addcuisine' element={<AddCuisine />}  />
        <Route path='/food' element={<FoodItemTable />} />
        <Route path='/addfooditem' element={<AddFoodItem />} />
        <Route path='/category' element={<Category />} />
        <Route path='/cuisine' element={<Cuisine />} />
        <Route path='/cart' element={<Cart />} />
        {/* <Route path='/restaurant/:id' element={<FoodMenu/>}/> */}
        <Route path='/editfooditem/:id' element={<EditFoodItem />} />
        <Route path='/category/:categoryId' element={<FoodItems />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail/>}/>
        <Route path='/edit-profile/:id' element={<EditRestaurant />} />
        <Route path='/profile' element={<Profile />} />
        {/* <Route path='/nav'element={<NavbarComponent />} /> */}
      
{/* deluiveryperson//////////////// */}
        <Route path='/deliverylogin' element={<Deliverylogin />} />
        <Route path='/deliveryhome' element={<DeliveryPersonHome />} />
      </Routes>
    </Router>

   
  );
}

export default AppRoutes;
