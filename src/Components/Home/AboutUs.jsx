import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">About Restoura</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Restoura empowers homemade chefs to create restaurants and offer authentic native cuisines. It's a place where chefs and food lovers come together, offering fresh, halal-certified dishes to those craving a taste of home.
          </p>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-gray-100 py-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                color: "bg-blue-500",
                title: "Native Food Experience",
                description: "Authentic taste of native cuisines by local chefs.",
                iconPath: "M20 12H4"
              },
              {
                color: "bg-green-500",
                title: "Halal Certified",
                description: "Our platform ensures all food adheres to Halal standards.",
                iconPath: "M16 9v10m4-6H8m0-10v10m4-6H4"
              },
              {
                color: "bg-yellow-500",
                title: "Support Local Chefs",
                description: "Your orders support local chefs delivering homemade meals.",
                iconPath: "M12 20l4-16m0 0l-4-4-4 4m8 16l-4-4-4 4"
              },
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center">
                <div className={`h-16 w-16 flex items-center justify-center rounded-full ${feature.color} text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.iconPath} />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-2 text-gray-600">Real feedback from our satisfied customers</p>
        </div>
        <div className="mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl px-4">
          {[
            {
              text: "Restoura has been a blessing! I can now enjoy the taste of my home even while living abroad. Highly recommended!",
              name: "Jane Doe",
              role: "Customer",
              imgSrc: "https://randomuser.me/api/portraits/women/32.jpg"
            },
            {
              text: "As a chef, Restoura has given me the platform to share my culinary skills and make an income.",
              name: "John Smith",
              role: "Chef",
              imgSrc: "https://randomuser.me/api/portraits/men/32.jpg"
            },
          ].map((testimonial, index) => (
            <article key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-600">{testimonial.text}</p>
              <footer className="mt-6 flex flex-col items-center">
                <img src={testimonial.imgSrc} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="text-sm">
                  <p className="text-gray-900 font-medium">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* Our Chefs Gallery */}
      <section className="bg-white py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Chefs</h2>
          <p className="text-gray-600">Dedicated and skilled chefs sharing their love for cuisine</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto px-4">
          {[
            {
              imgSrc: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?auto=format&fit=crop&w=1500&q=80",
              name: "Sarah Lee",
              specialization: "Halal / Authentic Cuisine"
            },
            {
              imgSrc: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=764&q=80",
              name: "Mike Chang",
              specialization: "Asian Fusion"
            },
          ].map((chef, index) => (
            <a key={index} href="/null" className="group relative block overflow-hidden rounded-lg shadow-lg">
              <img src={chef.imgSrc} alt={chef.name} className="object-cover w-full h-64 transition duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-4">
                <div className="text-white">
                  <p className="text-lg font-medium">{chef.name}</p>
                  <p className="text-sm">{chef.specialization}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16 text-center">
        <h2 className="text-4xl font-bold text-white">Join Restoura Today!</h2>
        <p className="mt-4 text-lg text-white max-w-xl mx-auto">
          Whether you’re a chef eager to share your talents or a customer looking for the authentic taste of home, Restoura is here for you.
        </p>
        <a href="/null" className="mt-8 inline-block bg-white text-blue-600 px-12 py-3 rounded-lg shadow-lg font-medium transition hover:bg-transparent hover:text-white border border-transparent hover:border-white">
          Get Started
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
