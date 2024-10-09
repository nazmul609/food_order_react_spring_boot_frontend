import React, { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Button, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by verifying if a token exists
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const storedUserRole = localStorage.getItem('role');
      const storedUserId = localStorage.getItem('userId');
      setUserRole(storedUserRole);
      setUserId(storedUserId);
    }

    // Fetch the cart item count from local storage or API
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItemCount(cartItems.length);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear token and other user details from local storage
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    handleProfileMenuClose();
    navigate('/login');
  };

  const handleProfileNavigation = () => {
    if (userRole === 'customer') {
      navigate(`/customer-profile/my-profile/${userId}`);
    } else if (userRole === 'vendor') {
      navigate(`/vendor-profile/my-profile/${userId}`);
    }
    handleProfileMenuClose();
  };

  const handleCartNavigation = () => {
    navigate(`/cart/${userId}`);
  };

  return (
    <div className="px-5 py-4 bg-white shadow-lg lg:px-20 flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3 cursor-pointer">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Restoura Logo" className="h-12 w-auto" />
          <div>
            <h1 className="text-2xl font-extrabold text-[#7F00FF]">Restoura</h1>
            <p className="text-sm text-gray-500">Taste of Home</p>
          </div>
        </Link>
      </div>
  
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
        <Link
          to="/about-us"
          className="text-gray-800 hover:bg-gradient-to-r from-[#D4C1FF] to-[#C3B6FF] text-opacity-90 px-3 py-1 rounded-md transition-colors duration-300"
        >
          About
        </Link>
        {userRole !== 'vendor' && (
          <Link
            to="/restaurants"
            className="text-gray-800 hover:bg-gradient-to-r from-[#B9C5FF] to-[#A6B4FF] text-opacity-90 px-3 py-1 rounded-md transition-colors duration-300"
          >
            Restaurants
          </Link>
        )}
        {userRole === 'vendor' && (
          <Link
            to={`/vendor-restoura/my-restaurants/${userId}`}
            className="text-gray-800 hover:bg-gradient-to-r from-[#8FCBFF] to-[#70B9FF] text-opacity-90 px-3 py-1 rounded-md transition-colors duration-300"
          >
            My Restoura
          </Link>
        )}
        {userRole === 'customer' && (
          <Link
            to={`/my-restoura/orders-history/${userId}`}
            className="text-gray-800 hover:bg-gradient-to-r from-[#C5A3FF] to-[#9F7FFF] text-opacity-90 px-3 py-1 rounded-md transition-colors duration-300"
          >
            My Restoura
          </Link>
        )}
      </div>
  
      {/* Actions */}
      <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
        {isLoggedIn ? (
          <>
            {userRole === 'customer' && (
              <IconButton
                onClick={handleCartNavigation}
                className="hover:bg-gradient-to-r from-[#F2F2F5] to-[#E2E2E6] px-2 py-1 rounded transition-colors"
              >
                <Badge badgeContent={cartItemCount} color="secondary">
                  <ShoppingCartIcon style={{ color: '#7F00FF' }} />
                </Badge>
              </IconButton>
            )}
            <IconButton className="hover:bg-gradient-to-r from-[#F2F2F5] to-[#E2E2E6] px-2 py-1 rounded transition-colors">
              <NotificationsIcon style={{ color: '#7F00FF' }} />
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              className="hover:bg-gradient-to-r from-[#F2F2F5] to-[#E2E2E6] px-2 py-1 rounded transition-colors"
            >
              <AccountCircleIcon style={{ color: '#7F00FF' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileNavigation}>View Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              className="text-gray-800 border-gray-800 hover:bg-gradient-to-r from-[#D1C1FF] to-[#BFA6FF] hover:text-white transition-colors"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="contained"
              className="bg-gradient-to-r from-[#A3B6FF] to-[#7F9FFF] text-gray-900 hover:bg-gradient-to-r from-[#A3B6FF] to-[#708FFF] transition-colors"
              onClick={() => navigate('/register')}
            >
              Signup
            </Button>
          </>
        )}
      </div>
  
      {/* Mobile Menu */}
      <div className="md:hidden">
        <IconButton
          onClick={toggleDrawer(true)}
          className="hover:bg-gradient-to-r from-[#A3B6FF] to-[#7F9FFF] px-2 py-1 rounded transition-colors"
        >
          <MenuIcon style={{ color: '#7F00FF' }} />
        </IconButton>
        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
          <List>
            {isLoggedIn ? (
              <>
                {userRole === 'customer' && (
                  <ListItem
                    button
                    onClick={() => {
                      toggleDrawer(false);
                      handleCartNavigation();
                    }}
                  >
                    <IconButton>
                      <Badge badgeContent={cartItemCount} color="secondary">
                        <ShoppingCartIcon style={{ color: '#7F00FF' }} />
                      </Badge>
                    </IconButton>
                  </ListItem>
                )}
                <ListItem>
                  <IconButton>
                    <NotificationsIcon style={{ color: '#7F00FF' }} />
                  </IconButton>
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    toggleDrawer(false);
                    handleProfileNavigation();
                  }}
                >
                  <ListItemText primary="View Profile" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    toggleDrawer(false);
                    handleLogout();
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      toggleDrawer(false);
                      navigate('/login');
                    }}
                  >
                    Login
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      toggleDrawer(false);
                      navigate('/register');
                    }}
                  >
                    Signup
                  </Button>
                </ListItem>
              </>
            )}
  
            <ListItem button component={Link} to="/about-us" onClick={toggleDrawer(false)}>
              <ListItemText primary="About" />
            </ListItem>
            {userRole !== 'vendor' && (
              <ListItem button component={Link} to="/restaurants" onClick={toggleDrawer(false)}>
                <ListItemText primary="Restaurants" />
              </ListItem>
            )}
            {userRole === 'vendor' && (
              <ListItem button component={Link} to={`/vendor-restoura/my-restaurants/${userId}`} onClick={toggleDrawer(false)}>
                <ListItemText primary="My Restoura" />
              </ListItem>
            )}
            {userRole === 'customer' && (
              <ListItem button component={Link} to={`/my-restoura/orders-history/${userId}`} onClick={toggleDrawer(false)}>
                <ListItemText primary="My Restoura" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </div>
    </div>
  );
  
  
  
}

export default Navbar;
