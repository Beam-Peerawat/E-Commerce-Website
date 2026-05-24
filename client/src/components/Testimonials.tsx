export default function Testimonials() {
  const reviews = [
    { name: 'Sarah M.', text: 'I am blown away by the quality and style of the clothes I received from Shop.co.' },
    { name: 'Alex K.', text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.' },
    { name: 'James L.', text: 'As someone who is always on the lookout for unique fashion pieces, I’m thrilled to have stumbled upon Shop.co.' },
  ];
  return (
    <section className="py-10 w-full">
      <h2 className="text-4xl font-extrabold text-black mb-10">OUR HAPPY CUSTOMERS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div key={i} className="border rounded-3xl p-6">
            <div className="text-yellow-400 mb-2">★★★★★</div>
            <h4 className="font-bold mb-2">{r.name} ✅</h4>
            <p className="text-gray-600 text-sm">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
