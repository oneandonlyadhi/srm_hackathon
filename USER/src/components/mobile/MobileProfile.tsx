import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { User, Car, CreditCard, Bell, Shield, HelpCircle, Settings, Star, LogOut, ChevronRight } from 'lucide-react';

interface MobileProfileProps {
  currentUser: any;
  onLogout: () => void;
}

export function MobileProfile({ currentUser, onLogout }: MobileProfileProps) {
  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Profile Header */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-slate-900 mb-1">{currentUser.name}</h2>
              <p className="text-slate-600 mb-2">{currentUser.email}</p>
              <Badge variant="default" className="bg-yellow-500 border-0">
                <Star className="h-3 w-3 mr-1" />
                Gold Member
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-blue-200">
            <div className="text-center">
              <p className="text-slate-900 mb-1">450</p>
              <p className="text-slate-600">Points</p>
            </div>
            <div className="text-center">
              <p className="text-slate-900 mb-1">28</p>
              <p className="text-slate-600">Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-slate-900 mb-1">5</p>
              <p className="text-slate-600">Saved</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Info */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-600" />
            My Vehicles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-slate-900">{currentUser.vehiclePlate}</p>
                <p className="text-slate-600">Tesla Model 3</p>
              </div>
            </div>
            <Badge variant="default">Primary</Badge>
          </div>

          <Button variant="outline" className="w-full">
            Add Another Vehicle
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-slate-900">Visa •••• 4242</p>
                <p className="text-slate-600">Expires 12/25</p>
              </div>
            </div>
            <Badge variant="default">Default</Badge>
          </div>

          <Button variant="outline" className="w-full">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="text-slate-900">Notifications</span>
            </div>
            <Switch defaultChecked />
          </button>

          <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-slate-600" />
              <span className="text-slate-900">Auto-Pay</span>
            </div>
            <Switch defaultChecked />
          </button>

          <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="text-slate-900">Parking Reminders</span>
            </div>
            <Switch />
          </button>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-slate-200">
        <CardContent className="p-0">
          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-200">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-600" />
              <span className="text-slate-900">Loyalty Rewards</span>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-200">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <span className="text-slate-900">Help & Support</span>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-200">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-600" />
              <span className="text-slate-900">App Settings</span>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-200">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-slate-900">Privacy & Security</span>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-600" />
              <span className="text-slate-900">Terms & Conditions</span>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>
        </CardContent>
      </Card>

      {/* Membership */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-6 w-6 text-purple-600" />
            <h3 className="text-slate-900">Premium Membership</h3>
          </div>
          <p className="text-slate-600 mb-4">
            Upgrade to Premium for exclusive benefits, priority parking, and discounted rates.
          </p>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full border-red-200 text-red-600 hover:bg-red-50"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>

      {/* App Info */}
      <div className="text-center text-slate-500 pt-4">
        <p>Smart Parking v2.1.0</p>
        <p>© 2025 Smart Parking Inc.</p>
      </div>
    </div>
  );
}
