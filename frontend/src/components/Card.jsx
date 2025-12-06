export default function Card({ title, subtitle, color, image }) {
  return (
    <div
      className="rounded-3xl p-6 shadow-lg hover:scale-105 transition cursor-pointer"
      style={{ backgroundColor: color }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-xl mb-3"
        />
      )}

      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm opacity-80">{subtitle}</p>
    </div>
  );
}
