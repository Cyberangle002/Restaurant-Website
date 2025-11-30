export default function Map() {
  return (
    <div className="mt-10 rounded-xl overflow-hidden shadow-lg">
      <iframe
        className="w-full h-80"
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed?pb=YOUR_MAP_LINK"
      ></iframe>
    </div>
  );
}
