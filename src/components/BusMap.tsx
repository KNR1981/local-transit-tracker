
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Phone } from "lucide-react";
import { useEffect, useState } from "react";

interface BusMapProps {
  busId: string;
  from: string;
  to: string;
  onBack: () => void;
}

const BusMap = ({ busId, from, to, onBack }: BusMapProps) => {
  const [busLocation, setBusLocation] = useState({ lat: 0, lng: 0 });
  const [eta, setEta] = useState('12 mins');

  // Mock bus data
  const busData = {
    name: 'Express Route 101',
    driver: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    busNumber: 'KA-01-AB-1234',
    currentStop: 'City Mall',
    nextStop: 'Railway Station',
    speed: '45 km/h',
    passengers: 28,
    capacity: 45
  };

  // Simulate bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{busData.name}</h1>
              <p className="text-sm text-gray-600">{from} → {to}</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-white">
            Live Tracking
          </Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Map Placeholder */}
        <Card className="h-96">
          <div className="h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 opacity-50 pattern-dots"></div>
            <div className="text-center z-10">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Live Bus Tracking</h3>
              <p className="text-gray-600 mb-4">Bus is currently near {busData.currentStop}</p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span className="bg-white px-3 py-1 rounded-full shadow">
                  Speed: {busData.speed}
                </span>
                <span className="bg-white px-3 py-1 rounded-full shadow">
                  ETA: {eta}
                </span>
              </div>
            </div>
            
            {/* Animated bus icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-red-500 rounded-lg shadow-lg animate-pulse"></div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
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
                <span className="text-sm text-gray-500">Departed</span>
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
        </div>
      </div>
    </div>
  );
};

export default BusMap;
