import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Car, Mail, Lock, Fingerprint } from 'lucide-react';

interface MobileLoginProps {
  onLogin: (user: any) => void;
}

export function MobileLogin({ onLogin }: MobileLoginProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: '1',
      name: 'John Doe',
      email: loginData.email || 'user@smartparking.com',
      vehiclePlate: 'ABC-1234',
    });
  };

  const handleQuickLogin = () => {
    onLogin({
      id: '1',
      name: 'John Doe',
      email: 'user@smartparking.com',
      vehiclePlate: 'ABC-1234',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col max-w-md mx-auto">
      {/* Status Bar */}
      <div className="bg-blue-900 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>9:41</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded-full" />
          <span>100%</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Car className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-white mb-2">Smart Parking</h1>
          <p className="text-blue-100">Find & reserve parking instantly</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="pl-11 h-12 bg-white/95"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-11 h-12 bg-white/95"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-white">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Remember me</span>
            </label>
            <button type="button" className="underline">
              Forgot?
            </button>
          </div>

          <Button type="submit" className="w-full h-12 bg-white text-blue-600 hover:bg-blue-50">
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-blue-400" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-transparent px-4 text-blue-100">Or continue with</span>
          </div>
        </div>

        {/* Alternative Login Methods */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={handleQuickLogin}
          >
            <Fingerprint className="h-5 w-5 mr-2" />
            Biometric Login
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={handleQuickLogin}
          >
            Quick Demo Login
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-blue-100">
            Don't have an account?{' '}
            <button className="text-white underline">
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-6 text-blue-200">
        <p>Secure & Encrypted</p>
      </div>
    </div>
  );
}
