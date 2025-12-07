

// import React from 'react';
// import { Star } from 'lucide-react';
// import cartApi from '../../services/cartApi';

// import techgadget from '../../assets/ugreen-35758-10.webp';
// import home_essential from '../../assets/34-800x600.jpg';
// import freshgro from '../../assets/vegetable.jpg';
// import toys from '../../assets/toys.jpg';

// // Simulate current user/cart configuration
// const CURRENT_CART_ID = 1;
// const CURRENT_STORE_ID = 1;

// export default function ContentSection() {
//     const tuedeptrai = [
//         { name: 'Tech & Gadgets', img: techgadget },
//         { name: 'Home Essentials & Gadgets', img: home_essential },
//         { name: 'Fresh Groceries & Gadgets', img: freshgro },
//         { name: 'Toys & Games & Gadgets', img: toys }
//     ];

//     const products = [

//     ];

//     // Handle add to cart
//     const handleAddToCart = async (product) => {
//         try {
//             await cartApi.addToCart({
//                 cartId: CURRENT_CART_ID,
//                 productId: product.id,
//                 quantity: 1,
//                 storeId: CURRENT_STORE_ID
//             });
//             window.dispatchEvent(new Event('cartUpdated'));
//             alert(`Đã thêm "${product.title}" vào giỏ hàng!`);

//         } catch (error) {
//             console.error('Error adding to cart:', error);
//             alert('Lỗi khi thêm vào giỏ hàng: ' + (error.response?.data?.message || 'Vui lòng thử lại'));
//         }
//     };

//     return (
//         <div className='w-full max-w-[1216px] mx-auto px-4 py-12 flex flex-col gap-16'>
//             <section className='flex flex-col gap-6'>
//                 <div className='flex items-center justify-between'>
//                     <h2 className="text-2xl font-bold text-slate-900">Featured categories</h2>
//                     <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">View all</a>
//                 </div>
//                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
//                     {tuedeptrai.map((cat, index) => (
//                         <div
//                             key={index}
//                             className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-200"
//                         >
//                             <div className="h-48 w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
//                                 <img
//                                     src={cat.img}
//                                     alt={cat.name}
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                                 />
//                             </div>
//                             <h3 className="text-center font-bold text-slate-800">{cat.name}</h3>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             <section className="flex flex-col gap-6">
//                 <div className='flex items-center justify-between'>
//                     <h2 className="text-2xl font-bold text-slate-900">Best sellers near you</h2>
//                     <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">Shop all</a>
//                 </div>
//                 <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6'>
//                     {products.map((product) => (
//                         <div
//                             key={product.id}
//                             className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-lg transition-shadow duration-200"
//                         >
//                             <div className="h-40 w-full flex items-center justify-center mb-4">
//                                 <img src={product.img} alt={product.title} className="max-h-full max-w-full object-contain" />
//                             </div>
//                             <div className="flex flex-col gap-1 flex-1">
//                                 <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-tight">
//                                     {product.title}
//                                 </h3>
//                                 <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
//                                     <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
//                                     <span>{product.rating}</span>
//                                     <span className="text-slate-400">({product.reviews})</span>
//                                 </div>
//                                 <div className="mt-2 text-lg font-black text-slate-900">
//                                     {product.price.toLocaleString('vi-VN')} đ
//                                 </div>
//                             </div>
//                             <button 
//                                 onClick={() => handleAddToCart(product)}
//                                 className="mt-4 w-full py-2 bg-blue-50 text-blue-600 font-bold text-sm rounded-full hover:bg-blue-100 transition-colors"
//                             >
//                                 Add to cart
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// }


// import React from 'react';
// import { Star } from 'lucide-react';

// export default function ContentSection({ products, currentCategory, isLoading }) {

//     // Placeholder image helper if product image is missing from DB
//     const getProductImage = (img) => {
//         return img || "https://via.placeholder.com/300?text=No+Image"; 
//     };

//     return (
//         <div className='w-full max-w-[1216px] mx-auto px-4 py-12 flex flex-col gap-16 min-h-[50vh]'>

//             <section className="flex flex-col gap-6">
//                 <div className='flex items-center justify-between'>
//                     <h2 className="text-2xl font-bold text-slate-900">
//                         {isLoading ? 'Loading...' : `Top Rated in "${currentCategory}"`}
//                     </h2>
//                 </div>

