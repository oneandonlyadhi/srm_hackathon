import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function AnalyticsDashboard() {
  const occupancyData = [
    { time: '00:00', occupancy: 45, prediction: 42 },
    { time: '04:00', occupancy: 28, prediction: 30 },
    { time: '08:00', occupancy: 156, prediction: 158 },
    { time: '12:00', occupancy: 234, prediction: 230 },
    { time: '16:00', occupancy: 298, prediction: 295 },
    { time: '20:00', occupancy: 187, prediction: 190 },
    { time: '23:59', occupancy: 89, prediction: 85 },
  ];

  const revenueData = [
    { day: 'Mon', revenue: 4200, target: 4000 },
    { day: 'Tue', revenue: 3800, target: 4000 },
    { day: 'Wed', revenue: 5100, target: 4500 },
    { day: 'Thu', revenue: 4700, target: 4500 },
    { day: 'Fri', revenue: 6200, target: 5500 },
    { day: 'Sat', revenue: 7800, target: 7000 },
    { day: 'Sun', revenue: 5400, target: 5000 },
  ];

  const vehicleTypeData = [
    { name: 'Sedan', value: 345, color: '#3b82f6' },
    { name: 'SUV', value: 234, color: '#8b5cf6' },
    { name: 'Motorcycle', value: 156, color: '#10b981' },
    { name: 'Electric', value: 89, color: '#f59e0b' },
  ];

  const peakHoursData = [
    { hour: '6AM', utilization: 45 },
    { hour: '8AM', utilization: 78 },
    { hour: '10AM', utilization: 92 },
    { hour: '12PM', utilization: 88 },
    { hour: '2PM', utilization: 75 },
    { hour: '4PM', utilization: 85 },
    { hour: '6PM', utilization: 95 },
    { hour: '8PM', utilization: 67 },
    { hour: '10PM', utilization: 42 },
  ];

  const levelUtilizationData = [
    { level: 'Ground', morning: 95, afternoon: 87, evening: 72 },
    { level: 'Level 2', morning: 78, afternoon: 82, evening: 68 },
    { level: 'Level 3', morning: 56, afternoon: 64, evening: 48 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg. Occupancy</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">72.4%</div>
            <div className="flex items-center gap-1 text-green-600 mt-1">
              <TrendingUp className="h-4 w-4" />
              <span>+5.2% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Peak Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">95.8%</div>
            <p className="text-slate-600 mt-1">Today at 6:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg. Duration</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">2.4 hrs</div>
            <div className="flex items-center gap-1 text-red-600 mt-1">
              <TrendingDown className="h-4 w-4" />
              <span>-0.3 hrs from average</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trends & Predictions</CardTitle>
            <CardDescription>AI-powered predictive analytics for space utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  name="Actual Occupancy"
                />
                <Area 
                  type="monotone" 
                  dataKey="prediction" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.3}
                  strokeDasharray="5 5"
                  name="AI Prediction"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue Analysis</CardTitle>
            <CardDescription>Revenue performance vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="Actual Revenue" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#94a3b8" name="Target" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Type Distribution</CardTitle>
            <CardDescription>Breakdown by vehicle category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vehicleTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Analysis</CardTitle>
            <CardDescription>Hourly utilization patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="utilization" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', r: 5 }}
                  name="Utilization %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Level-wise Utilization by Time Period</CardTitle>
          <CardDescription>Comparative analysis across parking levels</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={levelUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="level" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="morning" fill="#3b82f6" name="Morning (6AM-12PM)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="afternoon" fill="#8b5cf6" name="Afternoon (12PM-6PM)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="evening" fill="#ec4899" name="Evening (6PM-12AM)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Avg. Parking Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">2.4 hours</div>
            <p className="text-slate-600 mt-1">Based on last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Turnover Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">4.2x/day</div>
            <p className="text-slate-600 mt-1">Average per space</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>No-Show Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">3.8%</div>
            <p className="text-slate-600 mt-1">Reserved but unused</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">4.7/5.0</div>
            <p className="text-slate-600 mt-1">Based on 1,234 reviews</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
