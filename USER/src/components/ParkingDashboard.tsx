import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Car, TrendingUp, AlertTriangle, DollarSign, Users, Zap } from 'lucide-react';

export function ParkingDashboard() {
  const [stats, setStats] = useState({
    totalSpaces: 450,
    occupied: 312,
    available: 138,
    revenue: 15680,
    activeUsers: 284,
    alerts: 3,
  });

  const [levelStats, setLevelStats] = useState([
    { level: 1, total: 150, occupied: 142, utilization: 94.7, type: 'Ground' },
    { level: 2, total: 150, occupied: 98, utilization: 65.3, type: 'Level 2' },
    { level: 3, total: 150, occupied: 72, utilization: 48.0, type: 'Level 3' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        occupied: Math.min(450, Math.max(250, prev.occupied + Math.floor(Math.random() * 10 - 5))),
        available: 450 - prev.occupied,
        revenue: prev.revenue + Math.floor(Math.random() * 50),
        activeUsers: Math.max(200, prev.activeUsers + Math.floor(Math.random() * 6 - 3)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const occupancyRate = ((stats.occupied / stats.totalSpaces) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Spaces</CardTitle>
            <Car className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{stats.totalSpaces}</div>
            <p className="text-slate-600 mt-1">Across 3 levels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Occupancy Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{occupancyRate}%</div>
            <Progress value={parseFloat(occupancyRate)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Available Spaces</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{stats.available}</div>
            <p className="text-slate-600 mt-1">Real-time availability</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">${stats.revenue.toLocaleString()}</div>
            <p className="text-slate-600 mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Active Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{stats.activeUsers}</div>
            <p className="text-slate-600 mt-1">Currently parked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>System Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{stats.alerts}</div>
            <p className="text-slate-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Level-wise Occupancy</CardTitle>
          <CardDescription>Real-time parking space utilization per level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {levelStats.map((level) => (
              <div key={level.level} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={level.utilization > 80 ? 'destructive' : 'default'}>
                      {level.type}
                    </Badge>
                    <span className="text-slate-600">
                      {level.occupied}/{level.total} occupied
                    </span>
                  </div>
                  <span className="text-slate-900">{level.utilization}%</span>
                </div>
                <Progress value={level.utilization} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest parking events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '2 min ago', event: 'Vehicle entered - Slot B-234', type: 'entry' },
                { time: '5 min ago', event: 'Payment completed - $15.00', type: 'payment' },
                { time: '8 min ago', event: 'Vehicle exited - Slot A-156', type: 'exit' },
                { time: '12 min ago', event: 'VIP reservation - Slot C-001', type: 'reservation' },
                { time: '15 min ago', event: 'Sensor maintenance - Level 2', type: 'maintenance' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'entry' ? 'bg-green-500' :
                      activity.type === 'exit' ? 'bg-blue-500' :
                      activity.type === 'payment' ? 'bg-emerald-500' :
                      activity.type === 'reservation' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <span className="text-slate-700">{activity.event}</span>
                  </div>
                  <span className="text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>IoT sensors and infrastructure health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Entry/Exit Gates', status: 'Operational', value: 100 },
                { name: 'IoT Sensors', status: 'Operational', value: 98.5 },
                { name: 'Camera Network', status: 'Operational', value: 97.2 },
                { name: 'Payment System', status: 'Operational', value: 100 },
                { name: 'Cloud Sync', status: 'Operational', value: 99.8 },
              ].map((system, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-700">{system.name}</p>
                    <p className="text-slate-500">{system.status}</p>
                  </div>
                  <Badge variant={system.value > 95 ? 'default' : 'destructive'}>
                    {system.value}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
