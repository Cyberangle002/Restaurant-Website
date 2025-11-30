import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Contact() {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-6 text-center">Book a Table</h2>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Your Name" className="p-3 border rounded-lg" />
            <input type="text" placeholder="Phone Number" className="p-3 border rounded-lg" />
            <input type="date" className="p-3 border rounded-lg" />
            <input type="time" className="p-3 border rounded-lg" />
            <textarea placeholder="Message" className="p-3 border rounded-lg md:col-span-2"></textarea>
            <button className="md:col-span-2 bg-orange-600 text-white py-3 rounded-full hover:scale-105 transition text-lg font-medium">
              Submit
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
