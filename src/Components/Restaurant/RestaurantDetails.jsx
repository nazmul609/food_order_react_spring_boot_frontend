import React, { useState } from 'react'
import { FormControlLabel, Grid, Typography, RadioGroup, Divider, FormControl, Radio } from '@mui/material'; // Import Grid from Material-UI
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';



const categories = [
    "Thali",
    "Starters",
    "Indian Main Course",
    "Rice and Biryani",
    "Breads",
    "Accompaniments",
    "Dessert",
  ];
  
  const foodTypes = [
    {label:"All",value:"all"},
    { label: "Vegetarian Only", value: "vegetarian" },
    { label: "Non-Vegetarian Only", value: "non_vegetarian" },
    {label:"Seasonal",value:"seasonal"},
    
  ];

const menu = [1, 1, 1]

const RestaurantDetails = () => {
  const [foodType] = useState("all")
  // there was [foodType,setFoodType]

  const handleFilter =(e)=> {
    console.log(e.target.value, e.target.name);
  }

  return (
    <div className='px-5 lg:px-20 bg-green-50'>

      <section className='mt-2'>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img className='w-full h-[40vh] object-cover' 
              src="https://cdn.pixabay.com/photo/2020/09/17/12/41/cafe-5579069_640.jpg" alt="food palace pic" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img className='w-full h-[40vh] object-cover' 
              src="https://cdn.pixabay.com/photo/2016/11/18/14/39/beans-1834984_640.jpg" alt="food palace pic" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <iframe className='w-full h-[40vh] object-cover'  src="https://www.youtube.com/embed/95BCU1n268w?si=3zFF6olfasihaFVw" title="Welcome to Restoura" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </Grid>
          </Grid>
        </div>
        <div className='pt-3 pb-5'>
          <h1 className='text-gray-800 py-2 mt-2 block font-extrabold drop-shadow-md'>Homemade Delight</h1>
          <p className='text-gray-500 mt-1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, alias accusantium nostrum tenetur, optio maiores delectus ab in sequi mollitia error a nam animi recusandae. Quam in ea incidunt assumenda!</p>
          <div className='space-y-3 mt-3'>
            <p className='text-gray-500 flex items-center gap-3'>
            <LocationOnIcon/> <span>ON, Canada</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
            <CalendarTodayIcon/> <span>Mon-Sun : 9am - 9pm</span>
            </p>
          </div>
        </div>
      </section>
      <Divider/>
      <section className='pt-[2rem] lg:flex relative'>
        <div className='space-y-10 lg:w-[20%] filter'>
          <div className='box space-y-5 lg:sticky top-28'>
            <div>
              <Typography variant="h5" sx={{paddingBottom:"1rem"}}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup onChange={handleFilter} name="food_type" value={foodType}> 
                  {foodTypes.map((item)=>(
                    <FormControlLabel
                    key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  )
                  )}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider/>
            <div>
              <Typography variant="h5" sx={{paddingBottom:"1rem"}}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup onChange={handleFilter} name="food_type" value={foodType}> 
                  {categories.map((item)=>(
                    <FormControlLabel
                    key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  )
                  )}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className='space-y-4 lg:w-[80%] menu'>
          {menu.map((item)=><MenuCard/>)}
        </div>
      </section>
    </div>
  )
}

export default RestaurantDetails;