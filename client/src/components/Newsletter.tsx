export default function Newsletter() {
  return (
    <section className="bg-black text-white rounded-3xl p-10 md:p-16 my-10 flex flex-col md:flex-row justify-between items-center w-full">
      <h2 className="text-4xl font-extrabold max-w-md mb-6 md:mb-0">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
      <div className="flex flex-col gap-4">
        <input type="email" placeholder="Enter your email address" className="rounded-full px-6 py-3 text-black w-72" />
        <button className="bg-white text-black rounded-full px-6 py-3 font-medium">Subscribe to Newsletter</button>
      </div>
    </section>
  );
}
