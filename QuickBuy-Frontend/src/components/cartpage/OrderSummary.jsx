import { useState } from "react";

export default function OrderSummary({ subtotal, shipping, tax, total, applyCoupon }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null); 

  const handleApply = () => {
    const result = applyCoupon(code);
    if (result) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 w-full max-w-xs ml-auto">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="w-full border-t border-gray-200 my-4"></div>

      <div className="flex justify-between font-bold text-xl text-gray-900">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700">Coupon Code</label>
        <div className="flex mt-1">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
            placeholder="Enter coupon"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={handleApply}
            className="px-4 bg-gray-200 text-gray-700 rounded-r-lg font-medium hover:bg-gray-300"
          >
            Apply
          </button>
        </div>

        {status === "success" && (
          <p className="text-green-600 text-sm mt-2">✔ Coupon applied! 10% off.</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm mt-2">✖ Invalid coupon code.</p>
        )}
      </div>

      <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700">
        Proceed to Checkout
      </button>

      <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mt-6">
        <span className="text-2xl mt-1">🚚</span>

        <span className="text-sm leading-snug">
          Your order is eligible for <strong>free shipping!</strong>
        </span>
      </div>
      <div className="mt-3 flex items-center bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm">
        <span className="mr-2 text-lg">💳</span>
        Shop with confidence. All transactions are secure.
      </div>
    </div>
  );
}