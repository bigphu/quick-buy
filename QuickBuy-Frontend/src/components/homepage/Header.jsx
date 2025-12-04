// import React from 'react';
// import { Search, MapPin, RotateCcw, Heart, User, ShoppingCart, LayoutGrid, ChevronDown, Link } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export default function Header() {

//     const navigate = useNavigate();
//     const navLinks = [
//         "New Arrivals",
//         "Rollbacks & Deals",
//         "Electronics",
//         "Home",
//         "Grocery",
//         "Pharmacy"
//     ];

//     return (
//         <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
//             <div className="bg-[#87C4FF] py-4 px-6">
//                 <div className="w-full flex items-center justify-between gap-4">

//                     <div className="flex items-center gap-6 shrink-0">
//                         <div className="flex items-center gap-2">

//                             <img
//                                 src="/logo.png"
//                                 alt="QuickBuy Logo"
//                                 className="w-8 h-8 object-contain"
//                             />
//                             <span className="font-sans font-black text-2xl leading-8 tracking-tighter text-[#18181B]">
//                                 QuickBuy
//                             </span>
//                         </div>

//                         <div className="h-8 w-[1px] bg-blue-400/50"></div>
//                         <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
//                             <MapPin className="w-5 h-5 text-slate-700" />
//                             <div className="flex flex-col leading-none">
//                                 <span className="text-[11px] text-slate-600 font-medium">Pickup from</span>
//                                 <span className="text-sm font-bold text-slate-900">Spring Valley</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex-1 px-6">
//                         <div className="relative group">
//                             <input
//                                 type="text"
//                                 placeholder="Search everything at QuickBuy..."
//                                 className="w-full bg-white py-2.5 pl-6 pr-12 rounded-full text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm placeholder:text-slate-400"
//                             />
//                             <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-6 shrink-0">
//                         <div className="flex items-center gap-6 text-slate-900 font-medium text-sm ">
//                             <button className="flex items-center gap-2 bg-transparent border-0 outline-0 hover:text-blue-600 transition-colors">
//                                 <RotateCcw className="w-5 h-5" />
//                                 <span>Reorder</span>
//                             </button>

//                             <button className="flex items-center gap-2 bg-transparent border-0 outline-0 hover:text-blue-600 transition-colors">
//                                 <Heart className="w-5 h-5" />
//                                 <span>My Items</span>
//                             </button>

//                             <button 
//                                 onClick={() => navigate('/account')}
//                                 className="flex items-center gap-2 bg-transparent border-0 outline-0 hover:text-blue-600 transition-colors cursor-pointer"
//                             >
//                                 <User className="w-5 h-5" />
//                                 <span>Account</span>
//                             </button>

//                         </div>

//                         <div className="relative">
//                             <button 
//                                 onClick={() => navigate('/cart')}
//                                 className="flex items-center justify-center bg-white p-3 rounded-full hover:text-blue-600 transition-colors shadow-sm">
//                                 <ShoppingCart className="w-5 h-5" />
//                             </button>
//                             <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#87C4FF]">
//                                 69
//                             </span>
//                         </div>
//                     </div>

//                 </div>
//             </div>


//             <div className="bg-[#D3E8FF] py-3 px-6"> 
//                 <div className="w-full flex items-center gap-4">
//                     <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 transition">
//                         <LayoutGrid className="w-4 h-4 text-slate-900" />
//                         <span className="text-sm font-bold text-slate-900">Departments</span>
//                         <ChevronDown className="w-4 h-4 text-slate-500" />
//                     </button>

//                     <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
//                         {navLinks.map((link) => (
//                             <a
//                                 key={link}
//                                 href="#"
//                                 className="whitespace-nowrap bg-white/60 hover:bg-white px-4 py-2 rounded-full text-sm font-semibold text-slate-800 transition-all duration-200"
//                             >
//                                 {link}
//                             </a>
//                         ))}
//                     </div>

//                 </div>
//             </div>

//         </header>
//     );
// }

