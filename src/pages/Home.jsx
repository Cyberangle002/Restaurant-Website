import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">
      <Navbar />

      {/* HERO */}
      <section className="py-24 text-center">
        <motion.h1 initial={{ opacity:0,y:50 }} animate={{ opacity:1,y:0 }} className="text-5xl font-extrabold mb-4">
          Taste That Brings You Back
        </motion.h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Experience the best dishes in town, handcrafted with love and served with a smile.
        </p>
        <Link to="/menu" className="px-6 py-3 bg-orange-600 text-white rounded-full hover:scale-105 transition">
          Explore Menu
        </Link>
      </section>

      {/* Menu Preview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center">Popular Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Pasta Delight','Classic Pizza','Cheese Burger'].map((item,idx)=>(
            <motion.div key={idx} whileHover={{scale:1.05}} className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
              <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
              <h3 className="text-xl font-semibold">{item}</h3>
              <p className="text-gray-600 mt-2">Delicious {item} made with fresh ingredients.</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
