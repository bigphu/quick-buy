import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSummary({ subtotal, tax, total, applyCoupon, couponDetails, cartId, storeId, onCheckout }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleApply = async () => {
    const result = await applyCoupon(code);
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const handleCheckout = async () => {
    if (!cartId) {
      alert("Cart ID is missing");
      return;
    }

    setLoading(true);
    try {
      await onCheckout(cartId, storeId, paymentMethod);
      alert("Payment successful");
      navigate("/");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed: " + (error.response?.data?.message || "Please try again"));
    } finally {
      setLoading(false);
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

        {status === "success" && couponDetails && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm mt-2">
            <div className="font-semibold">✔ {couponDetails.name} applied!</div>
            <div className="text-xs mt-1">{couponDetails.description}</div>
            {couponDetails.discountValue > 0 && (
              <div className="text-xs">{couponDetails.discountValue}% off</div>
            )}
            {couponDetails.couponAmount > 0 && (
              <div className="text-xs">${couponDetails.couponAmount.toFixed(2)} discount</div>
            )}
          </div>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm mt-2">✖ Invalid coupon code.</p>
        )}
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700 block mb-2">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="E-Wallet">E-Wallet</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Proceed to Checkout"}
      </button>

      <div className="mt-3 flex items-center bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm">
        <span className="mr-2 text-lg">💳</span>
        Shop with confidence. All transactions are secure.
      </div>
    </div>
  );
}