
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Zap, MapPin } from "lucide-react";

interface BusOptionsProps {
  from: string;
  to: string;
  onBack: () => void;
  onSelectBus: (busId: string) => void;
}

const BusOptions = ({ from, to, onBack, onSelectBus }: BusOptionsProps) => {
  const buses = [
    {
      id: 'bus-1',
      name: 'Express Route 101',
      type: 'AC Express',
      duration: '25 mins',
      nextArrival: '5 mins',
      capacity: 'Medium',
      price: '₹15',
      features: ['AC', 'GPS Tracking', 'WiFi'],
      color: 'bg-green-500'
    },
    {
      id: 'bus-2',
      name: 'City Connect 205',
      type: 'Regular',
      duration: '35 mins',
      nextArrival: '12 mins',
      capacity: 'High',
      price: '₹10',
      features: ['GPS Tracking', 'Low Floor'],
      color: 'bg-blue-500'
    },
    {
      id: 'bus-3',
      name: 'Metro Link 308',
      type: 'Premium',
      duration: '20 mins',
      nextArrival: '8 mins',
      capacity: 'Low',
      price: '₹20',
      features: ['AC', 'GPS Tracking', 'WiFi', 'USB Charging'],
      color: 'bg-purple-500'
    },
    {
      id: 'bus-4',
      name: 'Local Line 112',
      type: 'Regular',
      duration: '40 mins',
      nextArrival: '15 mins',
      capacity: 'High',
      price: '₹8',
      features: ['GPS Tracking'],
      color: 'bg-orange-500'
    },
    {
      id: 'bus-5',
      name: 'Rapid Transit 401',
      type: 'Express',
      duration: '28 mins',
      nextArrival: '6 mins',
      capacity: 'Medium',
      price: '₹12',
      features: ['GPS Tracking', 'Low Floor'],
      color: 'bg-red-500'
    }
  ];

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case 'Low': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Available Buses</h1>
            <p className="text-gray-600">{from} → {to}</p>
          </div>
        </div>

        <div className="grid gap-4">
          {buses.map((bus) => (
            <Card key={bus.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{bus.name}</CardTitle>
                    <p className="text-sm text-gray-600">{bus.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{bus.price}</div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{bus.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-blue-600">{bus.nextArrival}</div>
                      <div className="text-xs text-gray-500">Next Bus</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <Badge className={`text-xs ${getCapacityColor(bus.capacity)}`}>
                        {bus.capacity}
                      </Badge>
                      <div className="text-xs text-gray-500">Capacity</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${bus.color}`}></div>
                    <div>
                      <div className="text-sm font-medium">Live</div>
                      <div className="text-xs text-gray-500">Tracking</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {bus.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => onSelectBus(bus.id)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Track This Bus
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusOptions;
