export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] pt-20 pb-10 w-full px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">SHOP.CO</h2>
          <p className="text-gray-500 text-sm mb-4">We have clothes that suits your style and which you're proud to wear.</p>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-black rounded-full" />
            <div className="w-8 h-8 bg-black rounded-full" />
            <div className="w-8 h-8 bg-black rounded-full" />
          </div>
        </div>
        {['Company', 'Help', 'FAQ', 'Resources'].map(title => (
          <div key={title}>
            <h4 className="font-bold mb-4 text-black">{title.toUpperCase()}</h4>
            <ul className="text-gray-500 text-sm space-y-2">
              <li>About</li>
              <li>Features</li>
              <li>Works</li>
              <li>Career</li>
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-500 text-sm border-t pt-5">
        Shop.co © 2000-2023, All Rights Reserved
      </div>
    </footer>
  );
}
