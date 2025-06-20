
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
      title: 'Local Bus',
      description: 'City and local area buses',
      icon: MapPin,
      color: 'bg-green-100 text-green-700',
      badge: 'Most Popular',
      badgeColor: 'bg-green-500'
    },
    {
      id: 'district' as const,
      title: 'District Bus',
      description: 'Inter-district transportation',
      icon: Clock,
      color: 'bg-blue-100 text-blue-700',
      badge: 'Reliable',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 'state' as const,
      title: 'State Bus',
      description: 'Interstate bus services',
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
      badge: 'Long Distance',
      badgeColor: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Bus Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the type of bus service you want to track. Get real-time updates 
            and plan your journey with confidence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {busTypes.map((busType) => {
            const IconComponent = busType.icon;
            return (
              <Card 
                key={busType.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200"
                onClick={() => onBusTypeSelect(busType.id)}
              >
                <CardHeader className="text-center">
                  <div className="relative">
                    <div className={`w-16 h-16 ${busType.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <Badge className={`absolute -top-2 -right-2 ${busType.badgeColor} text-white`}>
                      {busType.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{busType.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {busType.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
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
        
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">250+</div>
              <div className="text-sm text-gray-600">Active Buses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-600">Routes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1000+</div>
              <div className="text-sm text-gray-600">Daily Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">98%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
