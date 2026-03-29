import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';
import { TrendingUp, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login({ _id: data._id, name: data.name, email: data.email }, data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#08080F' }}>
      {/* Subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #22C55E08 0%, transparent 70%)' }} />

      <div className="w-full max-w-md mx-4 animate-slide-up">
        <div className="rounded-2xl p-8 sm:p-10" style={{ background: '#16161F', border: '1px solid #252530' }}>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#22C55E22' }}>
              <TrendingUp className="h-5 w-5" style={{ color: '#22C55E' }} />
            </div>
            <div>
              <h1 className="text-white font-black text-lg leading-none">FinanceFlow</h1>
              <p style={{ color: '#6B7280', fontSize: 11 }}>Your Personal Finance Manager</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mb-1">Welcome back.</h2>
          <p style={{ color: '#6B7280', fontSize: 13 }} className="mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: '#EF444422', color: '#FCA5A5', border: '1px solid #EF444433' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: '#9CA3AF' }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all focus:ring-2"
                style={{ background: '#1E1E2A', border: '1px solid #252530' }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: '#9CA3AF' }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all focus:ring-2"
                style={{ background: '#1E1E2A', border: '1px solid #252530' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all mt-2 disabled:opacity-50"
              style={{ background: '#22C55E', color: '#000' }}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: '#6B7280' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-bold" style={{ color: '#22C55E' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
