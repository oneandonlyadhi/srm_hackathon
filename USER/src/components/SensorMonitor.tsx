import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Radio, Activity, Wifi, Battery, Thermometer, Zap, AlertTriangle } from 'lucide-react';

interface Sensor {
  id: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  batteryLevel: number;
  signal: number;
  lastUpdate: Date;
  value?: number;
}

export function SensorMonitor() {
  const [sensors, setSensors] = useState<Sensor[]>([
    { id: 'SENS-001', type: 'Occupancy', location: 'Level 1 - Zone A', status: 'online', batteryLevel: 87, signal: 95, lastUpdate: new Date(), value: 1 },
    { id: 'SENS-002', type: 'Occupancy', location: 'Level 1 - Zone B', status: 'online', batteryLevel: 92, signal: 88, lastUpdate: new Date(), value: 0 },
    { id: 'SENS-003', type: 'Occupancy', location: 'Level 2 - Zone A', status: 'warning', batteryLevel: 23, signal: 78, lastUpdate: new Date(), value: 1 },
    { id: 'SENS-004', type: 'Temperature', location: 'Level 1', status: 'online', batteryLevel: 76, signal: 92, lastUpdate: new Date(), value: 24 },
    { id: 'SENS-005', type: 'Air Quality', location: 'Level 2', status: 'online', batteryLevel: 88, signal: 85, lastUpdate: new Date(), value: 72 },
    { id: 'SENS-006', type: 'Occupancy', location: 'Level 3 - Zone A', status: 'online', batteryLevel: 95, signal: 90, lastUpdate: new Date(), value: 0 },
    { id: 'SENS-007', type: 'Entry Gate', location: 'Gate A', status: 'online', batteryLevel: 100, signal: 98, lastUpdate: new Date() },
    { id: 'SENS-008', type: 'Exit Gate', location: 'Gate B', status: 'offline', batteryLevel: 0, signal: 0, lastUpdate: new Date(Date.now() - 300000) },
  ]);

  const [networkStats, setNetworkStats] = useState({
    totalSensors: 45,
    onlineSensors: 42,
    offlineSensors: 1,
    warningSensors: 2,
    avgBattery: 84,
    avgSignal: 89,
    dataRate: 1247,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev =>
        prev.map(sensor => ({
          ...sensor,
          batteryLevel: Math.max(0, sensor.batteryLevel - Math.random() * 0.1),
          signal: Math.min(100, Math.max(70, sensor.signal + (Math.random() - 0.5) * 5)),
          lastUpdate: new Date(),
        }))
      );

      setNetworkStats(prev => ({
        ...prev,
        dataRate: Math.floor(1200 + Math.random() * 100),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'Occupancy': return Radio;
      case 'Temperature': return Thermometer;
      case 'Air Quality': return Activity;
      case 'Entry Gate':
      case 'Exit Gate': return Zap;
      default: return Radio;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Sensors</CardTitle>
            <Radio className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{networkStats.totalSensors}</div>
            <p className="text-slate-600 mt-1">IoT edge devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Online</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{networkStats.onlineSensors}</div>
            <Progress value={(networkStats.onlineSensors / networkStats.totalSensors) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg Battery</CardTitle>
            <Battery className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{networkStats.avgBattery}%</div>
            <Progress value={networkStats.avgBattery} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Signal Quality</CardTitle>
            <Wifi className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{networkStats.avgSignal}%</div>
            <Progress value={networkStats.avgSignal} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>IoT Sensor Network</CardTitle>
            <CardDescription>Real-time status of edge computing devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {sensors.map((sensor) => {
                const SensorIcon = getSensorIcon(sensor.type);
                return (
                  <div
                    key={sensor.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        sensor.status === 'online' ? 'bg-green-100' :
                        sensor.status === 'offline' ? 'bg-red-100' :
                        'bg-yellow-100'
                      }`}>
                        <SensorIcon className={`h-5 w-5 ${
                          sensor.status === 'online' ? 'text-green-600' :
                          sensor.status === 'offline' ? 'text-red-600' :
                          'text-yellow-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-slate-900">{sensor.id}</p>
                          <Badge variant="outline">{sensor.type}</Badge>
                        </div>
                        <p className="text-slate-600">{sensor.location}</p>
                        <p className="text-slate-500">
                          Last update: {sensor.lastUpdate.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Battery className="h-4 w-4 text-slate-400" />
                          <span className={`text-slate-900 ${sensor.batteryLevel < 30 ? 'text-red-600' : ''}`}>
                            {sensor.batteryLevel.toFixed(0)}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wifi className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600">{sensor.signal.toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(sensor.status)}`} />
                        {sensor.status === 'online' && (
                          <div className={`absolute inset-0 w-3 h-3 rounded-full ${getStatusColor(sensor.status)} animate-ping opacity-75`} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Network Health</CardTitle>
              <CardDescription>Edge network performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600">Online Rate</span>
                    <span className="text-slate-900">
                      {((networkStats.onlineSensors / networkStats.totalSensors) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(networkStats.onlineSensors / networkStats.totalSensors) * 100} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600">Battery Health</span>
                    <span className="text-slate-900">{networkStats.avgBattery}%</span>
                  </div>
                  <Progress value={networkStats.avgBattery} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600">Signal Quality</span>
                    <span className="text-slate-900">{networkStats.avgSignal}%</span>
                  </div>
                  <Progress value={networkStats.avgSignal} />
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Data Rate</span>
                    <span className="text-slate-900">{networkStats.dataRate} msg/min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Sensor maintenance required</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { sensor: 'SENS-003', issue: 'Low battery (23%)', priority: 'high' },
                  { sensor: 'SENS-008', issue: 'Device offline', priority: 'critical' },
                  { sensor: 'SENS-012', issue: 'Weak signal (65%)', priority: 'medium' },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      alert.priority === 'critical' ? 'bg-red-50 border border-red-200' :
                      alert.priority === 'high' ? 'bg-orange-50 border border-orange-200' :
                      'bg-yellow-50 border border-yellow-200'
                    }`}
                  >
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      alert.priority === 'critical' ? 'text-red-600' :
                      alert.priority === 'high' ? 'text-orange-600' :
                      'text-yellow-600'
                    }`} />
                    <div>
                      <p className="text-slate-900">{alert.sensor}</p>
                      <p className="text-slate-600">{alert.issue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Edge Computing</CardTitle>
              <CardDescription>Processing at the edge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">CPU Usage</span>
                  <span className="text-slate-900">34%</span>
                </div>
                <Progress value={34} />

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Memory</span>
                  <span className="text-slate-900">2.1 / 4.0 GB</span>
                </div>
                <Progress value={52.5} />

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Network Load</span>
                  <span className="text-slate-900">156 Mbps</span>
                </div>
                <Progress value={62} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
