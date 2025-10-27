import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Camera, CheckCircle, AlertCircle, Car, Truck, Bike, Zap } from 'lucide-react';

interface Detection {
  id: string;
  camera: string;
  vehicleType: string;
  licensePlate: string;
  confidence: number;
  timestamp: Date;
  location: string;
  status: 'detected' | 'processing' | 'verified';
}

export function VehicleDetection() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [liveFeeds, setLiveFeeds] = useState([
    { id: 1, name: 'Entry Gate A', status: 'active', fps: 30 },
    { id: 2, name: 'Entry Gate B', status: 'active', fps: 30 },
    { id: 3, name: 'Exit Gate A', status: 'active', fps: 30 },
    { id: 4, name: 'Level 1 - Zone A', status: 'active', fps: 25 },
    { id: 5, name: 'Level 2 - Zone B', status: 'active', fps: 28 },
    { id: 6, name: 'Level 3 - Zone C', status: 'active', fps: 27 },
  ]);

  useEffect(() => {
    // Simulate real-time vehicle detections
    const interval = setInterval(() => {
      const vehicleTypes = ['Sedan', 'SUV', 'Motorcycle', 'Electric Car'];
      const locations = ['Entry Gate A', 'Entry Gate B', 'Exit Gate A', 'Level 1', 'Level 2', 'Level 3'];
      
      const newDetection: Detection = {
        id: `DET-${Date.now()}`,
        camera: `CAM-${Math.floor(Math.random() * 6) + 1}`,
        vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
        licensePlate: `ABC-${Math.floor(Math.random() * 9000) + 1000}`,
        confidence: 85 + Math.random() * 15,
        timestamp: new Date(),
        location: locations[Math.floor(Math.random() * locations.length)],
        status: ['detected', 'processing', 'verified'][Math.floor(Math.random() * 3)] as any,
      };

      setDetections(prev => [newDetection, ...prev.slice(0, 9)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getVehicleIcon = (type: string) => {
    if (type.includes('Sedan')) return Car;
    if (type.includes('SUV')) return Truck;
    if (type.includes('Motorcycle')) return Bike;
    if (type.includes('Electric')) return Zap;
    return Car;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Active Cameras</CardTitle>
            <Camera className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{liveFeeds.length}</div>
            <p className="text-slate-600 mt-1">All operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Detections Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">1,847</div>
            <p className="text-slate-600 mt-1">98.5% accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>AI Confidence</CardTitle>
            <AlertCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">96.2%</div>
            <Progress value={96.2} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Camera Feeds</CardTitle>
            <CardDescription>Computer vision monitoring across all zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveFeeds.map((feed) => (
                <div key={feed.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Camera className="h-5 w-5 text-blue-600" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <p className="text-slate-900">{feed.name}</p>
                      <p className="text-slate-500">{feed.fps} FPS</p>
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Detections</CardTitle>
            <CardDescription>Real-time vehicle identification and classification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {detections.map((detection) => {
                const VehicleIcon = getVehicleIcon(detection.vehicleType);
                return (
                  <div key={detection.id} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <VehicleIcon className="h-5 w-5 text-slate-600 mt-1" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-slate-900">{detection.vehicleType}</p>
                          <Badge variant="outline" className="text-xs">
                            {detection.licensePlate}
                          </Badge>
                        </div>
                        <p className="text-slate-500">{detection.location}</p>
                        <p className="text-slate-400">
                          {detection.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          detection.status === 'verified' ? 'default' :
                          detection.status === 'processing' ? 'secondary' :
                          'outline'
                        }
                      >
                        {detection.status}
                      </Badge>
                      <p className="text-slate-600 mt-1">
                        {detection.confidence.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Computer Vision Analytics</CardTitle>
          <CardDescription>AI model performance and detection metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-slate-600 mb-2">License Plate Recognition</p>
              <div className="text-slate-900">97.8%</div>
              <Progress value={97.8} className="mt-2" />
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-slate-600 mb-2">Vehicle Classification</p>
              <div className="text-slate-900">95.4%</div>
              <Progress value={95.4} className="mt-2" />
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-slate-600 mb-2">Model Latency</p>
              <div className="text-slate-900">45ms</div>
              <p className="text-slate-500 mt-1">Average response time</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-slate-600 mb-2">Processing Queue</p>
              <div className="text-slate-900">12</div>
              <p className="text-slate-500 mt-1">Pending verifications</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detection Features</CardTitle>
          <CardDescription>Advanced computer vision capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'License Plate Recognition', enabled: true, accuracy: 97.8 },
              { name: 'Vehicle Type Classification', enabled: true, accuracy: 95.4 },
              { name: 'Make & Model Detection', enabled: true, accuracy: 89.2 },
              { name: 'Color Identification', enabled: true, accuracy: 93.6 },
              { name: 'Occupancy Detection', enabled: true, accuracy: 98.1 },
              { name: 'Anomaly Detection', enabled: true, accuracy: 91.5 },
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <p className="text-slate-900">{feature.name}</p>
                  <p className="text-slate-500">Accuracy: {feature.accuracy}%</p>
                </div>
                <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                  {feature.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
