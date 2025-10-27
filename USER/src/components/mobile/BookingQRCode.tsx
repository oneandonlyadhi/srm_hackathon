import { Card, CardContent } from '../ui/card';
import { QrCode } from 'lucide-react';

interface BookingQRCodeProps {
  bookingId: string;
}

export function BookingQRCode({ bookingId }: BookingQRCodeProps) {
  return (
    <Card className="border-slate-200">
      <CardContent className="p-6">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Show this at the entrance</p>
          
          {/* QR Code Placeholder */}
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <QrCode className="h-32 w-32 text-blue-600 mx-auto mb-2" />
              <div className="grid grid-cols-3 gap-1 w-32 mx-auto">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 ${
                      Math.random() > 0.5 ? 'bg-blue-600' : 'bg-blue-300'
                    } rounded`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-slate-600">Booking ID</p>
            <p className="text-slate-900">{bookingId}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