//                 {isLoading ? (
//                     <div className="flex justify-center items-center h-40">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     </div>
//                 ) : products.length === 0 ? (
//                     <div className="p-8 text-center text-slate-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
//                         No products found for this category.
//                     </div>
//                 ) : (
//                     <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6'>
//                         {products.map((product) => (
//                             <div
//                                 key={product.ProductName} // Or ProductID if available in the join
//                                 className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-lg transition-shadow duration-200"
//                             >
//                                 <div className="h-40 w-full flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
//                                     {/* DB usually returns raw data, add fallback image logic */}
//                                     <img 
//                                         src={getProductImage(null)} 
//                                         alt={product.ProductName} 
//                                         className="max-h-full max-w-full object-contain mix-blend-multiply" 
//                                     />
//                                 </div>
//                                 <div className="flex flex-col gap-1 flex-1">
//                                     <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-tight">
//                                         {product.ProductName}
//                                     </h3>
//                                     <div className="text-xs text-gray-500">{product.CategoryName}</div>

//                                     {/* Rating */}
//                                     <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
//                                         <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
//                                         <span>{product.AverageRating}</span>
//                                         <span className="text-slate-400">({product.TotalReviews})</span>
//                                     </div>

//                                     {/* Price */}
//                                     <div className="mt-2 text-lg font-black text-slate-900">
//                                         ${Number(product.ProductPrice).toFixed(2)}
//                                     </div>
//                                 </div>

//                                 <button className="mt-4 w-full py-2 bg-blue-50 text-blue-600 font-bold text-sm rounded-full hover:bg-blue-100 transition-colors">
//                                     Add to cart
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </section>
//         </div>
//     );
// }


import React from 'react';
import { Star } from 'lucide-react';
import cartApi from '../../services/cartApi'; // Import API

const CURRENT_CART_ID = 1;
const CURRENT_STORE_ID = 1;

export default function ContentSection({ products, currentCategory, isLoading }) {

    const getProductImage = (img) => {
        return img || "https://via.placeholder.com/300?text=No+Image";
    };

    // --- LOGIC ADD TO CART ---
    const handleAddToCart = async (product) => {
        try {
            // Chuẩn bị data: 
            // product.ProductID lấy từ API (do Procedure ở Bước 1 trả về)
            const data = {
                cartId: CURRENT_CART_ID,
                productId: product.ProductID,
                quantity: 1,
                storeId: CURRENT_STORE_ID
            };

            // Gọi API Backend
            await cartApi.addToCart(data);

            // Bắn sự kiện để Header cập nhật số lượng
            window.dispatchEvent(new Event('cartUpdated'));

            alert(`Đã thêm "${product.ProductName}" vào giỏ!`);
        } catch (error) {
            console.error(error);
            // Lấy thông báo lỗi từ Backend (SQL SIGNAL)
            const errorMsg = error.response?.data?.message || "Lỗi khi thêm vào giỏ hàng";
            alert(errorMsg);
        }
    };

    return (
        <div className='w-full max-w-[1216px] mx-auto px-4 py-12 flex flex-col gap-16 min-h-[50vh]'>

            <section className="flex flex-col gap-6">
                <div className='flex items-center justify-between'>
                    <h2 className="text-2xl font-bold text-slate-900">
                        {isLoading ? 'Loading...' :
                            currentCategory === 'All Products'
                                ? 'All Products in Store'
                                : `Top Rated in "${currentCategory || 'Category'}"`
                        }
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        No products found for this category.
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6'>
                        {products.map((product) => (
                            <div
                                key={product.ProductID}
                                className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="h-40 w-full flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
                                    <img
                                        src={getProductImage(null)}
                                        alt={product.ProductName}
                                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-tight">
                                        {product.ProductName}
                                    </h3>
                                    <div className="text-xs text-gray-500">{product.CategoryName}</div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
                                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                        <span>{product.AverageRating}</span>
                                        <span className="text-slate-400">({product.TotalReviews})</span>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-2 text-lg font-black text-slate-900">
                                        ${Number(product.ProductPrice).toLocaleString('en-US')}
                                    </div>
                                </div>

                                {/* Nút Add to Cart gọi hàm handleAddToCart */}
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-4 w-full py-2 bg-blue-50 text-blue-600 font-bold text-sm rounded-full hover:bg-blue-100 transition-colors"
                                >
                                    Add to cart
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}