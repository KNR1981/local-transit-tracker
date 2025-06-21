
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Zap, MapPin } from "lucide-react";
import { calculateFare } from "@/utils/fareCalculator";

interface BusOptionsProps {
  from: string;
  to: string;
  busType?: 'local' | 'district' | 'state';
  onBack: () => void;
  onSelectBus: (busId: string) => void;
}

const BusOptions = ({ from, to, busType = 'local', onBack, onSelectBus }: BusOptionsProps) => {
  const getBusData = () => {
    if (busType === 'local' || busType === 'district') {
      const buses = [
        {
          id: 'bus-1',
          name: 'City Ordinary',
          type: 'Non-AC Regular',
          duration: '45 mins',
          nextArrival: '8 mins',
          features: ['GPS Tracking', 'Low Floor Entry'],
          color: 'bg-orange-500',
          imageUrl: '/lovable-uploads/ce1855e0-956e-4fdd-9fba-f1622541c23e.png'
        },
        {
          id: 'bus-2',
          name: 'Metro Express (Non-AC)',
          type: 'Express Service',
          duration: '30 mins',
          nextArrival: '12 mins',
          features: ['GPS Tracking', 'Limited Stops', 'Electric Powered'],
          color: 'bg-blue-500',
          imageUrl: '/lovable-uploads/c043f54d-b3f2-4bb9-b3d8-178b875e4c15.png'
        },
        {
          id: 'bus-3',
          name: 'Metro Deluxe',
          type: 'Eco-Friendly',
          duration: '40 mins',
          nextArrival: '5 mins',
          features: ['GPS Tracking', 'Environment Friendly', 'Electric Powered'],
          color: 'bg-green-500',
          imageUrl: '/lovable-uploads/b3777b6f-3d50-4218-90b2-a6c4f53f147e.png'
        },
        {
          id: 'bus-4',
          name: 'Deluxe',
          type: 'AC Comfort',
          duration: '35 mins',
          nextArrival: '15 mins',
          features: ['AC', 'GPS Tracking', 'Comfortable Seating', 'Electric Powered'],
          color: 'bg-emerald-600',
          imageUrl: '/lovable-uploads/a64486c4-b418-450b-943b-1d7a775103bd.png'
        },
        {
          id: 'bus-5',
          name: 'Super-Luxury',
          type: 'Premium Service',
          duration: '25 mins',
          nextArrival: '6 mins',
          features: ['AC', 'GPS Tracking', 'USB Charging', 'Luxury Seats'],
          color: 'bg-purple-600',
          imageUrl: '/lovable-uploads/08de62b5-0d08-45c1-a0af-ef02bb9597c1.png'
        }
      ];

      return buses.map(bus => {
        const { fare, distance } = calculateFare(busType, from, to, bus.name);
        return { ...bus, fare, distance };
      });
    } else {
      const buses = [
        {
          id: 'bus-1',
          name: 'Ordinary Bus',
          type: 'Non-AC Regular',
          duration: '45 mins',
          nextArrival: '8 mins',
          features: ['GPS Tracking', 'Low Floor Entry'],
          color: 'bg-orange-500',
          imageUrl: '/lovable-uploads/ce1855e0-956e-4fdd-9fba-f1622541c23e.png'
        },
        {
          id: 'bus-2',
          name: 'Metro Bus',
          type: 'Express Service',
          duration: '30 mins',
          nextArrival: '12 mins',
          features: ['GPS Tracking', 'Limited Stops', 'Fast Transit'],
          color: 'bg-blue-500',
          imageUrl: '/lovable-uploads/c043f54d-b3f2-4bb9-b3d8-178b875e4c15.png'
        },
        {
          id: 'bus-3',
          name: 'Green AC Bus',
          type: 'AC Comfort',
          duration: '40 mins',
          nextArrival: '5 mins',
          features: ['AC', 'GPS Tracking', 'Environment Friendly'],
          color: 'bg-green-500',
          imageUrl: '/lovable-uploads/b3777b6f-3d50-4218-90b2-a6c4f53f147e.png'
        },
        {
          id: 'bus-4',
          name: 'Vajra',
          type: 'AC Premium',
          duration: '35 mins',
          nextArrival: '15 mins',
          features: ['AC', 'GPS Tracking', 'Comfortable Seating'],
          color: 'bg-emerald-600',
          imageUrl: '/lovable-uploads/88c09ca5-5e41-4191-8e36-b066abe346f9.png'
        },
        {
          id: 'bus-5',
          name: 'Garuda',
          type: 'Premium Service',
          duration: '25 mins',
          nextArrival: '6 mins',
          features: ['AC', 'GPS Tracking', 'Luxury Seats'],
          color: 'bg-purple-600',
          imageUrl: '/lovable-uploads/6cf0f2ac-a5c4-48be-b845-d36634c1d4df.png'
        }
      ];

      return buses.map(bus => {
        const { fare, distance } = calculateFare(busType, from, to, bus.name);
        return { ...bus, fare, distance };
      });
    }
  };

  const buses = getBusData();

  const getButtonText = () => {
    return busType === 'state' ? 'Book This Bus' : 'Track This Bus';
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
            <h1 className="text-2xl font-bold text-gray-900">Choose Your Bus</h1>
            <p className="text-gray-600">{from} → {to}</p>
          </div>
        </div>

        <div className="grid gap-4">
          {buses.map((bus) => (
            <Card key={bus.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img 
                        src={bus.imageUrl} 
                        alt={bus.name}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-800">{bus.name}</CardTitle>
                      <p className="text-sm text-gray-600 font-medium">{bus.type}</p>
                      <p className="text-xs text-gray-500">Distance: {bus.distance} km</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500 text-white mb-1">Available</Badge>
                    <div className="text-lg font-bold text-green-600">{bus.fare}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
                    <div className={`w-3 h-3 rounded-full ${bus.color}`}></div>
                    <div>
                      <div className="text-sm font-medium">Live</div>
                      <div className="text-xs text-gray-500">Tracking</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {bus.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-sm py-2"
                  onClick={() => onSelectBus(bus.id)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {getButtonText()}
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
