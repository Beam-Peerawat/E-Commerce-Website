import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-[#F2F0F1] rounded-3xl overflow-hidden mb-10 w-full">
      <div className="w-full flex flex-col md:flex-row items-center">
        {/* Left Side: Content */}
        <div className="md:w-1/2 p-10 md:p-16 lg:pl-24">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-6">
            YOUR ONE-STOP DESTINATION FOR EVERYTHING
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            From cutting-edge electronics to home essentials, fashion, and sports—find the perfect products for your everyday lifestyle, all in one place.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
          
          {/* Metrics */}
          <div className="flex flex-wrap gap-8 mt-12">
            <div>
              <p className="text-3xl font-bold">100k+</p>
              <p className="text-gray-500 text-sm">Products Online</p>
            </div>
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-gray-500 text-sm">Global Categories</p>
            </div>
            <div>
              <p className="text-3xl font-bold">1M+</p>
              <p className="text-gray-500 text-sm">Satisfied Shoppers</p>
            </div>
          </div>
        </div>

        {/* Right Side: Featured Image */}
        <div className="md:w-1/2 h-[400px] md:h-[500px] w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
            alt="Shopping Lifestyle"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-black py-8 w-full">
        <div className="w-full flex flex-wrap justify-center gap-10 md:gap-20 text-white font-bold text-xl md:text-2xl px-4">
          <span>ELECTRONICS</span>
          <span>FASHION</span>
          <span>HOME & LIVING</span>
          <span>SPORTS</span>
          <span>BEAUTY</span>
        </div>
      </div>
    </section>
  );
}