import React, { useState, useEffect } from 'react';
import { Search, MapPin, RotateCcw, Heart, User, ShoppingCart, LayoutGrid, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import cartApi from '../../services/cartApi'; // Import API

// ID giả lập (Khớp với cấu hình bên CartPage)
const CART_ID = 1;

export default function Header() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    // --- LOGIC MỚI: Lấy số lượng từ Database ---
    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                // Gọi API lấy giỏ hàng
                const response = await cartApi.getCart(CART_ID);
                
                // Tính tổng số lượng (Quantity) của tất cả sản phẩm
                // Lưu ý: Dữ liệu từ Backend trả về Key là PascalCase (item.Quantity)
                const totalItems = response.data.reduce((sum, item) => sum + item.Quantity, 0);
                
                setCartCount(totalItems);
            } catch (error) {
                console.error("Failed to fetch cart count", error);
            }
        };

        fetchCartCount();
        
        // Mẹo nhỏ: Để số lượng tự cập nhật khi bạn thêm hàng mà không cần F5
        // Bạn có thể dùng Custom Event hoặc Context. 
        // Ở mức độ bài tập đơn giản, ta sẽ lắng nghe sự kiện "cartUpdated" (sẽ tạo ở bước sau)
        const handleCartUpdate = () => fetchCartCount();
        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);
    // -------------------------------------------

    const navLinks = [
        "New Arrivals", "Rollbacks & Deals", "Electronics", "Home", "Grocery", "Pharmacy"
    ];

    return (
        <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
            <div className="bg-[#87C4FF] py-4 px-6">
                <div className="w-full flex items-center justify-between gap-4">

                    <div className="flex items-center gap-6 shrink-0">
                        {/* Logo click về trang chủ */}
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                            <img src="/logo.png" alt="QuickBuy Logo" className="w-8 h-8 object-contain" />
                            <span className="font-sans font-black text-2xl leading-8 tracking-tighter text-[#18181B]">
                                QuickBuy
                            </span>
                        </div>

                        <div className="h-8 w-[1px] bg-blue-400/50"></div>
                        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                            <MapPin className="w-5 h-5 text-slate-700" />
                            <div className="flex flex-col leading-none">
                                <span className="text-[11px] text-slate-600 font-medium">Pickup from</span>
                                <span className="text-sm font-bold text-slate-900">Spring Valley</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 px-6">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search everything at QuickBuy..."
                                className="w-full bg-white py-2.5 pl-6 pr-12 rounded-full text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                        <div className="flex items-center gap-6 text-slate-900 font-medium text-sm ">
                            <button className="flex items-center gap-2 bg-transparent border-0 outline-0 hover:text-blue-600 transition-colors">
                                <RotateCcw className="w-5 h-5" />
                                <span>Reorder</span>
                            </button>
                            <button className="flex items-center gap-2 bg-transparent border-0 outline-0 hover:text-blue-600 transition-colors">
                                <Heart className="w-5 h-5" />
                                <span>My Items</span>
                            </button>
                            <button onClick={() => navigate('/account')} className="flex items-center gap-2 bg-transparent border-0 outline-0 hover:text-blue-600 transition-colors cursor-pointer">
                                <User className="w-5 h-5" />
                                <span>Account</span>
                            </button>
                        </div>

                        {/* CART ICON WITH DYNAMIC BADGE */}
                        <div className="relative">
                            <button 
                                onClick={() => navigate('/cart')}
                                className="flex items-center justify-center bg-white p-3 rounded-full hover:text-blue-600 transition-colors shadow-sm">
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                            
                            {/* Chỉ hiện badge nếu số lượng > 0 */}
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#87C4FF]">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#D3E8FF] py-3 px-6"> 
                <div className="w-full flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 transition">
                        <LayoutGrid className="w-4 h-4 text-slate-900" />
                        <span className="text-sm font-bold text-slate-900">Departments</span>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                    </button>
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                        {navLinks.map((link) => (
                            <a key={link} href="#" className="whitespace-nowrap bg-white/60 hover:bg-white px-4 py-2 rounded-full text-sm font-semibold text-slate-800 transition-all duration-200">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}