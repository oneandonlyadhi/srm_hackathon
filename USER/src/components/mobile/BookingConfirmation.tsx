import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BookingQRCode } from './BookingQRCode';
import { CheckCircle, MapPin, Car, Bike, Clock, IndianRupee, Crown, Calendar } from 'lucide-react';

interface BookingConfirmationProps {
  open: boolean;
  onClose: () => void;
  booking: {
    location: string;
    vehicleType: '2wheeler' | '4wheeler';
    bookingType: 'regular' | 'vip';
    slot: string;
    duration: number;
    rate: number;
    vipCharge: number;
    totalAmount: number;
    timestamp: Date;
  } | null;
}

export function BookingConfirmation({ open, onClose, booking }: BookingConfirmationProps) {
  if (!booking) return null;

  const VehicleIcon = booking.vehicleType === '2wheeler' ? Bike : Car;
  const bookingId = `BK${Date.now().toString().slice(-8)}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-green-600">Booking Confirmed!</DialogTitle>
            <p className="text-slate-600 mt-2">Your parking spot has been reserved</p>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Booking ID */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-slate-600 mb-1">Booking ID</p>
            <p className="text-slate-900">{bookingId}</p>
          </div>

          {/* Booking Details */}
          <div className="p-4 bg-slate-50 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </div>
              <span className="text-slate-900">{booking.location}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <VehicleIcon className="h-4 w-4" />
                <span>Vehicle Type</span>
              </div>
              <span className="text-slate-900 capitalize">
                {booking.vehicleType === '2wheeler' ? '2-Wheeler' : '4-Wheeler'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>Booking Type</span>
              </div>
              <Badge variant={booking.bookingType === 'vip' ? 'default' : 'secondary'}>
                {booking.bookingType === 'vip' && <Crown className="h-3 w-3 mr-1" />}
                {booking.bookingType.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="h-4 w-4" />
                <span>Parking Slot</span>
              </div>
              <span className="text-slate-900">{booking.slot}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="h-4 w-4" />
                <span>Duration</span>
              </div>
              <span className="text-slate-900">{booking.duration} hour(s)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>Date & Time</span>
              </div>
              <span className="text-slate-900">
                {booking.timestamp.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="text-slate-900 mb-3">Payment Summary</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-600">
                <span>Parking Fee ({booking.duration}hr × ₹{booking.rate})</span>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  <span>{booking.rate * booking.duration}</span>
                </div>
              </div>
              
              {booking.vipCharge > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>VIP Premium</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-4 w-4" />
                    <span>{booking.vipCharge}</span>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-green-300 flex items-center justify-between">
                <span className="text-slate-900">Total Paid</span>
                <div className="flex items-center text-green-600">
                  <IndianRupee className="h-5 w-5" />
                  <span className="text-green-600">{booking.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <BookingQRCode bookingId={bookingId} />

          {/* Tips */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-slate-900 mb-2">Important Information</h4>
            <ul className="text-slate-600 space-y-1">
              <li>✓ Your spot is reserved for the next 15 minutes</li>
              <li>✓ Navigate to the parking location using the app</li>
              <li>✓ Show your QR code at the entrance</li>
              <li>✓ Additional charges apply for extended duration</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Navigate Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
