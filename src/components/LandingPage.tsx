import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Users, Smartphone, Shield, Zap } from "lucide-react";

interface LandingPageProps {
  onAuthClick: (type: 'login' | 'signup') => void;
}

const LandingPage = ({ onAuthClick }: LandingPageProps) => {
  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Track your bus location in real-time with GPS accuracy"
    },
    {
      icon: Clock,
      title: "Arrival Predictions",
      description: "Get accurate arrival time predictions for better planning"
    },
    {
      icon: Users,
      title: "Crowd Information",
      description: "Check bus occupancy levels before boarding"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access from any device, anywhere, anytime"
    },
    {
      icon: Shield,
      title: "Reliable Service",
      description: "Government-backed reliable bus tracking system"
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Receive instant notifications about your bus status"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section with Background Image */}
      <div 
        className="container mx-auto px-4 py-16 relative"
        style={{
          backgroundImage: `url('/lovable-uploads/eb128bba-7d30-499e-9ec7-09a3f77b504d.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 bg-opacity-90 px-4 py-2 rounded-full mb-6">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-medium">Government Bus Tracking</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Track Your Bus with
            <span className="text-yellow-400"> Gamyam</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Never miss your bus again. Track government buses in real-time, 
            get accurate arrival predictions, and plan your journey with confidence using Gamyam.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => onAuthClick('signup')}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3 bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => onAuthClick('login')}
            >
              Sign In
            </Button>
          </div>
          
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">250+</div>
                <div className="text-gray-600">Active Buses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-gray-600">Routes Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">98%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Gamyam?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive bus tracking solution provides everything you need 
              for a seamless public transportation experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of commuters who trust Gamyam for their daily travel needs.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-3"
            onClick={() => onAuthClick('signup')}
          >
            Start Your Journey Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
