import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-[#F2F0F1] rounded-3xl overflow-hidden mb-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side: Content */}
        <div className="md:w-1/2 p-10 md:p-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-6">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
          
          {/* Metrics */}
          <div className="flex gap-8 mt-12">
            <div>
              <p className="text-3xl font-bold">200+</p>
              <p className="text-gray-500 text-sm">International Brands</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2,000+</p>
              <p className="text-gray-500 text-sm">High-Quality Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold">30,000+</p>
              <p className="text-gray-500 text-sm">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="md:w-1/2 h-[400px] md:h-[500px] w-full bg-gray-300 relative">
          {/* แทนที่ด้วยรูปภาพจริงที่นี่ */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Image Placeholder
          </div>
        </div>
      </div>

      {/* Brand Bar */}
      <div className="bg-black py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20 text-white font-bold text-2xl px-4">
          <span>VERSACE</span>
          <span>ZARA</span>
          <span>GUCCI</span>
          <span>PRADA</span>
          <span>CK</span>
        </div>
      </div>
    </section>
  );
}
