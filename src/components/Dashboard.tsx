
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";

interface DashboardProps {
  onBusTypeSelect: (type: 'local' | 'district' | 'state') => void;
}

const Dashboard = ({ onBusTypeSelect }: DashboardProps) => {
  const busTypes = [
    {
      id: 'local' as const,
      title: 'Local City Bus',
      icon: MapPin,
      color: 'bg-emerald-100 text-emerald-700',
      badge: 'Most Popular',
      badgeColor: 'bg-emerald-500',
      features: ['Real-time tracking', 'Multiple payment options', 'Accessible vehicles'],
      logoUrl: '/lovable-uploads/44e93a91-29a8-4113-90bd-7232b7808876.png'
    },
    {
      id: 'district' as const,
      title: 'District Express',
      icon: Clock,
      color: 'bg-blue-100 text-blue-700',
      badge: 'Express Service',
      badgeColor: 'bg-blue-500',
      features: ['Limited stops', 'AC comfort', 'Real-time tracking'],
      logoUrl: '/lovable-uploads/b7f6924a-8b01-4130-aba6-eca03c6eb7d8.png'
    },
    {
      id: 'state' as const,
      title: 'State Highway',
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
      badge: 'Premium',
      badgeColor: 'bg-purple-500',
      features: ['Luxury seating', 'Entertainment system', 'Real-time tracking'],
      logoUrl: '/lovable-uploads/d95a9ac1-b895-456d-a0dd-5daf6f1fb5f9.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Transportation Service
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience seamless public transportation with Gamyam. Select your preferred service type 
            and enjoy real-time tracking, accurate schedules, and comfortable journeys.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {busTypes.map((busType) => {
            const IconComponent = busType.icon;
            return (
              <Card 
                key={busType.id} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 relative overflow-hidden"
                onClick={() => onBusTypeSelect(busType.id)}
              >
                <div className="absolute top-0 right-0">
                  <Badge className={`${busType.badgeColor} text-white rounded-bl-lg rounded-tr-lg px-3 py-1`}>
                    {busType.badge}
                  </Badge>
                </div>
                <CardHeader className="text-center pt-8">
                  <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src={busType.logoUrl} 
                      alt={`${busType.title} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold">{busType.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {busType.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBusTypeSelect(busType.id);
                    }}
                  >
                    Select {busType.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
