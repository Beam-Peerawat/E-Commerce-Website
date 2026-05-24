export default function BrowseByStyle() {
  const styles = [
    { title: 'Casual', img: 'bg-gray-300' },
    { title: 'Formal', img: 'bg-gray-400' },
    { title: 'Party', img: 'bg-gray-300' },
    { title: 'Gym', img: 'bg-gray-400' },
  ];
  return (
    <section className="bg-[#F0F0F0] rounded-3xl p-10 md:p-16 my-10 w-full">
      <h2 className="text-4xl font-extrabold text-center text-black mb-10">BROWSE BY DRESS STYLE</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {styles.map((style) => (
          <div key={style.title} className={`${style.img} rounded-3xl h-64 p-8 flex items-start text-3xl font-bold text-white`}>
            {style.title}
          </div>
        ))}
      </div>
    </section>
  );
}
