import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
    const navigate = useNavigate();

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
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#137FEC] hover:bg-blue-600 text-white font-bold text-base px-6 h-12 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
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
                        <button
                            onClick={() => navigate('/')}
                            className="bg-[#0F875F] hover:bg-[#0b6b4b] text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors"
                        >
                            Shop now
                        </button>
                    </div>
                    <div className="w-32 h-32 bg-[#0F875F]/20 rounded-xl overflow-hidden shrink-0">
                        <img src="data:image/jpeg;base64,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" />
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
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQ-3Tw4N8UyBo2_AkoEZotRG9EZKydOAd_g&s" />
                    </div>
                </div>
            </div>
        </div >
    );
}