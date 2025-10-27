import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CreditCard, Smartphone, Wallet, CheckCircle, Clock, DollarSign } from 'lucide-react';

interface PaymentPanelProps {
  currentUser: any;
}

interface Transaction {
  id: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  parkingSlot: string;
  duration: string;
}

export function PaymentPanel({ currentUser }: PaymentPanelProps) {
  const [activeSession, setActiveSession] = useState({
    slot: 'B-234',
    entry: new Date(Date.now() - 2 * 60 * 60 * 1000),
    hourlyRate: 5,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TXN-001', amount: 15.00, method: 'Credit Card', status: 'completed', timestamp: new Date(Date.now() - 86400000), parkingSlot: 'A-156', duration: '3h' },
    { id: 'TXN-002', amount: 25.50, method: 'Mobile Wallet', status: 'completed', timestamp: new Date(Date.now() - 172800000), parkingSlot: 'C-089', duration: '5h' },
    { id: 'TXN-003', amount: 10.00, method: 'NFC Card', status: 'completed', timestamp: new Date(Date.now() - 259200000), parkingSlot: 'B-123', duration: '2h' },
  ]);

  const [paymentMethod, setPaymentMethod] = useState({
    type: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const calculateCurrentCharge = () => {
    const hours = (Date.now() - activeSession.entry.getTime()) / (1000 * 60 * 60);
    return (Math.ceil(hours) * activeSession.hourlyRate).toFixed(2);
  };

  const handlePayment = () => {
    const newTransaction: Transaction = {
      id: `TXN-${Date.now()}`,
      amount: parseFloat(calculateCurrentCharge()),
      method: paymentMethod.type === 'card' ? 'Credit Card' : paymentMethod.type === 'wallet' ? 'Mobile Wallet' : 'NFC Card',
      status: 'completed',
      timestamp: new Date(),
      parkingSlot: activeSession.slot,
      duration: `${Math.ceil((Date.now() - activeSession.entry.getTime()) / (1000 * 60 * 60))}h`,
    };

    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Current Session</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">${calculateCurrentCharge()}</div>
            <p className="text-slate-600 mt-1">Slot {activeSession.slot}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">$127.50</div>
            <p className="text-slate-600 mt-1">18 parking sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Loyalty Points</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">450 pts</div>
            <p className="text-slate-600 mt-1">Redeem for discounts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Parking Session</CardTitle>
            <CardDescription>Current parking details and charges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-900">Parking Slot</p>
                <Badge variant="default">{activeSession.slot}</Badge>
              </div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-600">Entry Time</p>
                <p className="text-slate-900">{activeSession.entry.toLocaleTimeString()}</p>
              </div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-600">Duration</p>
                <p className="text-slate-900">
                  {Math.floor((Date.now() - activeSession.entry.getTime()) / (1000 * 60 * 60))}h{' '}
                  {Math.floor(((Date.now() - activeSession.entry.getTime()) % (1000 * 60 * 60)) / (1000 * 60))}m
                </p>
              </div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-600">Rate</p>
                <p className="text-slate-900">${activeSession.hourlyRate}/hour</p>
              </div>
              <div className="pt-3 border-t border-blue-300">
                <div className="flex items-center justify-between">
                  <p className="text-slate-900">Current Charge</p>
                  <p className="text-slate-900">${calculateCurrentCharge()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-slate-700">Payment Method</p>
              <Tabs defaultValue="card" onValueChange={(v) => setPaymentMethod({ ...paymentMethod, type: v })}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="card">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="wallet">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Wallet
                  </TabsTrigger>
                  <TabsTrigger value="nfc">
                    <Wallet className="h-4 w-4 mr-2" />
                    NFC
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="card" className="space-y-3 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentMethod.cardNumber}
                      onChange={(e) => setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={paymentMethod.expiry}
                        onChange={(e) => setPaymentMethod({ ...paymentMethod, expiry: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentMethod.cvv}
                        onChange={(e) => setPaymentMethod({ ...paymentMethod, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="wallet" className="mt-4">
                  <div className="p-6 border-2 border-dashed border-slate-300 rounded-lg text-center">
                    <Smartphone className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                    <p className="text-slate-600 mb-2">Connect Mobile Wallet</p>
                    <p className="text-slate-500">Apple Pay, Google Pay, Samsung Pay</p>
                  </div>
                </TabsContent>

                <TabsContent value="nfc" className="mt-4">
                  <div className="p-6 border-2 border-dashed border-slate-300 rounded-lg text-center">
                    <Wallet className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                    <p className="text-slate-600 mb-2">Tap NFC Card</p>
                    <p className="text-slate-500">Hold your card near the reader</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <Button onClick={handlePayment} className="w-full">
              Pay ${calculateCurrentCharge()}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent parking payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === 'completed' ? 'bg-green-100' :
                      transaction.status === 'pending' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      <DollarSign className={`h-5 w-5 ${
                        transaction.status === 'completed' ? 'text-green-600' :
                        transaction.status === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-slate-900">{transaction.id}</p>
                      <p className="text-slate-600">
                        {transaction.parkingSlot} • {transaction.duration} • {transaction.method}
                      </p>
                      <p className="text-slate-500">
                        {transaction.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900">${transaction.amount.toFixed(2)}</p>
                    <Badge
                      variant={
                        transaction.status === 'completed' ? 'default' :
                        transaction.status === 'pending' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pricing Plans</CardTitle>
            <CardDescription>Available parking rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Hourly', rate: '$5/hour', description: 'Pay as you park' },
                { name: 'Daily Pass', rate: '$35/day', description: 'Unlimited in/out' },
                { name: 'Monthly', rate: '$150/month', description: 'Best value for regulars' },
                { name: 'VIP Premium', rate: '$250/month', description: 'Reserved spots + priority' },
              ].map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div>
                    <p className="text-slate-900">{plan.name}</p>
                    <p className="text-slate-600">{plan.description}</p>
                  </div>
                  <p className="text-slate-900">{plan.rate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-slate-900">Visa •••• 4242</p>
                    <p className="text-slate-600">Expires 12/25</p>
                  </div>
                </div>
                <Badge variant="default">Primary</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-slate-900">Apple Pay</p>
                    <p className="text-slate-600">iPhone 14 Pro</p>
                  </div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
