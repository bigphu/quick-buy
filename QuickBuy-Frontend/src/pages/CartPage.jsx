// import { useState } from "react";
// import Navbar from "../components/cartpage/Navbar";
// import CartItem from "../components/cartpage/CartItem";
// import OrderSummary from "../components/cartpage/OrderSummary";
// import Footer from "../components/cartpage/Footer";


// import headphone from '../assets/ugreen-35758-10.webp';
// import watch from '../assets/tải xuống.jpg';
// import cap from '../assets/cap.jpg'

// const initialItems = [
//   { id: 1, name: "Wireless Headphones", category: "Electronics", price: 89.99, quantity: 1, image: headphone },
//   { id: 2, name: "Smartwatch Pro", category: "Electronics", price: 199.99, quantity: 1, image: watch },
//   { id: 3, name: "Travel Backpack", category: "Accessories", price: 45.5, quantity: 2, image: cap },
// ];

// export default function CartPage() {
//   const [items, setItems] = useState(initialItems);
//   const [couponApplied, setCouponApplied] = useState(false);
//   const cartCount = items.reduce((count, item) => count + item.quantity, 0);
//   const increaseQty = (id) => {
//     setItems(items.map(item =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     ));
//   };

//   const decreaseQty = (id) => {
//     setItems(items.map(item =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     ));
//   };

//   const removeItem = (id) => {
//     setItems(items.filter(item => item.id !== id));
//   };

//   const applyCoupon = (code) => {
//     if (code.trim().toLowerCase() === "coupon") {
//       setCouponApplied(true);
//       return true;
//     }
//     return false;
//   };

//   const subtotalRaw = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const subtotal = couponApplied ? subtotalRaw * 0.9 : subtotalRaw; 

//   const shipping = items.length > 0 ? 5 : 0;
//   const tax = subtotal * 0.065;
//   const total = subtotal + shipping + tax;

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar cartCount={cartCount} />

//       <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
//         <div className="lg:col-span-2">
//           <h1 className="text-3xl font-bold mb-8">
//             Shopping Cart ({items.length} items)
//           </h1>

//           {items.map((item) => (
//             <CartItem
//               key={item.id}
//               item={item}
//               increaseQty={increaseQty}
//               decreaseQty={decreaseQty}
//               removeItem={removeItem}
//             />
//           ))}
//         </div>

//         <OrderSummary
//           subtotal={subtotal}
//           shipping={shipping}
//           tax={tax}
//           total={total}
//           applyCoupon={applyCoupon}
//         />
//       </main>

//       <Footer />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Navbar from "../components/cartpage/Navbar";
import CartItem from "../components/cartpage/CartItem";
import OrderSummary from "../components/cartpage/OrderSummary";
import Footer from "../components/cartpage/Footer";
import cartApi from "../services/cartApi"; 

// --- CẤU HÌNH GIẢ LẬP ---
// Trong thực tế, ID này lấy từ User đăng nhập. 
// Theo data mẫu của bạn: UserID 21 có CartID = 1.
const CART_ID = 1; 
const STORE_ID = 1; // Giả sử đang mua tại Store 1

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponApplied, setCouponApplied] = useState(false);
  
  // State cho Demo Insert
  const [newProductId, setNewProductId] = useState("");

  // --- 1. LẤY DỮ LIỆU TỪ DB ---
  const fetchCart = async () => {
    try {
      const res = await cartApi.getCart(CART_ID);
      // Map field từ DB (PascalCase) sang Frontend
      const mappedItems = res.data.map(item => ({
        id: item.CartItemID,         // Khóa chính để xóa/sửa
        productId: item.ProductID,
        name: item.ProductName,
        category: item.CategoryName || "General",
        price: parseFloat(item.ProductPrice),
        quantity: item.Quantity,
        // Vì DB không có cột ảnh, ta dùng ảnh placeholder có tên sản phẩm
        image: `https://placehold.co/200x200?text=${encodeURIComponent(item.ProductName)}`
      }));
      setItems(mappedItems);
    } catch (err) {
      console.error("Lỗi tải giỏ hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // --- 2. UPDATE LOGIC (Gọi SP) ---
  const handleUpdate = async (cartItemId, newQty) => {
    try {
      await cartApi.updateCartItem({
        cartItemId: cartItemId,
        newQuantity: newQty,
        storeId: STORE_ID
      });
      fetchCart(); // Load lại để cập nhật giá/số lượng chuẩn từ DB
    } catch (err) {
      // Hiển thị lỗi từ Trigger/SP (ví dụ: Hết hàng)
      alert(err.response?.data?.message || "Lỗi cập nhật!");
    }
  };

  const increaseQty = (id) => {
    const item = items.find(i => i.id === id);
    if (item) handleUpdate(id, item.quantity + 1);
  };

  const decreaseQty = (id) => {
    const item = items.find(i => i.id === id);
    if (item && item.quantity > 1) handleUpdate(id, item.quantity - 1);
  };

  // --- 3. DELETE LOGIC (Gọi SP) ---
  const removeItem = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;
    try {
      await cartApi.deleteCartItem(id);
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi xóa sản phẩm!");
    }
  };

  // --- 4. INSERT LOGIC (Demo Requirement 3.1) ---
  const handleQuickAdd = async () => {
    if (!newProductId) return alert("Vui lòng nhập ID sản phẩm");
    try {
      await cartApi.addToCart({
        cartId: CART_ID,
        productId: parseInt(newProductId),
        quantity: 1,
        storeId: STORE_ID
      });
      setNewProductId("");
      alert("Thêm thành công!");
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi thêm (Kiểm tra ID hoặc Kho)!");
    }
  };

  // --- TÍNH TOÁN ---
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotalRaw = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = couponApplied ? subtotalRaw * 0.9 : subtotalRaw; 
  const shipping = items.length > 0 ? 5 : 0; // Phí ship cứng $5
  const tax = subtotal * 0.065; // Thuế 6.5%
  const total = subtotal + shipping + tax;

  const applyCoupon = (code) => {
    if (code.trim().toLowerCase() === "coupon") {
      setCouponApplied(true);
      return true;
    }
    return false;
  };

  if (loading) return <div className="p-10 text-center font-bold text-lg">Đang tải dữ liệu từ Database...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar cartCount={cartCount} />

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-8">
            Shopping Cart ({items.length} items)
          </h1>

          {/* === DEMO INSERT SECTION (Yêu cầu 3.1) === */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-800 text-sm">🛠 Demo Requirement 3.1: Insert</h3>
              <p className="text-xs text-blue-600 mt-1">Nhập ID sản phẩm (1-10) để test Insert vào bảng Cart_Item</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Product ID (e.g., 1)" 
                className="border border-gray-300 p-2 rounded-lg text-sm w-32 focus:outline-none focus:border-blue-500"
                value={newProductId}
                onChange={(e) => setNewProductId(e.target.value)}
              />
              <button 
                onClick={handleQuickAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>
          {/* =========================================== */}

          {items.length === 0 ? (
             <div className="text-center py-10 bg-white rounded-2xl shadow-sm">
                <p className="text-gray-500">Giỏ hàng trống.</p>
             </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            ))
          )}
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