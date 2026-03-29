
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient'; // Dùng axiosClient đã config port 8080
import cartApi from '../services/cartApi';
import UserStoreSelector from '../components/common/UserStoreSelector';
import { getCartId, getCustomerId, getStoreId } from '../constants';

import {
  LayoutDashboard,
  Package,
  Award,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ShoppingBag,
  Search,
  Repeat,
  Heart,
  User,
  ShoppingCart,
  ChevronRight,
  Crown,
  Hammer
} from 'lucide-react';

// Component: Header
const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800">QuickBuy</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-8 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search everything at QuickBuy..."
            className="w-full pl-4 pr-10 py-2.5 bg-gray-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6 text-gray-600">
          <div
            className="flex flex-col items-center cursor-pointer hover:text-blue-600"
            onClick={() => navigate('/cart')}
          >
            <Repeat className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Reorder</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600">
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">My Items</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-blue-600">
            <div className="relative">
              <User className="w-5 h-5 mb-1" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <span className="text-xs font-medium">Account</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer hover:text-blue-600 relative"
            onClick={() => navigate('/cart')}
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 mb-1" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <input type="text" placeholder="Search..." className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm" />
      </div>
    </header>
  );
};

// Component: Sidebar
const Sidebar = ({ activeTab, setActiveTab, userInfo }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'loyalty', label: 'Loyalty Points', icon: Award },
    { id: 'address', label: 'Address Book', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
        <img src={`https://ui-avatars.com/api/?name=${userInfo.name}&background=3b82f6&color=fff&size=150`} alt="User Avatar" className="w-20 h-20 rounded-full border-4 border-blue-50 mb-3" />
        <h3 className="font-bold text-gray-800 text-lg">{userInfo.name}</h3>
        <p className="text-gray-500 text-sm">{userInfo.email}</p>
      </div>
      <nav className="p-3">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1 ${activeTab === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 mt-4">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
};

// Component: Loyalty Card
const LoyaltyCard = ({ userInfo }) => {
  const nextTierPoints = 5000;
  const progress = (userInfo.points / nextTierPoints) * 100;

  const getMemberTier = (points) => {
    if (points >= 5000) return 'Platinum Member';
    if (points >= 2000) return 'Gold Member';
    if (points >= 500) return 'Silver Member';
    return 'Bronze Member';
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-5 rounded-full -ml-10 -mb-10 blur-xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2 opacity-90">
            <Crown className="w-5 h-5" />
            <span className="font-medium tracking-wide text-sm uppercase">Member Status</span>
          </div>
          <h2 className="text-3xl font-bold mb-1">{getMemberTier(userInfo.points)}</h2>
          <p className="text-blue-100 text-sm">Join date: Jan 2024</p>
        </div>

        <div className="w-full md:w-1/2 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-3xl font-bold">{userInfo.points.toLocaleString()}</span>
              <span className="text-sm ml-1 opacity-80">pts</span>
            </div>
            <span className="text-xs font-medium bg-white text-blue-600 px-2 py-1 rounded">
              {Math.max(0, nextTierPoints - userInfo.points)} pts to Platinum
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-black/20 rounded-full h-2.5 mb-2">
            <div
              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
          <div className="text-xs text-blue-100 text-right">
            Benefits unlocked: Free Shipping, 5% Cashback
          </div>
        </div>
      </div>
    </div>
  );
};

// Component: Order Card
const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-gray-50 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-bold text-gray-800">{order.id}</span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <p className="text-gray-500 text-xs">{order.date}</p>
        </div>
        <div className="mt-2 md:mt-0 text-right">
          <p className="text-gray-500 text-xs mb-1">Total Price</p>
          <p className="font-bold text-lg text-gray-900">${order.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Product Thumbnails */}
        {order.items && order.items.length > 0 && (
          <div className="flex -space-x-3 overflow-hidden py-1 flex-1 w-full sm:w-auto">
            {order.items.map((item, idx) => (
              <img
                key={idx}
                src={item.img}
                alt={item.name}
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover bg-gray-100"
                title={item.name}
              />
            ))}
            {order.items.length > 3 && (
              <div className="flex items-center justify-center h-12 w-12 rounded-full ring-2 ring-white bg-gray-100 text-gray-500 text-xs font-medium">
                +{order.items.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            View Details
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
            Reorder
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [cartCount, setCartCount] = useState(0);
  const [customerId, setCustomerId] = useState(getCustomerId());
  const [cartId, setCartId] = useState(getCartId());
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    points: 0
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle selector change
  const handleSelectorChange = () => {
    setCustomerId(getCustomerId());
    setCartId(getCartId());
    setLoading(true);
  };

  const fetchData = async () => {
    try {
      // Fetch cart count
      const cartRes = await cartApi.getCart(cartId);
      const totalItems = cartRes.data.reduce((count, item) => count + item.Quantity, 0);
      setCartCount(totalItems);

      // Fetch customer profile
      const profileRes = await axiosClient.get(`/client/${customerId}/profile`);
      const profile = profileRes.data;
      setUserInfo({
        name: `${profile.FirstName} ${profile.LastName}`,
        email: profile.Email,
        points: profile.LoyaltyPoints || 0
      });

      // Fetch order history
      const ordersRes = await axiosClient.get(`/client/${customerId}/order-history`);
      const ordersData = ordersRes.data.orders.map(order => ({
        id: `#${order.OrderID.toString().padStart(6, '0')}`,
        date: new Date(order.OrderDate).toLocaleDateString(),
        status: order.Status,
        total: Number(order.TotalPrice) || 0,
        items: []
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Failed to fetch data", error);
      setUserInfo({ name: 'Unknown', email: '', points: 0 });
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [customerId, cartId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 bg-gray-50">
      <UserStoreSelector onChangeCallback={handleSelectorChange} />
      <Header cartCount={cartCount} />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <span
            className="cursor-pointer hover:text-blue-600"
            onClick={() => navigate('/')}
          >Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">My Account</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-1/4">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userInfo={userInfo} />
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {activeTab === 'orders' ? 'Order History' :
                activeTab === 'loyalty' ? 'Loyalty Program' : 'Dashboard'}
            </h1>

            {/* Always show Loyalty Card on top */}
            <LoyaltyCard userInfo={userInfo} />

            {/* Content Sections */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">Recent Orders</h3>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    {['All', 'Processing', 'Delivered', 'Cancelled'].map(filter => (
                      <button key={filter} className="px-3 py-1 text-xs font-medium rounded-md text-gray-600 hover:bg-white hover:shadow-sm transition-all">
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No orders found.</p>
                  </div>
                ) : (
                  orders.map((order, index) => (
                    <OrderCard key={index} order={order} />
                  ))
                )}

                <div className="text-center mt-6">
                  <button className="text-blue-600 text-sm font-medium hover:underline">
                    View all orders →
                  </button>
                </div>
              </div>
            )}

            {activeTab !== 'orders' && (
              <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
                <Hammer className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>This section is under construction for the demo.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;