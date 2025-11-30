import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="h-40 bg-gray-200 rounded-xl"></motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
