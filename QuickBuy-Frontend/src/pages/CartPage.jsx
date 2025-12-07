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
import UserStoreSelector from "../components/common/UserStoreSelector";
import { getCartId, getStoreId } from "../constants";

export default function CartPage() {
  const [cartId, setCartId] = useState(getCartId());
  const [storeId, setStoreId] = useState(getStoreId());
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDetails, setCouponDetails] = useState(null);

  // State cho Demo Insert
  const [newProductId, setNewProductId] = useState("");

  // Handle selector change - reload page data
  const handleSelectorChange = () => {
    setCartId(getCartId());
    setStoreId(getStoreId());
    setCouponApplied(false);
    setCouponDetails(null);
    setLoading(true);
  };

  // --- 1. LẤY DỮ LIỆU TỪ DB ---
  const fetchCart = async () => {
    try {
      const res = await cartApi.getCart(cartId);
      // Map field từ DB (PascalCase) sang Frontend
      const mappedItems = res.data.map(item => ({
        id: item.CartItemID,         // Khóa chính để xóa/sửa
        productId: item.ProductID,
        name: item.ProductName,
        category: item.CategoryName || "General",
        image: item.PictureUrl,
        price: parseFloat(item.ProductPrice),
        quantity: item.Quantity,
        // Vì DB không có cột ảnh, ta dùng ảnh placeholder có tên sản phẩm
        // image: `https://placehold.co/200x200?text=${encodeURIComponent(item.ProductName)}`
      }));
      setItems(mappedItems);
    } catch (err) {
      console.error("Lỗi tải giỏ hàng:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [cartId, storeId]);

  // --- 2. UPDATE LOGIC (Gọi SP) ---
  const handleUpdate = async (cartItemId, newQty) => {
    try {
      await cartApi.updateCartItem({
        cartItemId: cartItemId,
        newQuantity: newQty,
        storeId: storeId
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
        cartId: cartId,
        productId: parseInt(newProductId),
        quantity: 1,
        storeId: storeId
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
  const tax = subtotal * 0.065; // Thuế 6.5%
  const total = subtotal + tax;

  const applyCoupon = async (code) => {
    try {
      // Kiểm tra coupon có tồn tại và có áp dụng cho store này không
      try {
        const validateRes = await cartApi.validateCouponByCode(code, storeId);
        // Nếu không throw error thì coupon hợp lệ cho store này
      } catch (validateErr) {
        if (validateErr.response?.status === 404) {
          alert("Mã giảm giá không tồn tại.");
          return { success: false };
        }
        if (validateErr.response?.status === 400) {
          alert(validateErr.response?.data?.message || "Mã giảm giá này không áp dụng cho cửa hàng này.");
          return { success: false };
        }
      }

      const response = await cartApi.getCoupon(storeId);
      const coupons = response.data;
      console.log(response)
      const matched = coupons.find(c => c.Name.trim().toLowerCase() === code.trim().toLowerCase());
      if (matched) {
        const now = new Date();
        const expiry = new Date(matched.ExpiryDate);
        if (now > expiry) {
          alert("Mã giảm giá đã hết hạn.");
          return { success: false };
        }
        const minRequired = Number(matched.MinimumPriceRequired);
        if (subtotalRaw < minRequired) {
          alert(`Đơn hàng tối thiểu để áp dụng mã này là $${minRequired.toFixed(2)}`);
          return { success: false };
        }
        setCouponApplied(true);
        setCouponDetails({
          name: matched.Name,
          description: matched.Description,
          discountValue: matched.DiscountValue,
          couponAmount: matched.CouponAmount
        });
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Error applying coupon:", error);
      return { success: false };
    }
  };

  const handleCheckout = async (cartId, storeId, paymentMethod) => {
    try {
      await cartApi.createOrder({
        cartId: cartId,
        storeId: storeId,
        paymentMethod: paymentMethod,
        totalAmount: total
      });
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-lg">Đang tải dữ liệu từ Database...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <UserStoreSelector onChangeCallback={handleSelectorChange} />
      <Navbar cartCount={cartCount} />

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-8">
            Shopping Cart ({items.length} items)
          </h1>

          {/* === DEMO INSERT SECTION (Yêu cầu 3.1) === */}

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
          tax={tax}
          total={total}
          applyCoupon={applyCoupon}
          couponDetails={couponDetails}
          cartId={cartId}
          storeId={storeId}
          onCheckout={handleCheckout}
        />
      </main>

      <Footer />
    </div>
  );
}