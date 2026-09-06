import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const {
    login,
    loginWithGoogle,
    register,
    user,
    showToast
  } = useStore();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googlePromptOpen, setGooglePromptOpen] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center text-[#FAF9F5]">
        <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-2">
          Velora Atelier Passport
        </span>
        <h1 className="font-editorial text-3xl mb-2 text-white">Welcome, {user.name}</h1>
        <p className="text-xs text-[#9DB4A7] mb-6">
          You are currently signed in with {user.email}.
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#07150E] text-xs uppercase tracking-wider font-bold rounded-xs transition-colors shadow-xs"
        >
          Go to Account Dashboard
        </button>
      </div>
    );
  }

  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      showToast('Please enter your Google email');
      return;
    }
    setLoading(true);
    try {
      const derivedName = googleName.trim() || googleEmail.split('@')[0].replace(/[._-]/g, ' ');
      const success = await loginWithGoogle(googleEmail.trim(), derivedName);
      if (success) {
        onNavigate('dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      let success = false;
      if (mode === 'signin') {
        success = await login(email.trim(), password);
      } else {
        const derivedName = name.trim() || email.split('@')[0];
        success = await register(derivedName, email.trim());
      }

      if (success) {
        onNavigate('dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 text-[#FAF9F5]">
      <div className="bg-[#08170F] border border-[#183C2A] p-6 sm:p-8 shadow-2xl rounded-xs">
        {googlePromptOpen ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
                Velora Passport
              </span>
              <h1 className="font-editorial text-2xl text-white">
                Sign in with Google
              </h1>
              <p className="text-xs text-[#9DB4A7] mt-1">
                Enter your Google email to connect.
              </p>
            </div>

            <form onSubmit={handleGoogleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono-luxury text-[#9DB4A7] mb-1.5">
                  Google Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                  <input
                    type="email"
                    required
                    value={googleEmail}
                    onChange={e => setGoogleEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#0A1C14] border border-[#183C2A] text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono-luxury text-[#9DB4A7] mb-1.5">
                  Your Name (Optional)
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                  <input
                    type="text"
                    value={googleName}
                    onChange={e => setGoogleName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#0A1C14] border border-[#183C2A] text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setGooglePromptOpen(false)}
                  className="w-1/3 py-2.5 border border-[#183C2A] text-xs text-[#9DB4A7] hover:text-white hover:bg-[#0E2419] rounded-xs transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#07150E] text-xs uppercase tracking-wider font-bold rounded-xs transition-colors disabled:opacity-60"
                >
                  {loading ? 'Connecting...' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
                Velora Haute Atelier
              </span>
              <h1 className="font-editorial text-2xl sm:text-3xl text-white">
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </h1>
              <p className="text-xs text-[#9DB4A7] mt-1">
                {mode === 'signin'
                  ? 'Access your private archive, saved pieces, and orders.'
                  : 'Join Velora for private reservations, concierge, and express dispatch.'}
              </p>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => setGooglePromptOpen(true)}
              className="w-full py-2.5 px-4 bg-[#0A1C14] hover:bg-[#122E21] text-white border border-[#183C2A] flex items-center justify-center gap-3 transition-colors text-xs font-sans font-medium mb-4 rounded-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-[#183C2A]" />
              <span className="px-3 text-[11px] text-[#5D7E6E] uppercase tracking-wider font-mono-luxury">
                or with email
              </span>
              <div className="flex-1 border-t border-[#183C2A]" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono-luxury text-[#9DB4A7] mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Vivienne Vance"
                      className="w-full pl-9 pr-3 py-2 bg-[#0A1C14] border border-[#183C2A] text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono-luxury text-[#9DB4A7] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-[#0A1C14] border border-[#183C2A] text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono-luxury text-[#9DB4A7] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 bg-[#0A1C14] border border-[#183C2A] text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9DB4A7] hover:text-white"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#07150E] text-xs uppercase tracking-wider font-bold transition-colors disabled:opacity-60 mt-2 rounded-xs shadow-xs"
              >
                {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="text-center mt-5 pt-4 border-t border-[#183C2A] text-xs text-[#9DB4A7]">
              {mode === 'signin' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-[#D4AF37] font-medium underline hover:text-[#FAF9F5] ml-1"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-[#D4AF37] font-medium underline hover:text-[#FAF9F5] ml-1"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
