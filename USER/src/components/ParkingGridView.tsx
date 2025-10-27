import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Car, Truck, Bike, Zap } from 'lucide-react';

interface ParkingSpace {
  id: string;
  status: 'available' | 'occupied' | 'reserved' | 'disabled';
  vehicleType?: 'sedan' | 'suv' | 'motorcycle' | 'electric';
  priority?: 'vip' | 'disabled' | 'regular' | 'electric';
  timeParked?: number;
}

export function ParkingGridView() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState<ParkingSpace[]>([]);

  useEffect(() => {
    // Initialize parking spaces
    const spaces: ParkingSpace[] = [];
    for (let i = 0; i < 50; i++) {
      const rand = Math.random();
      spaces.push({
        id: `${String.fromCharCode(65 + Math.floor(i / 10))}-${(i % 10) + 1}${Math.floor(i / 10)}`,
        status: rand > 0.7 ? 'occupied' : rand > 0.65 ? 'reserved' : rand > 0.95 ? 'disabled' : 'available',
        vehicleType: rand > 0.7 ? ['sedan', 'suv', 'motorcycle', 'electric'][Math.floor(Math.random() * 4)] as any : undefined,
        priority: rand > 0.9 ? 'vip' : rand > 0.95 ? 'disabled' : rand > 0.85 ? 'electric' : 'regular',
        timeParked: rand > 0.7 ? Math.floor(Math.random() * 180) : undefined,
      });
    }
    setParkingSpaces(spaces);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setParkingSpaces(prev => {
        const updated = [...prev];
        const randomIndex = Math.floor(Math.random() * updated.length);
        if (updated[randomIndex].status === 'available' && Math.random() > 0.7) {
          updated[randomIndex].status = 'occupied';
          updated[randomIndex].vehicleType = ['sedan', 'suv', 'motorcycle', 'electric'][Math.floor(Math.random() * 4)] as any;
          updated[randomIndex].timeParked = 0;
        } else if (updated[randomIndex].status === 'occupied' && Math.random() > 0.8) {
          updated[randomIndex].status = 'available';
          updated[randomIndex].vehicleType = undefined;
          updated[randomIndex].timeParked = undefined;
        }
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedLevel]);

  const getSpaceColor = (space: ParkingSpace) => {
    if (space.status === 'available') return 'bg-green-100 border-green-300 hover:bg-green-200';
    if (space.status === 'occupied') return 'bg-red-100 border-red-300';
    if (space.status === 'reserved') return 'bg-yellow-100 border-yellow-300';
    if (space.status === 'disabled') return 'bg-blue-100 border-blue-300';
    return 'bg-slate-100 border-slate-300';
  };

  const getVehicleIcon = (type?: string) => {
    switch (type) {
      case 'sedan': return <Car className="h-4 w-4" />;
      case 'suv': return <Truck className="h-4 w-4" />;
      case 'motorcycle': return <Bike className="h-4 w-4" />;
      case 'electric': return <Zap className="h-4 w-4" />;
      default: return null;
    }
  };

  const availableCount = parkingSpaces.filter(s => s.status === 'available').length;
  const occupiedCount = parkingSpaces.filter(s => s.status === 'occupied').length;
  const reservedCount = parkingSpaces.filter(s => s.status === 'reserved').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Multi-Level Parking Grid</CardTitle>
          <CardDescription>Real-time visualization of parking spaces across all levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="bg-green-50">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              Available ({availableCount})
            </Badge>
            <Badge variant="outline" className="bg-red-50">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
              Occupied ({occupiedCount})
            </Badge>
            <Badge variant="outline" className="bg-yellow-50">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
              Reserved ({reservedCount})
            </Badge>
            <Badge variant="outline" className="bg-blue-50">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
              Disabled Access
            </Badge>
          </div>

          <Tabs value={selectedLevel.toString()} onValueChange={(v) => setSelectedLevel(Number(v))}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="1">Ground Level</TabsTrigger>
              <TabsTrigger value="2">Level 2</TabsTrigger>
              <TabsTrigger value="3">Level 3</TabsTrigger>
            </TabsList>

            <TabsContent value="1">
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {parkingSpaces.map((space) => (
                  <div
                    key={space.id}
                    className={`relative aspect-square border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all ${getSpaceColor(space)}`}
                  >
                    <div className="text-center">
                      {space.vehicleType && getVehicleIcon(space.vehicleType)}
                      <div className="text-slate-700 mt-1">{space.id}</div>
                      {space.priority === 'vip' && (
                        <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500 rounded-full" />
                      )}
                      {space.priority === 'electric' && (
                        <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="2">
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {parkingSpaces.map((space) => (
                  <div
                    key={space.id}
                    className={`relative aspect-square border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all ${getSpaceColor(space)}`}
                  >
                    <div className="text-center">
                      {space.vehicleType && getVehicleIcon(space.vehicleType)}
                      <div className="text-slate-700 mt-1">{space.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="3">
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {parkingSpaces.map((space) => (
                  <div
                    key={space.id}
                    className={`relative aspect-square border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all ${getSpaceColor(space)}`}
                  >
                    <div className="text-center">
                      {space.vehicleType && getVehicleIcon(space.vehicleType)}
                      <div className="text-slate-700 mt-1">{space.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats - Level {selectedLevel}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Spaces</span>
                <span className="text-slate-900">{parkingSpaces.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Available</span>
                <span className="text-green-600">{availableCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Occupied</span>
                <span className="text-red-600">{occupiedCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Reserved</span>
                <span className="text-yellow-600">{reservedCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Sedan', icon: Car, count: parkingSpaces.filter(s => s.vehicleType === 'sedan').length },
                { type: 'SUV', icon: Truck, count: parkingSpaces.filter(s => s.vehicleType === 'suv').length },
                { type: 'Motorcycle', icon: Bike, count: parkingSpaces.filter(s => s.vehicleType === 'motorcycle').length },
                { type: 'Electric', icon: Zap, count: parkingSpaces.filter(s => s.vehicleType === 'electric').length },
              ].map((vehicle) => (
                <div key={vehicle.type} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <vehicle.icon className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-600">{vehicle.type}</span>
                  </div>
                  <span className="text-slate-900">{vehicle.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
