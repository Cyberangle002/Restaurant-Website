export default function Offers() {
  return (
    <section className="py-16 text-center bg-white">
      <h2 className="text-4xl font-bold mb-6">Today’s Special Offers 🎁</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        <div className="bg-orange-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold">Buy 1 Get 1 Pizza</h3>
          <p className="text-gray-700">Limited time only!</p>
        </div>
        <div className="bg-orange-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold">Family Combo ₹399</h3>
          <p className="text-gray-700">Burger + Fries + Coke</p>
        </div>
        <div className="bg-orange-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold">Free Dessert</h3>
          <p className="text-gray-700">On orders above ₹599</p>
        </div>
      </div>
    </section>
  );
}
