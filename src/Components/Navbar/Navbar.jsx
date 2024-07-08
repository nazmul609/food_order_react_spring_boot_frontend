import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(open);
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
        <a href='#restaurants' className='text-gray-700 hover:text-[#7F00FF]'>Restaurants</a>
        <a href='#about' className='text-gray-700 hover:text-[#7F00FF]'>About</a>
      </div>

      <div className='hidden md:flex items-center space-x-2 lg:space-x-4'>
        <Button variant='outlined' color='primary'>Login</Button>
        <Button variant='contained' color='primary'>Signup</Button>
        <IconButton>  {/* dynamic badgeContent later */}
          <ShoppingCartIcon style={{ color: '#7F00FF' }} />
        </IconButton>
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
            <ListItem button component='a' href='#restaurants' onClick={toggleDrawer(false)}>
              <ListItemText primary='Restaurants' />
            </ListItem>
            <ListItem button component='a' href='#about' onClick={toggleDrawer(false)}>
              <ListItemText primary='About' />
            </ListItem>
            <ListItem>
              <Button variant='outlined' color='primary' fullWidth>Login</Button>
            </ListItem>
            <ListItem>
              <Button variant='contained' color='primary' fullWidth>Signup</Button>
            </ListItem>
          </List>
        </Drawer>
      </div>
      
    </div>
  );
}

export default Navbar;
