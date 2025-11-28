import React from 'react';
import { Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900'>
                            Help & Support
                        </h3>
                        <ul className='mt-4 space-y-4'>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Returns
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Shipping & Pickup
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Track Order
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900'>
                            ABOUT QUICKBUY
                        </h3>
                        <ul className='mt-4 space-y-4'>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Our Company
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Store Locator
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900'>
                            POLICIES & TERMS
                        </h3>
                        <ul className='mt-4 space-y-4'>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Terms of Use
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    Accessibility
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900'>
                            CONNECT
                        </h3>
                        <ul className='mt-4 space-y-4'>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    QuyLunPhoCo
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-base hover:text-gray-900 transition-colors'>
                                    DocLe29C1
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 mt-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between">
                        <p className="text-sm text-gray-500 text-center sm:text-left">
                            &copy; 2036 QuickBuy Inc. All Rights Reserved.
                        </p>
                        <div className="flex items-center mt-4 sm:mt-0 text-gray-500 hover:text-gray-900 cursor-pointer">
                            <Globe className="h-5 w-5" />
                            <span className="ml-2 text-sm font-medium">English (US)</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;