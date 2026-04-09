import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Store, UserCircle2, Lock, Mail } from 'lucide-react';
import authApi from '../services/authApi';
import { getAuthUser, setAuthUser } from '../services/auth';
import { setCustomerId } from '../constants';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const authUser = getAuthUser();
    if (authUser) {
      navigate(authUser.role === 'admin' ? '/admin' : '/account', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password, role });
      const user = response.data.user;

      setAuthUser(user);
      if (user.role === 'customer') {
        setCustomerId(user.id);
        navigate('/account');
      } else {
        navigate('/admin');
      }
    } catch (loginError) {
      setError(loginError.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 p-8 lg:p-12 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.25),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.25),_transparent_35%)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 mb-8">
              <ShieldCheck className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-medium">QuickBuy Access</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">
              Sign in to the admin console or customer portal.
            </h1>
            <p className="text-white/75 text-base lg:text-lg max-w-xl">
              Use the email and password stored in your QuickBuy database. Admin accounts open the dashboard, customer accounts open the user area.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                <Store className="w-5 h-5 text-cyan-300 mb-3" />
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-white/65 mt-1">Dashboard access</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                <UserCircle2 className="w-5 h-5 text-cyan-300 mb-3" />
                <p className="text-sm font-semibold">Customer</p>
                <p className="text-xs text-white/65 mt-1">Account & orders</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                <Lock className="w-5 h-5 text-cyan-300 mb-3" />
                <p className="text-sm font-semibold">Plain text auth</p>
                <p className="text-xs text-white/65 mt-1">Matches assignment DB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white text-slate-900 p-8 lg:p-10 shadow-2xl shadow-black/20">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Login</p>
            <h2 className="text-3xl font-bold mt-2">Welcome back</h2>
            <p className="text-slate-500 mt-2">Enter your QuickBuy credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="admin@quickbuy.vn"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Abc12345!"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Login as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="auto">Auto detect</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-950 text-white py-3.5 font-semibold hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 rounded-2xl bg-cyan-50 border border-cyan-100 p-4 text-sm text-slate-700">
            <p className="font-semibold text-cyan-900 mb-1">Tip</p>
            <p>Use the email/password stored in the Admin or Customer table. The current dataset uses plain text values.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
