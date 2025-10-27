import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Navigation, Search, Zap, Star, Clock, TrendingUp } from 'lucide-react';
import { ReservationDialog } from './ReservationDialog';
import { BookingConfirmation } from './BookingConfirmation';
import { toast } from 'sonner@2.0.3';

interface ParkingLocation {
  id: string;
  name: string;
  distance: string;
  available: number;
  total: number;
  price: string;
  rating: number;
  address: string;
}

export function MobileHome() {
  const [reservationDialog, setReservationDialog] = useState<{
    open: boolean;
    location: ParkingLocation | null;
  }>({
    open: false,
    location: null,
  });

  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    booking: any;
  }>({
    open: false,
    booking: null,
  });
  const [nearbyLocations, setNearbyLocations] = useState<ParkingLocation[]>([
    { id: '1', name: 'City Center Parking', distance: '0.3 km', available: 45, total: 150, price: '$5/hr', rating: 4.5, address: '123 Main St' },
    { id: '2', name: 'Mall Plaza Parking', distance: '0.8 km', available: 78, total: 200, price: '$4/hr', rating: 4.2, address: '456 Shopping Blvd' },
    { id: '3', name: 'Office Tower Garage', distance: '1.2 km', available: 12, total: 100, price: '$6/hr', rating: 4.7, address: '789 Business Ave' },
    { id: '4', name: 'Airport Parking', distance: '5.5 km', available: 156, total: 500, price: '$8/hr', rating: 4.4, address: 'Airport Terminal 1' },
  ]);

  const [quickStats, setQuickStats] = useState({
    totalNearby: 8,
    availableSpots: 234,
    avgPrice: '$5.50',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNearbyLocations(prev =>
        prev.map(loc => ({
          ...loc,
          available: Math.max(0, Math.min(loc.total, loc.available + Math.floor(Math.random() * 6 - 3))),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600 bg-green-50';
    if (percentage > 20) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleReserveClick = (location: ParkingLocation) => {
    setReservationDialog({ open: true, location });
  };

  const handleConfirmBooking = (booking: any) => {
    toast.success('Booking Confirmed!', {
      description: `Your ${booking.bookingType} parking spot has been reserved`,
    });
    setReservationDialog({ open: false, location: null });
    setConfirmationDialog({ open: true, booking });
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search parking locations..."
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <MapPin className="h-6 w-6 mb-2" />
            <div className="text-white">{quickStats.totalNearby}</div>
            <p className="text-blue-100">Nearby</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <Zap className="h-6 w-6 mb-2" />
            <div className="text-white">{quickStats.availableSpots}</div>
            <p className="text-green-100">Available</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <TrendingUp className="h-6 w-6 mb-2" />
            <div className="text-white">{quickStats.avgPrice}</div>
            <p className="text-purple-100">Avg Price</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Location */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Navigation className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-slate-900">Current Location</p>
                <p className="text-slate-600">Downtown Area, Street 5</p>
                <p className="text-blue-600 mt-1">Update location</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-slate-900">Nearby Parking</h2>
        <button className="text-blue-600">View All</button>
      </div>

      {/* Parking Locations */}
      <div className="space-y-3">
        {nearbyLocations.map((location) => {
          const availabilityPercent = (location.available / location.total) * 100;
          
          return (
            <Card key={location.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-slate-900">{location.name}</h3>
                      {location.rating >= 4.5 && (
                        <Badge variant="default" className="bg-yellow-500 text-white border-0">
                          <Star className="h-3 w-3 mr-1" />
                          {location.rating}
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-600">{location.address}</p>
                    <div className="flex items-center gap-3 mt-2 text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{location.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{location.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-600">Availability</span>
                      <span className={`px-2 py-1 rounded ${getAvailabilityColor(location.available, location.total)}`}>
                        {location.available} / {location.total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          availabilityPercent > 50 ? 'bg-green-500' :
                          availabilityPercent > 20 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${availabilityPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => handleReserveClick(location)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Reserve Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-slate-900">EV Charging</p>
            <p className="text-slate-500">Find stations</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-slate-900">VIP Parking</p>
            <p className="text-slate-500">Premium spots</p>
          </button>
        </CardContent>
      </Card>

      {/* Reservation Dialog */}
      {reservationDialog.location && (
        <ReservationDialog
          open={reservationDialog.open}
          onClose={() => setReservationDialog({ open: false, location: null })}
          location={reservationDialog.location}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Booking Confirmation */}
      <BookingConfirmation
        open={confirmationDialog.open}
        onClose={() => setConfirmationDialog({ open: false, booking: null })}
        booking={confirmationDialog.booking}
      />
    </div>
  );
}
