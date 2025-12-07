
import Layout from '../components/homepage/Layout';
import React, { useState } from 'react';
import userIdAPI from '../services/userId'
import UserStoreSelector from '../components/common/UserStoreSelector';
import {
  Award,
  Search as SearchIcon,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  DollarSign,
  ShoppingBag
} from 'lucide-react';

// Mock data for demonstration

const STATS_DATA = [
  {
    title: "Total Revenue",
    value: "$54,230",
    change: "+12.5%",
    icon: DollarSign,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Total Sales",
    value: "1,203",
    change: "+8.2%",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Active Users",
    value: "2,543",
    change: "-2.4%",
    icon: Users,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    title: "Total Loyalty Points",
    value: "2,350 pts",
    change: "+15.2%",
    icon: Award,
    color: "bg-purple-100 text-purple-600"
  }
];

// Component: Loyalty Points Checker
const LoyaltyChecker = () => {
  const [custId, setCustId] = useState('');
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState('');
  console.log(custId);
  console.log(points);
  const HandleCheck = async (e) => {
    e.preventDefault();
    if (!custId) return;
    setLoading(true);
    setError('');
    setPoints(null);
    setCustomerInfo(null);
    try {
      const res = await userIdAPI.getId(custId);
      const data = res.data;
      setPoints(data.points);
      setCustomerInfo({
        name: `${data.FirstName} ${data.LastName}`, // Combine names
        email: data.Email,
        id: data.UserID
      });
    } catch (err) {
      console.error(err);
      setError('User not found. Check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
        <div className="flex items-center text-white mb-2">
          <Award className="mr-2" size={28} />
          <h3 className="text-xl font-bold">Customer Loyalty Checker</h3>
        </div>
        <p className="text-purple-100 text-sm">
          Enter Customer ID to review their loyalty points
        </p>
      </div>

      <div className="p-6">
        {/* Search Form */}
        <form onSubmit={HandleCheck} className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Customer ID / Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={custId}
              onChange={(e) => setCustId(e.target.value)}
              placeholder="e.g. C001 or Alice"
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              <SearchIcon size={18} />
              Check
            </button>
            <button
              type="button"
              onClick={() => setCustId('')}
              disabled={loading}
              className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              Clear
            </button>
          </div>
          {error && (
            <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </form>
        {/* Quick Select Customers */}


        {/* Results Display */}
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl border-2 border-dashed border-slate-200 p-6 min-h-[200px] flex flex-col justify-center items-center transition-all">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
              <p className="text-sm text-slate-600 animate-pulse">Calling stored procedure...</p>
            </div>
          ) : points !== null && customerInfo ? (
            <div className="text-center w-full animate-in fade-in zoom-in duration-500">
              {/* Customer Info */}
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 shadow-lg">
                  {customerInfo.name.charAt(0)}
                </div>
                <h4 className="text-lg font-bold text-slate-800">{customerInfo.name}</h4>
                <p className="text-sm text-slate-500">{customerInfo.email}</p>
                <p className="text-xs text-slate-400 font-mono mt-1">ID: {customerInfo.id}</p>
              </div>

              {/* Points Display */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Loyalty Points</p>
                <div className="flex items-center justify-center gap-2">
                  <Award className="text-yellow-500" size={28} />
                  <h3 className="text-4xl font-bold text-indigo-600">{points}</h3>
                  <span className="text-sm font-normal text-slate-400">pts</span>
                </div>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  <CheckCircle size={14} className="mr-1" /> Active Member
                </div>
              </div>

              {/* Procedure Info */}

            </div>
          ) : (
            <div className="text-center text-slate-400">
              <Award size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Enter a Customer ID above to check their loyalty points</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Component: Stat Card
const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} />
      </div>
      <div className="text-sm font-semibold text-green-600">
        <TrendingUp size={16} className="inline mr-1" />
        {change}
      </div>
    </div>
    <div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <h2 className="text-3xl font-bold text-slate-800">{value}</h2>
    </div>
  </div>
);
const StockChecker = () => {
  const [custId, setCustId] = useState('');
  const [loading, setLoading] = useState(false);
  const [stockInfo, setStockInfo] = useState(null);
  const [error, setError] = useState('');
  console.log(custId);
  const HandleCheck = async (e) => {
    e.preventDefault();
    if (!custId) return;
    setLoading(true);
    setError('');
    setStockInfo(null);
    try {
      const res = await userIdAPI.getsuperId(custId);
      const data = res.data;
      setStockInfo({
        name: `${data.ProductName}`.trim(),
        status: data.status || 'Active',
        id: data.ProductID,
        stock: data.stock || 0 // Adjust based on your API response
      });
    } catch (err) {
      console.error(err);
      setError('Product not found. Check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
        <div className="flex items-center text-white mb-2">
          <ShoppingBag className="mr-2" size={28} />
          <h3 className="text-xl font-bold">Stock Availability Checker</h3>
        </div>
        <p className="text-blue-100 text-sm">
          Enter Product ID to check stock levels
        </p>
      </div>

      <div className="p-6">
        {/* Search Form */}
        <form onSubmit={HandleCheck} className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Product ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={custId}
              onChange={(e) => setCustId(e.target.value)}
              placeholder="e.g. 1, 2, 3..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              <SearchIcon size={18} />
              Check
            </button>
            <button
              type="button"
              onClick={() => {
                setCustId('');
                setStockInfo(null);
                setError('');
              }}
              disabled={loading}
              className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              Clear
            </button>
          </div>
          {error && (
            <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Results Display */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-dashed border-slate-200 p-6 min-h-[280px] flex flex-col justify-center items-center transition-all">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
              <p className="text-sm text-slate-600 animate-pulse">Checking stock levels...</p>
            </div>
          ) : stockInfo ? (
            <div className="w-full animate-in fade-in zoom-in duration-500">
              {/* Product Header Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-4">
                <div className="flex items-start gap-4">
                  {/* Product Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg flex-shrink-0">
                    {stockInfo.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-xl font-bold text-slate-800 truncate">{stockInfo.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${stockInfo.status === 'In Stock'
                          ? 'bg-green-100 text-green-700'
                          : stockInfo.status === 'Low Stock'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                        {stockInfo.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="font-mono bg-slate-100 px-2 py-1 rounded">ID: {stockInfo.id}</span>
                      <span className="flex items-center gap-1">
                        <ShoppingBag size={14} />
                        Product Details
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Stock Quantity Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="text-blue-600" size={20} />
                    </div>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Current Stock</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-5xl font-bold text-blue-600">{stockInfo.stock}</h3>
                    <span className="text-lg text-slate-400 font-medium">units</span>
                  </div>

                  {/* Stock Level Indicator */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Stock Level</span>
                      <span>{stockInfo.stock > 50 ? 'High' : stockInfo.stock > 20 ? 'Medium' : 'Low'}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${stockInfo.stock > 50 ? 'bg-green-500' :
                            stockInfo.stock > 20 ? 'bg-yellow-500' :
                              'bg-red-500'
                          }`}
                        style={{ width: `${Math.min((stockInfo.stock / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Status Summary Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Status Summary</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Availability</span>
                      <span className={`text-sm font-semibold ${stockInfo.stock > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {stockInfo.stock > 0 ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Status Label</span>
                      <span className="text-sm font-semibold text-blue-600">{stockInfo.status}</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-slate-600">Restock Needed</span>
                      <span className={`text-sm font-semibold ${stockInfo.stock < 20 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                        {stockInfo.stock < 20 ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag size={18} />
                  Update Stock
                </button>
                <button className="px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-lg font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <ShoppingBag size={56} className="mx-auto mb-4 opacity-20" />
              <p className="text-base font-medium mb-1">No Product Selected</p>
              <p className="text-sm">Enter a Product ID above to check stock availability</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// Main Admin Page Component
export default function AdminPage() {

  return (
    <>
      <UserStoreSelector />
      <Layout>
        <div className="bg-slate-50 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">Monitor your store performance and customer loyalty</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {STATS_DATA.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Loyalty Checker - Main Feature */}
            <div className="mb-8 space-y-8">
              <LoyaltyChecker />
              <StockChecker />
            </div>
            {/* Additional Info */}

          </div>
        </div>
      </Layout>
    </>
  );
}