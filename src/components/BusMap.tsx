
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Phone, Navigation, Zap } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Import leaflet dynamically to avoid SSR issues
let L: any = null;

interface BusMapProps {
  busId: string;
  from: string;
  to: string;
  onBack: () => void;
}

const BusMap = ({ busId, from, to, onBack }: BusMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const busMarkerRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const routeLineRef = useRef<any>(null);
  
  const [busLocation, setBusLocation] = useState({ lat: 17.3850, lng: 78.4867 });
  const [userLocation] = useState({ lat: 17.3950, lng: 78.4767 });
  const [destinationLocation] = useState({ lat: 17.3750, lng: 78.4967 });
  const [eta, setEta] = useState('12 mins');
  const [traffic, setTraffic] = useState('Moderate');
  const [mapLoaded, setMapLoaded] = useState(false);

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

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Import leaflet dynamically
        const leafletModule = await import('leaflet');
        L = leafletModule.default;
        
        // Import CSS
        await import('leaflet/dist/leaflet.css');
        
        setMapLoaded(true);
      } catch (error) {
        console.error('Failed to load Leaflet:', error);
      }
    };

    loadLeaflet();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !L || !mapLoaded) return;

    // Create map instance
    const map = L.map(mapRef.current).setView([busLocation.lat, busLocation.lng], 13);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom icons
    const busIcon = L.divIcon({
      html: '<div style="background: #3b82f6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🚐</div>',
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const userIcon = L.divIcon({
      html: '<div style="background: #10b981; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      className: 'custom-div-icon',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const destinationIcon = L.divIcon({
      html: '<div style="background: #ef4444; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      className: 'custom-div-icon',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    // Add markers
    const busMarker = L.marker([busLocation.lat, busLocation.lng], { icon: busIcon })
      .addTo(map)
      .bindPopup(`<b>Bus Location</b><br/>${busData.name}<br/>Speed: ${busData.speed}`);
    busMarkerRef.current = busMarker;

    const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup('<b>Your Location</b>');
    userMarkerRef.current = userMarker;

    L.marker([destinationLocation.lat, destinationLocation.lng], { icon: destinationIcon })
      .addTo(map)
      .bindPopup(`<b>Destination</b><br/>${to}`);

    // Add route line
    const routePoints = [
      [userLocation.lat, userLocation.lng],
      [busLocation.lat, busLocation.lng],
      [destinationLocation.lat, destinationLocation.lng]
    ];

    const routeLine = L.polyline(routePoints as any, {
      color: '#3b82f6',
      weight: 4,
      opacity: 0.7,
      dashArray: '10, 5'
    }).addTo(map);
    routeLineRef.current = routeLine;

    // Fit map to show all markers
    const group = new L.FeatureGroup([busMarker, userMarker]);
    map.fitBounds(group.getBounds().pad(0.1));

    return () => {
      map.remove();
    };
  }, [mapLoaded, L]);

  // Simulate bus movement and traffic updates
  useEffect(() => {
    if (!mapLoaded) return;
    
    const interval = setInterval(() => {
      const newBusLocation = {
        lat: busLocation.lat + (Math.random() - 0.5) * 0.002,
        lng: busLocation.lng + (Math.random() - 0.5) * 0.002
      };
      setBusLocation(newBusLocation);
      
      // Update bus marker position
      if (busMarkerRef.current) {
        busMarkerRef.current.setLatLng([newBusLocation.lat, newBusLocation.lng]);
      }

      // Update route line
      if (routeLineRef.current) {
        const newRoutePoints = [
          [userLocation.lat, userLocation.lng],
          [newBusLocation.lat, newBusLocation.lng],
          [destinationLocation.lat, destinationLocation.lng]
        ];
        routeLineRef.current.setLatLngs(newRoutePoints as any);
      }
      
      // Simulate dynamic ETA and traffic
      const newEta = Math.max(1, Math.floor(Math.random() * 15) + 5);
      setEta(`${newEta} mins`);
      
      const trafficConditions = ['Light', 'Moderate', 'Heavy'];
      setTraffic(trafficConditions[Math.floor(Math.random() * trafficConditions.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [busLocation, userLocation, destinationLocation, mapLoaded]);

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
        {/* Real Leaflet Map */}
        <Card className="h-96">
          <div ref={mapRef} className="h-full w-full rounded-lg">
            {!mapLoaded && (
              <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-gray-500">Loading map...</div>
              </div>
            )}
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
