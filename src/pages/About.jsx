import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            We are a passionate team of chefs and staff committed to giving you an unforgettable dining experience.
          </p>
          <p className="text-gray-700">
            Come and taste the difference, whether for a casual lunch, a family dinner, or a special celebration.
          </p>
        </div>
        <div className="h-80 bg-gray-300 rounded-xl"></div>
      </section>
      <Footer />
    </div>
  );
}
