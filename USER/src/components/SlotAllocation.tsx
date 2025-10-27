import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Car, Truck, Bike, Zap, User, Crown, Accessibility } from 'lucide-react';

interface AllocationRequest {
  id: string;
  vehicleType: string;
  priority: string;
  licensePlate: string;
  status: 'pending' | 'allocated' | 'rejected';
  allocatedSlot?: string;
  timestamp: Date;
}

export function SlotAllocation() {
  const [requests, setRequests] = useState<AllocationRequest[]>([
    { id: 'REQ-001', vehicleType: 'sedan', priority: 'vip', licensePlate: 'ABC-1234', status: 'allocated', allocatedSlot: 'A-15', timestamp: new Date() },
    { id: 'REQ-002', vehicleType: 'electric', priority: 'electric', licensePlate: 'XYZ-5678', status: 'pending', timestamp: new Date() },
    { id: 'REQ-003', vehicleType: 'suv', priority: 'disabled', licensePlate: 'DEF-9012', status: 'allocated', allocatedSlot: 'D-03', timestamp: new Date() },
    { id: 'REQ-004', vehicleType: 'motorcycle', priority: 'regular', licensePlate: 'GHI-3456', status: 'pending', timestamp: new Date() },
  ]);

  const [newRequest, setNewRequest] = useState({
    vehicleType: '',
    priority: '',
    licensePlate: '',
  });

  const allocationRules = [
    {
      name: 'VIP Priority',
      description: 'VIP vehicles get closest available spots to entrance/exit',
      priority: 1,
      enabled: true,
    },
    {
      name: 'Disabled Access',
      description: 'Reserved spaces near elevators and entrances',
      priority: 1,
      enabled: true,
    },
    {
      name: 'Electric Vehicle',
      description: 'Allocated to charging station-equipped spaces',
      priority: 2,
      enabled: true,
    },
    {
      name: 'Vehicle Size',
      description: 'SUVs and trucks get larger spaces',
      priority: 3,
      enabled: true,
    },
    {
      name: 'Load Balancing',
      description: 'Distribute vehicles across levels for optimal flow',
      priority: 4,
      enabled: true,
    },
    {
      name: 'Predictive Allocation',
      description: 'AI-based allocation considering expected duration',
      priority: 5,
      enabled: true,
    },
  ];

  const handleAllocate = (requestId: string) => {
    const availableSlots = ['A-12', 'B-08', 'C-23', 'D-15', 'E-07'];
    const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
    
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'allocated', allocatedSlot: randomSlot }
          : req
      )
    );
  };

  const handleSubmitRequest = () => {
    if (newRequest.vehicleType && newRequest.priority && newRequest.licensePlate) {
      const request: AllocationRequest = {
        id: `REQ-${Date.now()}`,
        vehicleType: newRequest.vehicleType,
        priority: newRequest.priority,
        licensePlate: newRequest.licensePlate,
        status: 'pending',
        timestamp: new Date(),
      };
      setRequests(prev => [request, ...prev]);
      setNewRequest({ vehicleType: '', priority: '', licensePlate: '' });
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'sedan': return Car;
      case 'suv': return Truck;
      case 'motorcycle': return Bike;
      case 'electric': return Zap;
      default: return Car;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'vip': return Crown;
      case 'disabled': return Accessibility;
      case 'electric': return Zap;
      default: return User;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New Allocation Request</CardTitle>
            <CardDescription>Submit a new parking space allocation request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select
                value={newRequest.vehicleType}
                onValueChange={(value) => setNewRequest({ ...newRequest, vehicleType: value })}
              >
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="electric">Electric Vehicle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select
                value={newRequest.priority}
                onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="disabled">Disabled Access</SelectItem>
                  <SelectItem value="electric">Electric Vehicle</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                placeholder="ABC-1234"
                value={newRequest.licensePlate}
                onChange={(e) => setNewRequest({ ...newRequest, licensePlate: e.target.value })}
              />
            </div>

            <Button onClick={handleSubmitRequest} className="w-full">
              Submit Allocation Request
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Allocation Rules</CardTitle>
            <CardDescription>Dynamic slot allocation priority configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allocationRules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 border border-slate-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-slate-900">{rule.name}</p>
                      <Badge variant="outline">P{rule.priority}</Badge>
                    </div>
                    <p className="text-slate-600">{rule.description}</p>
                  </div>
                  <Badge variant={rule.enabled ? 'default' : 'secondary'}>
                    {rule.enabled ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Allocation Requests</CardTitle>
          <CardDescription>Manage and process parking space allocation requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requests.map((request) => {
              const VehicleIcon = getVehicleIcon(request.vehicleType);
              const PriorityIcon = getPriorityIcon(request.priority);
              
              return (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <VehicleIcon className="h-6 w-6 text-blue-600" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-slate-900">{request.id}</p>
                        <Badge variant="outline">{request.licensePlate}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <PriorityIcon className="h-4 w-4" />
                        <span className="capitalize">{request.priority}</span>
                        <span>•</span>
                        <span className="capitalize">{request.vehicleType}</span>
                      </div>
                      {request.allocatedSlot && (
                        <p className="text-green-600 mt-1">
                          Allocated: Space {request.allocatedSlot}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        request.status === 'allocated' ? 'default' :
                        request.status === 'pending' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {request.status}
                    </Badge>
                    {request.status === 'pending' && (
                      <Button
                        onClick={() => handleAllocate(request.id)}
                        size="sm"
                      >
                        Allocate
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>AI Allocation Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">94.3%</div>
            <p className="text-slate-600 mt-1">Optimization efficiency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg. Allocation Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">1.2 sec</div>
            <p className="text-slate-600 mt-1">From request to allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{requests.filter(r => r.priority !== 'regular').length}</div>
            <p className="text-slate-600 mt-1">VIP, Disabled, Electric</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
