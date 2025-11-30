import { useState } from "react";
import Navbar from "../components/cartpage/Navbar";
import CartItem from "../components/cartpage/CartItem";
import OrderSummary from "../components/cartpage/OrderSummary";
import Footer from "../components/cartpage/Footer";

const initialItems = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 89.99, quantity: 1, image: "/img1.jpg" },
  { id: 2, name: "Smartwatch Pro", category: "Electronics", price: 199.99, quantity: 1, image: "/img2.jpg" },
  { id: 3, name: "Travel Backpack", category: "Accessories", price: 45.5, quantity: 2, image: "/img3.jpg" },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [couponApplied, setCouponApplied] = useState(false);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  const increaseQty = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setItems(items.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const applyCoupon = (code) => {
    if (code.trim().toLowerCase() === "coupon") {
      setCouponApplied(true);
      return true;
    }
    return false;
  };

  const subtotalRaw = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const subtotal = couponApplied ? subtotalRaw * 0.9 : subtotalRaw; 

  const shipping = items.length > 0 ? 5 : 0;
  const tax = subtotal * 0.065;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar cartCount={cartCount} />

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-8">
            Shopping Cart ({items.length} items)
          </h1>

          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
            />
          ))}
        </div>

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          applyCoupon={applyCoupon}
        />
      </main>

      <Footer />
    </div>
  );
}