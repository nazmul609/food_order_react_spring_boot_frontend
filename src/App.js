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




function App() {
  return (
    <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<AllRestaurantsPage />} />
          <Route path="/single-restaurant" element={<RestaurantDetails />} />
          <Route path="/cart" element={<CartPage/>} />
          
          <Route path="/customer-onboard" element={<CustomerOnboarding/>} />
          <Route path="/customer-profile/*" element={<Profile />} />

          <Route path="/vendor-onboard" element={<VendorOnboarding/>} />
          <Route path="/vendor-profile/*" element={<VendorProfile />} />
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;
