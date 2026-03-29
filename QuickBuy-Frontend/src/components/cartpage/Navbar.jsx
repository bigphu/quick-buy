import { useNavigate } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-[#7BB0F9] to-[#89C3F8] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: Logo + Menu */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-5 h-5 bg-blue-700 rotate-45 rounded-sm"></div>
            <h1 className="text-xl font-bold text-black">QuickBuy</h1>
          </div>

          {/* Category Links */}
          <nav className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
            <a onClick={() => navigate('/')} className="hover:text-gray-600 cursor-pointer">Home</a>
            <a href="#" className="hover:text-gray-600">New Arrivals</a>
            <a href="#" className="hover:text-gray-600">Electronics</a>
            <a href="#" className="hover:text-gray-600">Grocery</a>
            <a href="#" className="hover:text-gray-600">Toys</a>
            <a href="#" className="hover:text-gray-600">Fashion</a>
          </nav>
        </div>

        {/* RIGHT: Search + Icons */}
        <div className="flex items-center gap-4">

          {/* Search Bar */}
          <div className="relative w-72 hidden md:block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2.5 pl-11 pr-4 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none"
            />
          </div>

          {/* Icons */}
          <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-xl">
            🤍
          </button>

          <button
            onClick={() => navigate('/account')}
            className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-xl"
          >
            👤
          </button>

          {/* Cart with badge */}
          <div className="relative">
            <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-xl">
              🛒
            </button>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}