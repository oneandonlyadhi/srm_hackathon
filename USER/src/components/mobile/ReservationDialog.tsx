import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Car, Bike, Crown, Check, MapPin, Clock, IndianRupee, Zap } from 'lucide-react';

interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
  location: {
    id: string;
    name: string;
    distance: string;
    available: number;
    total: number;
    price: string;
    address: string;
  };
  onConfirmBooking: (booking: any) => void;
}

export function ReservationDialog({ open, onClose, location, onConfirmBooking }: ReservationDialogProps) {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState<'2wheeler' | '4wheeler' | null>(null);
  const [bookingType, setBookingType] = useState<'regular' | 'vip' | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [duration, setDuration] = useState('2');

  const vehicleRates = {
    '2wheeler': 20,
    '4wheeler': 40,
  };

  const vipPrice = 199;

  // Generate available slots
  const availableSlots = Array.from({ length: 20 }, (_, i) => ({
    id: `${String.fromCharCode(65 + Math.floor(i / 5))}-${(i % 5) + 1}`,
    available: Math.random() > 0.3,
    level: Math.floor(i / 7) + 1,
  }));

  const calculateTotal = () => {
    if (!vehicleType) return 0;
    const basePrice = vehicleRates[vehicleType] * parseInt(duration || '1');
    const vipCharge = bookingType === 'vip' ? vipPrice : 0;
    return basePrice + vipCharge;
  };

  const handleConfirm = () => {
    const booking = {
      location: location.name,
      vehicleType,
      bookingType,
      slot: bookingType === 'vip' ? selectedSlot : 'Auto-assigned',
      duration: parseInt(duration),
      rate: vehicleRates[vehicleType!],
      vipCharge: bookingType === 'vip' ? vipPrice : 0,
      totalAmount: calculateTotal(),
      timestamp: new Date(),
    };
    onConfirmBooking(booking);
    resetDialog();
  };

  const resetDialog = () => {
    setStep(1);
    setVehicleType(null);
    setBookingType(null);
    setSelectedSlot(null);
    setDuration('2');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={resetDialog}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reserve Parking Spot</DialogTitle>
          <DialogDescription>{location.name}</DialogDescription>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    s < step
                      ? 'bg-green-600 text-white'
                      : s === step
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-1 ${
                      s < step ? 'bg-green-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-2 text-xs text-slate-600">
            <span className={step >= 1 ? 'text-blue-600' : ''}>Vehicle</span>
            <span className={step >= 2 ? 'text-blue-600' : ''}>Type</span>
            <span className={step >= 3 ? 'text-blue-600' : ''}>Confirm</span>
          </div>
        </DialogHeader>

        {/* Location Info */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-start gap-2 mb-2">
            <MapPin className="h-4 w-4 text-slate-600 mt-0.5" />
            <p className="text-slate-900">{location.address}</p>
          </div>
          <p className="text-slate-600">{location.available} of {location.total} spots available</p>
        </div>

        {/* Step 1: Vehicle Type Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900 mb-3">Select Vehicle Type</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setVehicleType('2wheeler')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    vehicleType === '2wheeler'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Bike className={`h-8 w-8 mx-auto mb-2 ${
                    vehicleType === '2wheeler' ? 'text-blue-600' : 'text-slate-600'
                  }`} />
                  <p className="text-slate-900 mb-1">2-Wheeler</p>
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <IndianRupee className="h-4 w-4" />
                    <span>20/hr</span>
                  </div>
                </button>

                <button
                  onClick={() => setVehicleType('4wheeler')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    vehicleType === '4wheeler'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Car className={`h-8 w-8 mx-auto mb-2 ${
                    vehicleType === '4wheeler' ? 'text-blue-600' : 'text-slate-600'
                  }`} />
                  <p className="text-slate-900 mb-1">4-Wheeler</p>
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <IndianRupee className="h-4 w-4" />
                    <span>40/hr</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="duration" className="mb-2 block">Expected Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="24"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter hours"
              />
            </div>

            {vehicleType && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Estimated Cost</span>
                  <div className="flex items-center gap-1 text-slate-900">
                    <IndianRupee className="h-4 w-4" />
                    <span>{vehicleRates[vehicleType] * parseInt(duration || '1')}</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              disabled={!vehicleType || !duration}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Booking Type Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 hover:underline"
              >
                ← Back
              </button>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">
                {vehicleType === '2wheeler' ? '2-Wheeler' : '4-Wheeler'} • {duration}hr
              </span>
            </div>

            <h3 className="text-slate-900 mb-3">Choose Booking Type</h3>

            {/* Price Comparison */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-slate-600 mb-1">Regular</p>
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <IndianRupee className="h-4 w-4" />
                    <span>{vehicleRates[vehicleType!] * parseInt(duration)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">VIP</p>
                  <div className="flex items-center justify-center gap-1 text-purple-600">
                    <IndianRupee className="h-4 w-4" />
                    <span>{vehicleRates[vehicleType!] * parseInt(duration) + vipPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Regular Booking */}
              <button
                onClick={() => {
                  setBookingType('regular');
                  setSelectedSlot(null);
                }}
                className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                  bookingType === 'regular'
                    ? 'border-green-600 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className={`h-5 w-5 ${bookingType === 'regular' ? 'text-green-600' : 'text-slate-600'}`} />
                    <h4 className="text-slate-900">Regular Booking</h4>
                  </div>
                  {bookingType === 'regular' && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <p className="text-slate-600 mb-3">System assigns the best available spot</p>
                <div className="flex items-center gap-1 text-green-600">
                  <IndianRupee className="h-4 w-4" />
                  <span>{vehicleRates[vehicleType!] * parseInt(duration)}</span>
                </div>
              </button>

              {/* VIP Booking */}
              <button
                onClick={() => setBookingType('vip')}
                className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                  bookingType === 'vip'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Crown className={`h-5 w-5 ${bookingType === 'vip' ? 'text-purple-600' : 'text-slate-600'}`} />
                    <div>
                      <h4 className="text-slate-900">VIP Booking</h4>
                      <Badge className="bg-purple-600 text-white border-0 mt-1">Premium</Badge>
                    </div>
                  </div>
                  {bookingType === 'vip' && (
                    <Check className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                <ul className="text-slate-600 mb-3 space-y-1">
                  <li>✓ Choose your preferred spot</li>
                  <li>✓ Priority parking zones</li>
                  <li>✓ Near elevator/entrance</li>
                </ul>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-slate-900">
                    <IndianRupee className="h-4 w-4" />
                    <span>{vehicleRates[vehicleType!] * parseInt(duration) + vipPrice}</span>
                  </div>
                  <span className="text-purple-600">+₹{vipPrice} VIP fee</span>
                </div>
              </button>
            </div>

            <Button
              onClick={() => bookingType === 'vip' ? setStep(3) : handleConfirm()}
              disabled={!bookingType}
              className="w-full"
            >
              {bookingType === 'vip' ? 'Select Slot' : 'Confirm Booking'}
            </Button>
          </div>
        )}

        {/* Step 3: Slot Selection (VIP Only) */}
        {step === 3 && bookingType === 'vip' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setStep(2)}
                className="text-blue-600 hover:underline"
              >
                ← Back
              </button>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">VIP Slot Selection</span>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-purple-600" />
                <h4 className="text-slate-900">Choose Your Spot</h4>
              </div>
              <p className="text-slate-600">Select from premium parking locations</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-slate-900">Available Premium Slots</h4>
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-slate-300 rounded" />
                    <span>Taken</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                    disabled={!slot.available}
                    className={`aspect-square border-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                      selectedSlot === slot.id
                        ? 'border-purple-600 bg-purple-100'
                        : slot.available
                        ? 'border-green-300 bg-green-50 hover:border-green-500'
                        : 'border-slate-200 bg-slate-100 cursor-not-allowed'
                    }`}
                  >
                    <span className={`text-slate-900 ${!slot.available && 'text-slate-400'}`}>
                      {slot.id}
                    </span>
                    <span className="text-xs text-slate-500">L{slot.level}</span>
                    {selectedSlot === slot.id && (
                      <Check className="h-4 w-4 text-purple-600 absolute" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {selectedSlot && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-700">Selected Slot</p>
                    <p className="text-slate-900">Spot {selectedSlot}</p>
                  </div>
                  <Badge variant="default" className="bg-green-600">Confirmed</Badge>
                </div>
              </div>
            )}

            <Button
              onClick={handleConfirm}
              disabled={!selectedSlot}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Confirm VIP Booking
            </Button>
          </div>
        )}

        {/* Booking Summary (always visible at bottom) */}
        {step > 0 && vehicleType && (
          <div className="border-t border-slate-200 pt-4 mt-4">
            <div className="space-y-2 text-slate-600">
              {vehicleType && (
                <div className="flex justify-between">
                  <span>Vehicle Type</span>
                  <span className="text-slate-900">
                    {vehicleType === '2wheeler' ? '2-Wheeler' : '4-Wheeler'}
                  </span>
                </div>
              )}
              {duration && (
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="text-slate-900">{duration} hour(s)</span>
                </div>
              )}
              {bookingType && (
                <div className="flex justify-between">
                  <span>Booking Type</span>
                  <span className="text-slate-900 capitalize">{bookingType}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <div className="flex items-center gap-1 text-slate-900">
                  <IndianRupee className="h-4 w-4" />
                  <span>{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
