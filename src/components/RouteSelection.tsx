
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, ArrowLeft, Search } from "lucide-react";
import { useState } from "react";

interface RouteSelectionProps {
  busType: 'local' | 'district' | 'state';
  onBack: () => void;
  onNext: (from: string, to: string) => void;
}

const RouteSelection = ({ busType, onBack, onNext }: RouteSelectionProps) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);

  // Mock location suggestions
  const mockLocations = [
    'Central Bus Station', 'City Mall', 'Airport', 'Railway Station',
    'Hospital', 'University', 'Market Square', 'Tech Park',
    'Residential Area A', 'Residential Area B'
  ];

  const handleFromChange = (value: string) => {
    setFrom(value);
    if (value.length > 0) {
      setFromSuggestions(mockLocations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToChange = (value: string) => {
    setTo(value);
    if (value.length > 0) {
      setToSuggestions(mockLocations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setToSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to) {
      onNext(from, to);
    }
  };

  const getBusTypeTitle = () => {
    switch (busType) {
      case 'local': return 'Local Bus';
      case 'district': return 'District Bus';
      case 'state': return 'State Bus';
      default: return 'Bus';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {getBusTypeTitle()} - Select Route
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Choose Your Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <div className="relative">
                  <Input
                    id="from"
                    type="text"
                    placeholder="Enter departure location"
                    value={from}
                    onChange={(e) => handleFromChange(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  {fromSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {fromSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFrom(suggestion);
                            setFromSuggestions([]);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <div className="relative">
                  <Input
                    id="to"
                    type="text"
                    placeholder="Enter destination"
                    value={to}
                    onChange={(e) => handleToChange(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  {toSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {toSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setTo(suggestion);
                            setToSuggestions([]);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Find Buses
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Popular Routes</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Central Station → Airport</span>
              <span className="text-blue-600">15 buses</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>City Mall → University</span>
              <span className="text-blue-600">12 buses</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Railway Station → Tech Park</span>
              <span className="text-blue-600">8 buses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteSelection;
