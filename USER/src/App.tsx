import { useState } from 'react';
import { MobileHome } from './components/mobile/MobileHome';
import { MobileParking } from './components/mobile/MobileParking';
import { MobileHistory } from './components/mobile/MobileHistory';
import { MobileProfile } from './components/mobile/MobileProfile';
import { MobileLogin } from './components/mobile/MobileLogin';
import { Home, Car, History, User } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleLogin = (user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('home');
  };

  if (!isAuthenticated) {
    return (
      <>
        <MobileLogin onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 max-w-md mx-auto">
      {/* Status Bar */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>9:41</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full" />
          <span>100%</span>
        </div>
      </div>

      {/* App Header */}
      <div className="bg-blue-600 text-white px-4 py-4 shadow-lg">
        <h1 className="text-white">Smart Parking</h1>
        <p className="text-blue-100">Welcome, {currentUser?.name}</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'home' && <MobileHome />}
        {activeTab === 'parking' && <MobileParking currentUser={currentUser} />}
        {activeTab === 'history' && <MobileHistory />}
        {activeTab === 'profile' && <MobileProfile currentUser={currentUser} onLogout={handleLogout} />}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-slate-200 shadow-lg">
        <div className="grid grid-cols-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-3 transition-colors ${
              activeTab === 'home'
                ? 'text-blue-600'
                : 'text-slate-400'
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('parking')}
            className={`flex flex-col items-center gap-1 py-3 transition-colors ${
              activeTab === 'parking'
                ? 'text-blue-600'
                : 'text-slate-400'
            }`}
          >
            <Car className="h-6 w-6" />
            <span className="text-xs">My Parking</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 py-3 transition-colors ${
              activeTab === 'history'
                ? 'text-blue-600'
                : 'text-slate-400'
            }`}
          >
            <History className="h-6 w-6" />
            <span className="text-xs">History</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 py-3 transition-colors ${
              activeTab === 'profile'
                ? 'text-blue-600'
                : 'text-slate-400'
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
