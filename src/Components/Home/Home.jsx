import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RestaurantCard from './RestaurantCard';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const cuisines = [
    { title: 'Bengali', image: 'https://cdn.pixabay.com/photo/2022/02/12/15/00/biryani-7009110_640.jpg' },
    { title: 'Pakistani', image: 'https://cdn.pixabay.com/photo/2022/06/10/05/32/biryani-platter-7253751_1280.jpg' },
    { title: 'Italian', image: 'https://cdn.pixabay.com/photo/2024/04/21/18/44/ai-generated-8711272_640.jpg' },
    { title: 'Indian', image: 'https://cdn.pixabay.com/photo/2023/09/28/10/26/indian-restaurant-8281116_640.jpg' },
    { title: 'Mexican', image: 'https://cdn.pixabay.com/photo/2024/06/06/11/53/ai-generated-8812572_640.jpg' },
  ];

  const restaurants = [
    { name: 'The Food Place', image: 'https://cdn.pixabay.com/photo/2017/07/15/13/45/french-restaurant-2506490_640.jpg', ratings: 4.9, location: '123 Main St', isOpen: true },
    { name: 'Cuisine Corner', image: 'https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg', ratings: 4.8, location: '456 Elm St', isOpen: false },
    { name: 'Taste Haven', image: 'https://cdn.pixabay.com/photo/2020/01/31/07/26/chef-4807317_640.jpg', ratings: 4.7, location: '789 Maple St', isOpen: true },
    { name: 'Gourmet Delight', image: 'https://cdn.pixabay.com/photo/2015/09/14/11/43/restaurant-939435_640.jpg', ratings: 4.5, location: '101 Pine St', isOpen: true },
    { name: 'Dine Divine', image: 'https://cdn.pixabay.com/photo/2017/03/27/14/21/chairs-2179044_640.jpg', ratings: 4.2, location: '202 Oak St', isOpen: true },
    { name: 'Food Fiesta', image: 'https://cdn.pixabay.com/photo/2020/08/27/07/31/restaurant-5521372_640.jpg', ratings: 4.6, location: '303 Birch St', isOpen: true },
  ];

  const topRestaurants = restaurants.slice(0, 8);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const handleRestaurantClick = (restaurant) => {
    if (restaurant.isOpen) {
      navigate(`/restaurant/${restaurant.name}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden">

<section
  className="relative bg-[url('https://media.istockphoto.com/id/914940152/photo/empty-wooden-table-top-with-blur-coffee-shop-or-restaurant-interior-background-panoramic-banner.jpg?s=612x612&w=0&k=20&c=mpoF5abC7ys4sTIYUuCemxp3MYFgvuRFVPGzNF8IKTI=')] 
    bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center pt-2" 
>
  <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
  <div className="relative max-w-screen-xl px-4 py-10 sm:px-6 lg:px-16 text-white text-center -mt-20">
    <h1 className="text-4xl font-extrabold text-[#FFD700] sm:text-5xl lg:text-6xl leading-tight lg:leading-snug">
      Order Your<br />
      <strong className="font-extrabold text-[#FF6347]">Favorite Homemade Food</strong>
    </h1>
    <p className="mt-4 max-w-lg mx-auto text-lg sm:text-xl text-yellow-50">
      At Restoura, we bring you the best homemade food from local chefs right to your doorstep.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
      <input
        type="text"
        placeholder="Find your location"
        className="w-full sm:w-auto rounded bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow focus:outline-none"
      />
      <button
        className="w-full sm:w-auto rounded bg-rose-600 px-8 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 transition-transform transform hover:scale-105"
      >
        Search
      </button>
    </div>
  </div>
</section>



      {/* Top Cuisines Section */}
      <section className="px-10 py-10 bg-gray-100">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Top Cuisines</h2>
        <Slider {...settings}>
          {cuisines.map((cuisine, index) => (
            <div key={index} className="px-4">
              <div className="relative group cursor-pointer transition duration-300 transform hover:scale-105">
                <img src={cuisine.image} alt={cuisine.title} className="rounded-lg shadow-lg h-64 w-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg group-hover:bg-opacity-50">
                  <h3 className="text-white text-2xl font-semibold">{cuisine.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Top Rated Handpicked Restaurants Section */}
      <section className="py-16 px-4 bg-white">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Top Rated Handpicked Restaurants</h2>
          <button
            onClick={() => navigate('/restaurants')}
            className="rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 transition duration-300 transform hover:scale-105"
          >
            <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
              Explore Restaurants
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {topRestaurants.map((restaurant, index) => (
            <div
              key={index}
              onClick={() => handleRestaurantClick(restaurant)}
              className={`cursor-pointer ${!restaurant.isOpen ? 'pointer-events-none opacity-60' : ''} transition duration-300 transform hover:scale-105`}
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
