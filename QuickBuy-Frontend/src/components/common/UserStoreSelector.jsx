import React, { useState, useEffect } from 'react';
import { User, Store } from 'lucide-react';
import axiosClient from '../../services/axiosClient';
import {
    getCustomerId, setCustomerId,
    getStoreId, setStoreId
} from '../../constants';

export default function UserStoreSelector({ onChangeCallback }) {
    const [customerId, setLocalCustomerId] = useState(getCustomerId());
    const [storeId, setLocalStoreId] = useState(getStoreId());
    const [customers, setCustomers] = useState([]);
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch customers and stores from database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [customersRes, storesRes] = await Promise.all([
                    axiosClient.get('/admin/customers'),
                    axiosClient.get('/admin/stores')
                ]);
                setCustomers(customersRes.data);
                setStores(storesRes.data);
            } catch (error) {
                console.error('Error fetching selector data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCustomerChange = (e) => {
        const newId = parseInt(e.target.value);
        setLocalCustomerId(newId);
        setCustomerId(newId);
        if (onChangeCallback) onChangeCallback();
    };

    const handleStoreChange = (e) => {
        const newId = parseInt(e.target.value);
        setLocalStoreId(newId);
        setStoreId(newId);
        if (onChangeCallback) onChangeCallback();
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-center text-sm">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm">
                {/* Customer Selector */}
                <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-medium">Customer:</span>
                    <select
                        value={customerId}
                        onChange={handleCustomerChange}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[150px]"
                    >
                        {customers.length === 0 ? (
                            <option className="text-gray-800">Loading...</option>
                        ) : (
                            customers.map(c => (
                                <option key={c.id} value={c.id} className="text-gray-800">
                                    {c.id} - {c.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                {/* Store Selector */}
                <div className="flex items-center gap-2">
                    <Store size={16} />
                    <span className="font-medium">Store:</span>
                    <select
                        value={storeId}
                        onChange={handleStoreChange}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[180px]"
                    >
                        {stores.length === 0 ? (
                            <option className="text-gray-800">Loading...</option>
                        ) : (
                            stores.map(s => (
                                <option key={s.id} value={s.id} className="text-gray-800">
                                    {s.id} - {s.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <span className="text-xs opacity-75">
                    (Demo selector - Change to test different customers/stores)
                </span>
            </div>
        </div>
    );
}
