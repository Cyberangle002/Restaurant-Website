export default function FoodCard({ img, title, price }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition">
      <img src={img} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-orange-600 font-bold mt-2">₹{price}</p>
      </div>
    </div>
  );
}
