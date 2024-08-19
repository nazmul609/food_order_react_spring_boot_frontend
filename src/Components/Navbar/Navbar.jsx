import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //login status
  const navigate = useNavigate();

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
    // Add your logout logic here
    setIsLoggedIn(false);
    handleProfileMenuClose();
    navigate('/login');
  };

  return (
    <div className='px-5 z-50 py-[0.8rem] bg-white shadow-md lg:px-20 flex justify-between items-center'>
      <div className='flex items-center space-x-4'>
        <Link to='/' className='cursor-pointer'>
          <img src='/logo.png' alt='Restoura Logo' className='h-12' />
        </Link>
        <Link to='/' className='cursor-pointer'>
          <div>
            <span className='text-2xl font-bold text-[#7F00FF]'>Restoura</span>
            <div className='text-sm text-gray-500'>Taste of Home</div>
          </div>
        </Link>
      </div>

      <div className='hidden md:flex items-center space-x-4 lg:space-x-10'>
        <Link to='/restaurants' className='text-gray-700 hover:text-[#7F00FF]'>Restaurants</Link>
        <Link to='/about' className='text-gray-700 hover:text-[#7F00FF]'>About</Link>
      </div>

      <div className='hidden md:flex items-center space-x-2 lg:space-x-4'>
        {isLoggedIn ? (
          <>
            <IconButton>
              <ShoppingCartIcon style={{ color: '#7F00FF' }} />
            </IconButton>
            <IconButton onClick={handleProfileMenuOpen}>
              <AccountCircleIcon style={{ color: '#7F00FF' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>View Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button variant='outlined' color='primary' onClick={() => navigate('/login')}>Login</Button>
            <Button variant='contained' color='primary' onClick={() => navigate('/register')}>Signup</Button>
          </>
        )}
      </div>

      {/* Mobile menu button */}
      <div className='md:hidden'>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon style={{ color: '#7F00FF' }} />
        </IconButton>
        <Drawer
          anchor='right'
          open={openDrawer}
          onClose={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to='/restaurants' onClick={toggleDrawer(false)}>
              <ListItemText primary='Restaurants' />
            </ListItem>
            <ListItem button component={Link} to='/about' onClick={toggleDrawer(false)}>
              <ListItemText primary='About' />
            </ListItem>
            {isLoggedIn ? (
              <>
                <ListItem>
                  <IconButton>
                    <ShoppingCartIcon style={{ color: '#7F00FF' }} />
                  </IconButton>
                </ListItem>
                <ListItem button onClick={() => { toggleDrawer(false); navigate('/profile'); }}>
                  <ListItemText primary='View Profile' />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary='Logout' />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Button variant='outlined' color='primary' fullWidth onClick={() => { toggleDrawer(false); navigate('/login'); }}>Login</Button>
                </ListItem>
                <ListItem>
                  <Button variant='contained' color='primary' fullWidth onClick={() => { toggleDrawer(false); navigate('/register'); }}>Signup</Button>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </div>
    </div>
  );
}

export default Navbar;
