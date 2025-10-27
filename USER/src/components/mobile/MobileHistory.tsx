import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Clock, DollarSign, MapPin, Calendar, Download, Filter } from 'lucide-react';

interface Transaction {
  id: string;
  location: string;
  slot: string;
  date: Date;
  duration: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: string;
}

export function MobileHistory() {
  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      location: 'City Center Parking',
      slot: 'A-156',
      date: new Date(Date.now() - 86400000),
      duration: '3h 15m',
      amount: 15.00,
      status: 'completed',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'TXN-002',
      location: 'Mall Plaza Parking',
      slot: 'C-089',
      date: new Date(Date.now() - 172800000),
      duration: '5h 30m',
      amount: 25.50,
      status: 'completed',
      paymentMethod: 'Mobile Wallet',
    },
    {
      id: 'TXN-003',
      location: 'Airport Parking',
      slot: 'B-123',
      date: new Date(Date.now() - 259200000),
      duration: '2h 00m',
      amount: 16.00,
      status: 'completed',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'TXN-004',
      location: 'Office Tower Garage',
      slot: 'D-045',
      date: new Date(Date.now() - 345600000),
      duration: '4h 45m',
      amount: 23.75,
      status: 'completed',
      paymentMethod: 'NFC Card',
    },
    {
      id: 'TXN-005',
      location: 'Shopping District',
      slot: 'E-078',
      date: new Date(Date.now() - 432000000),
      duration: '1h 30m',
      amount: 7.50,
      status: 'completed',
      paymentMethod: 'Credit Card',
    },
  ]);

  const [stats] = useState({
    totalSpent: 87.75,
    totalSessions: 5,
    avgDuration: '3h 20m',
    mostUsed: 'City Center Parking',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <DollarSign className="h-6 w-6 mb-2" />
            <div className="text-white">${stats.totalSpent}</div>
            <p className="text-blue-100">Total Spent</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <Calendar className="h-6 w-6 mb-2" />
            <div className="text-white">{stats.totalSessions}</div>
            <p className="text-purple-100">Sessions</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="border-slate-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-600 mb-1">Avg Duration</p>
              <p className="text-slate-900">{stats.avgDuration}</p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Most Used</p>
              <p className="text-slate-900 truncate">{stats.mostUsed}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter & Export */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-slate-900">{transaction.location}</h3>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600">Slot {transaction.slot}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900">${transaction.amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{transaction.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{transaction.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                  <p className="text-slate-600">{transaction.paymentMethod}</p>
                  <Button variant="outline" size="sm">
                    View Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="week" className="space-y-3 mt-4">
          {transactions.slice(0, 2).map((transaction) => (
            <Card key={transaction.id} className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-slate-900">{transaction.location}</h3>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600">Slot {transaction.slot}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900">${transaction.amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{transaction.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{transaction.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                  <p className="text-slate-600">{transaction.paymentMethod}</p>
                  <Button variant="outline" size="sm">
                    View Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="month" className="space-y-3 mt-4">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-slate-900">{transaction.location}</h3>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600">Slot {transaction.slot}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900">${transaction.amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{transaction.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{transaction.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                  <p className="text-slate-600">{transaction.paymentMethod}</p>
                  <Button variant="outline" size="sm">
                    View Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Monthly Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            This Month Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total Parking Sessions</span>
              <span className="text-slate-900">{stats.totalSessions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total Amount</span>
              <span className="text-slate-900">${stats.totalSpent}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Loyalty Points Earned</span>
              <span className="text-green-600">+125 pts</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
