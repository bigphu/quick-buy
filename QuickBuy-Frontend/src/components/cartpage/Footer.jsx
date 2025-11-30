export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-12 text-sm text-gray-700">

        <div>
          <h4 className="font-semibold text-gray-800 mb-4 tracking-wide">
            HELP & SUPPORT
          </h4>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>Returns</li>
            <li>Shipping & Pickup</li>
            <li>Track Order</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-4 tracking-wide">
            ABOUT QUICKBUY
          </h4>
          <ul className="space-y-2">
            <li>Our Company</li>
            <li>Careers</li>
            <li>Store Locator</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 tracking-wide">
            POLICIES & TERMS
          </h4>
          <ul className="space-y-2">
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Accessibility</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-4 tracking-wide">
            CONNECT
          </h4>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-gray-600">

          <p>© 2025 QuickBuy Inc. All Rights Reserved.</p>

          <div className="flex items-center gap-2">
            <span className="text-lg">🌐</span>
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}