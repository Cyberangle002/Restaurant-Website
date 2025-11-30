import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";

export default function Menu() {
  const dishes = ['Pasta Delight','Classic Pizza','Cheese Burger','Spicy Momos','Special Thali','Cold Coffee'];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center">Full Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((item,idx)=>(
            <motion.div key={idx} whileHover={{scale:1.05}} className="bg-orange-50 shadow-lg rounded-2xl p-6 border border-gray-100">
              <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
              <h3 className="text-xl font-semibold">{item}</h3>
              <p className="text-gray-600 mt-2">Freshly prepared {item} to delight your taste buds.</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
