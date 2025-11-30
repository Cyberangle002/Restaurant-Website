export default function BookingForm() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">

      <h2 className="text-3xl font-bold mb-6 text-center">Reserve Your Table</h2>

      <form className="grid gap-4">
        <input type="text" placeholder="Name" className="p-3 border rounded" />
        <input type="text" placeholder="Phone Number" className="p-3 border rounded" />
        <input type="date" className="p-3 border rounded" />
        <input type="time" className="p-3 border rounded" />
        <select className="p-3 border rounded">
          <option>2 Persons</option>
          <option>4 Persons</option>
          <option>6 Persons</option>
        </select>

        <button className="bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition">
          Book Now
        </button>
      </form>
    </div>
  );
}
