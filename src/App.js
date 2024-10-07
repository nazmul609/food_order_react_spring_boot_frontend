import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import AllRestaurantsPage from './Components/Restaurant/AllRestaurantsPage';
import RestaurantDetails from './Components/Restaurant/RestaurantDetails';
import CartPage from './Components/Cart/CartPage';
import CustomerOnboarding from './Components/Customer/CustomerOnbaording';
import Profile from './Components/Customer/Profile';
import VendorOnboarding from './Components/Vendor/VendorOnboarding';
import VendorProfile from './Components/Vendor/VendorProfile';
import AdminProfile from './Components/Admin/AdminProfile';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import MyRestoura from './Components/Customer/MyRestoura';


function App() {
  return (
    <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<AllRestaurantsPage />} />
          <Route path="/restaurant/:name/:id" element={<RestaurantDetails />} />
          <Route path="/cart/:id" element={<CartPage/>} />
          
          <Route path="/customer-onboarding/:id" element={<CustomerOnboarding/>} />
          <Route path="/customer-profile/*" element={<Profile />} />
          <Route path="/my-restoura/*" element={<MyRestoura />} />
          

          <Route path="/vendor-onboarding/:id" element={<VendorOnboarding/>} />
          <Route path="/vendor-profile/*" element={<VendorProfile />} />

          <Route path="/admin-profile/*" element={<AdminProfile />} />

          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;
