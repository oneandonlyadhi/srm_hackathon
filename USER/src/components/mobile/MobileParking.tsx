import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { MapPin, Clock, DollarSign, Car, Navigation, Camera, AlertCircle, CheckCircle } from 'lucide-react';

interface MobileParkingProps {
  currentUser: any;
}

export function MobileParking({ currentUser }: MobileParkingProps) {
  const [activeSession, setActiveSession] = useState({
    slot: 'B-234',
    level: 2,
    location: 'City Center Parking',
    entry: new Date(Date.now() - 2 * 60 * 60 * 1000 - 15 * 60 * 1000),
    hourlyRate: 5,
    vehiclePlate: currentUser.vehiclePlate,
  });

  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() - activeSession.entry.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setDuration({ hours, minutes });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession.entry]);

  const calculateCharge = () => {
    const hours = (Date.now() - activeSession.entry.getTime()) / (1000 * 60 * 60);
    return (Math.ceil(hours) * activeSession.hourlyRate).toFixed(2);
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Active Session Card */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="default" className="bg-green-600 text-white">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
              Active Session
            </Badge>
            <span className="text-slate-600">{duration.hours}h {duration.minutes}m</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-slate-900">{activeSession.vehiclePlate}</p>
                <p className="text-slate-600">Your Vehicle</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-green-200">
              <div>
                <p className="text-slate-600 mb-1">Parking Slot</p>
                <p className="text-slate-900">{activeSession.slot}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Level</p>
                <p className="text-slate-900">Floor {activeSession.level}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Entry Time</p>
                <p className="text-slate-900">{activeSession.entry.toLocaleTimeString()}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Current Rate</p>
                <p className="text-slate-900">${activeSession.hourlyRate}/hr</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Charge */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            Current Charges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-600">Parking Duration</p>
              <p className="text-slate-900">{duration.hours}h {duration.minutes}m</p>
            </div>
            <div className="text-right">
              <p className="text-slate-600">Amount</p>
              <p className="text-slate-900">${calculateCharge()}</p>
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <p className="text-slate-700">Total Payable</p>
              <p className="text-blue-600">${calculateCharge()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location & Navigation */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-600" />
            Parking Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-slate-900">{activeSession.location}</p>
            <p className="text-slate-600">123 Main Street, Downtown</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Navigation className="h-4 w-4 mr-2" />
              Navigate
            </Button>
            <Button variant="outline" className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              View Spot
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-orange-200 bg-orange-50 cursor-pointer hover:bg-orange-100 transition-colors">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-slate-900">Extend Time</p>
            <p className="text-slate-600">Add more hours</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors">
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-slate-900">Support</p>
            <p className="text-slate-600">Get help</p>
          </CardContent>
        </Card>
      </div>

      {/* Exit & Pay Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-slate-200 max-w-md mx-auto">
        <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
          <CheckCircle className="h-5 w-5 mr-2" />
          Exit & Pay ${calculateCharge()}
        </Button>
      </div>

      {/* Parking Tips */}
      <Card className="border-slate-200 mb-6">
        <CardHeader>
          <CardTitle>Parking Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white">1</span>
            </div>
            <div>
              <p className="text-slate-900">Lock your vehicle</p>
              <p className="text-slate-600">Ensure all doors and windows are secured</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white">2</span>
            </div>
            <div>
              <p className="text-slate-900">Note your location</p>
              <p className="text-slate-600">Slot {activeSession.slot}, Level {activeSession.level}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white">3</span>
            </div>
            <div>
              <p className="text-slate-900">24/7 Surveillance</p>
              <p className="text-slate-600">Your vehicle is monitored by our security system</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
