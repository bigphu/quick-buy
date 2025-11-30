export default function HeroSection() {
    return (
        // Wrapper to center the hero card on the page
        <div>
            <div className="w-full flex justify-center py-8 px-4">
                <div
                    className="relative w-full max-w-[1216px] h-[480px] rounded-3xl overflow-hidden flex flex-col justify-center items-start pl-12 md:pl-24 gap-8 shadow-2xl"
                    style={{
                        backgroundImage: `
            linear-gradient(83.96deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%), 
            url('https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png')
          `,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >

                    <div className="flex flex-col gap-4 max-w-[445px] z-10">

                        <h1 className="font-sans font-black text-5xl md:text-[60px] leading-[1] tracking-[-3px] text-white drop-shadow-md">
                            Festive deals for less
                        </h1>
                        <p className="font-sans font-normal text-lg text-[#E4E4E7] leading-7">
                            Find amazing prices on gifts, groceries, and everything you need for the season.
                        </p>

                    </div>
                    <button className="bg-[#137FEC] hover:bg-blue-600 text-white font-bold text-base px-6 h-12 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Shop now
                    </button>

                </div>

            </div>
            <div className="w-full max-w-[1216px] mx-auto px-4 flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-[#EAF6F3] rounded-3xl p-8 flex items-center justify-between h-[240px] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-start gap-4 max-w-[60%]">
                        <div>
                            <h3 className="text-[#003D29] font-black text-2xl mb-2">
                                Up to 50% off Electronics
                            </h3>
                            <p className="text-[#0F875F] font-medium text-sm">
                                Save big on TVs, laptops, and more.
                            </p>
                        </div>
                        <button className="bg-[#0F875F] hover:bg-[#0b6b4b] text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors">
                            Shop now
                        </button>
                    </div>
                    <div className="w-32 h-32 bg-[#0F875F]/20 rounded-xl overflow-hidden shrink-0">
                        <img src="https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png" alt="Headphones" className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                </div>

                <div className="flex-1 bg-[#FEF3E9] rounded-3xl p-8 flex items-center justify-between h-[240px] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-start gap-4 max-w-[60%]">
                        <div>
                            <h3 className="text-[#642B0D] font-black text-2xl mb-2">
                                Fresh Grocery Deals
                            </h3>
                            <p className="text-[#D97706] font-medium text-sm">
                                Delivered to your door, fresh and fast.
                            </p>
                        </div>
                        <button className="bg-[#F97316] hover:bg-[#d45d0b] text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors">
                            Shop Grocery
                        </button>
                    </div>
                    <div className="w-32 h-32 bg-[#F97316]/20 rounded-xl overflow-hidden shrink-0">
                        <img src="https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d70948978c31f3dc812870187370ffc676ba45659e1420de164df30f2164a75e6681daf0ca7ea95604f1801b5908427e7f00fe/tit_TZJP.png" alt="Groceries" className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                </div>
            </div>
        </div>
    );
}