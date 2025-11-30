export default function Testimonials() {
  const reviews = [
    { name: "Riya", text: "Amazing taste! Loved the pasta 😍", rating: 5 },
    { name: "Karan", text: "Service was very good!", rating: 4 },
    { name: "Simran", text: "Best pizza in town! 🍕", rating: 5 },
  ];

  return (
    <section className="py-16 bg-orange-50">
      <h2 className="text-4xl text-center font-bold mb-8">What Customers Say</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-gray-700">“{r.text}”</p>
            <p className="mt-4 font-semibold">{r.name}</p>
            <p className="text-yellow-500">{'⭐'.repeat(r.rating)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
