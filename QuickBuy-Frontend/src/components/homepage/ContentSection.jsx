import React from 'react';
import { Star } from 'lucide-react';
export default function ContentSection() {
    const tuedeptrai = [
        { name: 'Tech & Gadgets', img: 'https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png' }
        , { name: 'Home Essentials & Gadgets', img: 'https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png' }
        , { name: 'Fresh Groceries & Gadgets', img: 'https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png' }
        , { name: 'Toys & Games & Gadgets', img: 'https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png' }

    ]
    const products = [
        {
            id: 1,
            title: 'UltraBook Pro 13"',
            rating: 3.6,
            reviews: 1240,
            price: 999.00,
            img: "https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png"
        },
        {
            id: 2,
            title: 'Connect Watch SE',
            rating: 3.6,
            reviews: 890,
            price: 249.00,
            img: "https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png"
        },
        {
            id: 3,
            title: 'Organic Whole Milk',
            rating: 3.6,
            reviews: 2312,
            price: 5.98,
            img: "https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png"
        },
        {
            id: 4,
            title: 'Premium Chrono Watch',
            rating: 3.6,
            reviews: 543,
            price: 450.00,
            img: "https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png"
        },
        {
            id: 5,
            title: 'AirFlex Running Shoes',
            rating: 3.6,
            reviews: 1899,
            price: 120.00,
            img: "https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png"
        },
    ];
    return (
        <div className='w-full max-w-[1216px] mx-auto px-4 py-12 flex flex-col gap-16'>
            <section className='flex flex-col gap-6'>
                <div className='flex items-center justify-between'>
                    <h2 className="text-2xl font-bold text-slate-900">Featured categories</h2>
                    <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">View all</a>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                    {tuedeptrai.map((cat, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-200"
                        >
                            <div className="h-48 w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-center font-bold text-slate-800">{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-6">
                <div className='flex items-center justify-between'>
                    <h2 className="text-2xl font-bold text-slate-900">Best sellers near you</h2>
                    <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">Shop all</a>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6'>
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-lg transition-shadow duration-200"
                    >

                        <div className="h-40 w-full flex items-center justify-center mb-4">
                            <img src={product.img} alt={product.title} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-tight">
                                {product.title}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                <span>{product.rating}</span>
                                <span className="text-slate-400">({product.reviews})</span>
                            </div>

                            {/* Price */}
                            <div className="mt-2 text-lg font-black text-slate-900">
                                ${product.price.toFixed(2)}
                            </div>
                        </div>

                        {/* Add Button - Pushed to bottom using mt-4 */}
                        <button className="mt-4 w-full py-2 bg-blue-50 text-blue-600 font-bold text-sm rounded-full hover:bg-blue-100 transition-colors">
                            Add to cart
                        </button>

                    </div>
                ))}
                </div>
            </section>
        </div>
    );
}