export default function Newsletter() {
  return (
    <section className="py-16 bg-orange-50 text-center">
      <h2 className="text-3xl font-bold mb-4">Subscribe for Offers 📧</h2>

      <div className="max-w-md mx-auto flex">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 p-3 border rounded-l-xl"
        />
        <button className="bg-orange-600 text-white px-6 rounded-r-xl">
          Subscribe
        </button>
      </div>
    </section>
  );
}
