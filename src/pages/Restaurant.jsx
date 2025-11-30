import React from 'react';
import { motion as Motion } from 'framer-motion';

export default function Restaurant() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600">MyRestaurant</div>
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li><a href="#hero" className="hover:text-orange-600 transition">Home</a></li>
            <li><a href="#menu" className="hover:text-orange-600 transition">Menu</a></li>
            <li><a href="#about" className="hover:text-orange-600 transition">About</a></li>
            <li><a href="#contact" className="hover:text-orange-600 transition">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative bg-orange-50 py-24">
        <Motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">Taste That Brings You Back</h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">Experience the best dishes in town, handcrafted with love and served with a smile.</p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 bg-orange-600 text-white rounded-full text-lg font-medium hover:scale-105 transition">Explore Menu</button>
            <button className="px-6 py-3 border border-orange-600 text-orange-600 rounded-full text-lg font-medium hover:bg-orange-600 hover:text-white transition">Book a Table</button>
          </div>
        </Motion.div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center">Our Special Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Pasta Delight','Classic Pizza','Cheese Burger','Spicy Momos','Special Thali','Cold Coffee'].map((item, idx) => (
            <Motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
              <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
              <h3 className="text-xl font-semibold">{item}</h3>
              <p className="text-gray-600 text-sm mt-2">Delicious {item} made with fresh ingredients and love.</p>
              <button className="mt-4 text-orange-600 font-medium hover:underline">View More</button>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 mb-4">We are a passionate team of chefs and service staff committed to giving you an unforgettable dining experience. Our restaurant combines quality ingredients, a warm atmosphere, and excellent service to delight every guest.</p>
            <p className="text-gray-700">Come and taste the difference, whether for a casual lunch, a family dinner, or a special celebration.</p>
          </div>
          <div className="h-80 bg-gray-300 rounded-xl"></div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <Motion.div key={i} whileHover={{ scale: 1.05 }} className="h-40 bg-gray-200 rounded-xl"></Motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="bg-orange-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-center">Book a Table</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className="p-3 border rounded-lg" />
              <input type="text" placeholder="Phone Number" className="p-3 border rounded-lg" />
              <input type="date" className="p-3 border rounded-lg" />
              <input type="time" className="p-3 border rounded-lg" />
              <textarea placeholder="Message" className="p-3 border rounded-lg md:col-span-2"></textarea>
              <button className="md:col-span-2 bg-orange-600 text-white py-3 rounded-full hover:scale-105 transition text-lg font-medium">Submit</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-center py-6 text-gray-500 text-sm">© 2025 MyRestaurant — All Rights Reserved</footer>
    </div>
  );
}