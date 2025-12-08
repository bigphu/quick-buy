import React, { useState } from 'react'; // Added useState for button feedback
import { Star, Check } from 'lucide-react'; // Added Check icon for feedback
import cartApi from '../../services/cartApi';
import { getCartId, getStoreId } from '../../constants'; // Import dynamic getters

export default function ContentSection({ products, currentCategory, isLoading }) {
    // State to track which product is currently being added (for loading UI)
    const [addingProductId, setAddingProductId] = useState(null);

    const getProductImage = (img) => {
        return img || "https://via.placeholder.com/300?text=No+Image";
    };

    // --- LOGIC ADD TO CART ---
    const handleAddToCart = async (product) => {
        // Prevent double clicks
        if (addingProductId === product.ProductID) return;

        setAddingProductId(product.ProductID); // Start loading state

        try {
            // 1. Get the latest IDs directly from localStorage
            const currentCartId = getCartId();
            const currentStoreId = getStoreId();

            const data = {
                cartId: currentCartId,
                productId: product.ProductID,
                quantity: 1,
                storeId: currentStoreId
            };

            // 2. Call API
            await cartApi.addToCart(data);

            // 3. Dispatch event so Header updates the count immediately
            window.dispatchEvent(new Event('cartUpdated'));

            // Optional: You can use a toast notification here instead of alert
            // alert(`Added "${product.ProductName}" to cart!`); 
            
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || "Error adding to cart";
            alert(errorMsg);
        } finally {
            // Reset loading state after a short delay to show "Added" feedback
            setTimeout(() => {
                setAddingProductId(null);
            }, 500); 
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
                                        src={getProductImage(product.PictureUrl)}
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

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={addingProductId === product.ProductID}
                                    className={`mt-4 w-full py-2 font-bold text-sm rounded-full transition-all duration-200 flex items-center justify-center gap-2
                                        ${addingProductId === product.ProductID 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                        }`}
                                >
                                    {addingProductId === product.ProductID ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Adding...
                                        </>
                                    ) : (
                                        "Add to cart"
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}