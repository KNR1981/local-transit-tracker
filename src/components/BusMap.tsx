
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Phone, Navigation, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface BusMapProps {
  busId: string;
  from: string;
  to: string;
  onBack: () => void;
}

const BusMap = ({ busId, from, to, onBack }: BusMapProps) => {
  const [busLocation, setBusLocation] = useState({ lat: 17.3850, lng: 78.4867 });
  const [eta, setEta] = useState('12 mins');
  const [traffic, setTraffic] = useState('Moderate');

  // Mock bus data with pricing
  const busData = {
    name: 'Metro Deluxe Bus',
    driver: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    busNumber: 'TS-07-UA-1234',
    currentStop: 'Ameerpet',
    nextStop: 'SR Nagar',
    speed: '42 km/h',
    passengers: 28,
    capacity: 45,
    price: '₹25',
    logo: '🚐'
  };

  // Simulate bus movement and traffic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.002,
        lng: prev.lng + (Math.random() - 0.5) * 0.002
      }));
      
      // Simulate dynamic ETA and traffic
      const newEta = Math.max(1, Math.floor(Math.random() * 15) + 5);
      setEta(`${newEta} mins`);
      
      const trafficConditions = ['Light', 'Moderate', 'Heavy'];
      setTraffic(trafficConditions[Math.floor(Math.random() * trafficConditions.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'Light': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Heavy': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{busData.logo}</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{busData.name}</h1>
                <p className="text-sm text-gray-600">{from} → {to}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-500 text-white">
              Live Tracking
            </Badge>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">{busData.price}</div>
              <div className="text-xs text-gray-500">Fare</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Enhanced Map Placeholder with Google Maps simulation */}
        <Card className="h-96">
          <div className="h-full bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Grid pattern to simulate map */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-gray-300"></div>
                ))}
              </div>
            </div>
            
            {/* Your location indicator */}
            <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">You</div>
            </div>
            
            {/* Bus location indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="text-4xl animate-bounce">{busData.logo}</div>
              <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">Bus Location</div>
            </div>
            
            {/* Destination indicator */}
            <div className="absolute bottom-1/4 right-1/3 flex flex-col items-center">
              <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
              <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">Destination</div>
            </div>
            
            {/* Route path simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-1 bg-blue-400 opacity-60 rounded-full"></div>
            </div>
            
            <div className="text-center z-10 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
              <Navigation className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Live GPS Tracking</h3>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span className="bg-blue-100 px-3 py-1 rounded-full">
                  Speed: {busData.speed}
                </span>
                <span className="bg-green-100 px-3 py-1 rounded-full">
                  ETA: {eta}
                </span>
                <Badge className={`${getTrafficColor(traffic)}`}>
                  Traffic: {traffic}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Bus Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Bus Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Bus Number:</span>
                <span className="font-medium">{busData.busNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Driver:</span>
                <span className="font-medium">{busData.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Stop:</span>
                <span className="font-medium text-green-600">{busData.currentStop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Stop:</span>
                <span className="font-medium">{busData.nextStop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Occupancy:</span>
                <span className="font-medium">
                  {busData.passengers}/{busData.capacity}
                  <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                    {Math.round((busData.passengers / busData.capacity) * 100)}%
                  </Badge>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Journey Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Journey Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">{from}</span>
                </div>
                <span className="text-sm text-green-600">Departed</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">{busData.currentStop}</span>
                </div>
                <span className="text-sm text-green-600">Current</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="font-medium">{to}</span>
                </div>
                <span className="text-sm text-gray-500">ETA: {eta}</span>
              </div>

              <Button className="w-full mt-4" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact Driver
              </Button>
            </CardContent>
          </Card>

          {/* Live Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-orange-600" />
                Live Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Route Update</div>
                <div className="text-xs text-blue-600">Bus is on time, no delays expected</div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">Traffic Alert</div>
                <div className="text-xs text-yellow-600">{traffic} traffic conditions ahead</div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">Next Stop</div>
                <div className="text-xs text-green-600">Arriving at {busData.nextStop} in 3 mins</div>
              </div>

              <div className="text-center pt-2">
                <Badge className="bg-red-500 text-white">
                  <MapPin className="h-3 w-3 mr-1" />
                  GPS Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusMap;
