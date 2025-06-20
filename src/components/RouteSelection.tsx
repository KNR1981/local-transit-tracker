
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

  // Location data based on bus type
  const getLocationData = () => {
    switch (busType) {
      case 'local':
        return {
          title: 'Hyderabad Areas',
          areas: [
            {
              emoji: '🏙',
              area: 'Central Hyderabad',
              locations: ['Abids', 'Koti', 'Nampally', 'Basheerbagh', 'Himayatnagar', 'Lakdikapul', 'Hyderguda', 'King Koti', 'Chikkadpally', 'Narayanguda']
            },
            {
              emoji: '🕌',
              area: 'Old City (South Hyderabad)',
              locations: ['Charminar', 'Mecca Masjid', 'Falaknuma', 'Shalibanda', 'Barkas', 'Chandrayangutta', 'Dabeerpura', 'Yakutpura', 'Bahadurpura', 'Santoshnagar']
            },
            {
              emoji: '🌆',
              area: 'North Hyderabad',
              locations: ['Secunderabad', 'Malkajgiri', 'Tarnaka', 'Lalaguda', 'Nacharam', 'Moula Ali', 'ECIL', 'Neredmet', 'Kapra', 'Kushaiguda']
            },
            {
              emoji: '🛍',
              area: 'West Hyderabad',
              locations: ['Ameerpet', 'Kukatpally', 'Miyapur', 'Moosapet', 'Sanathnagar', 'Balanagar', 'SR Nagar (Sanathnagar)', 'Erragadda', 'Bharat Nagar', 'Jagadgirigutta']
            }
          ]
        };
      case 'district':
        return {
          title: 'Telangana Districts',
          areas: [
            {
              emoji: '🏛',
              area: 'Northern Districts',
              locations: ['Adilabad', 'Nizamabad', 'Karimnagar', 'Peddapalli', 'Jagitial', 'Rajanna Sircilla', 'Kumuram Bheem Asifabad', 'Mancherial', 'Nirmal']
            },
            {
              emoji: '🏙',
              area: 'Central Districts',
              locations: ['Hyderabad', 'Medchal Malkajgiri', 'Ranga Reddy', 'Sangareddy', 'Medak', 'Kamareddy', 'Siddipet', 'Vikarabad']
            },
            {
              emoji: '🌾',
              area: 'Southern Districts',
              locations: ['Mahabubnagar', 'Nagarkurnool', 'Wanaparthy', 'Jogulamba Gadwal', 'Narayanpet']
            },
            {
              emoji: '🌳',
              area: 'Eastern Districts',
              locations: ['Warangal', 'Hanumakonda', 'Jangaon', 'Jayashankar Bhupalpally', 'Mulugu', 'Bhadradri Kothagudem', 'Khammam', 'Mahabubabad', 'Suryapet', 'Yadadri Bhuvanagiri', 'Nalgonda']
            }
          ]
        };
      case 'state':
        return {
          title: 'Indian States',
          areas: [
            {
              emoji: '🏔',
              area: 'Northern States',
              locations: ['Punjab', 'Haryana', 'Himachal Pradesh', 'Uttarakhand', 'Uttar Pradesh', 'Bihar', 'Jharkhand']
            },
            {
              emoji: '🌊',
              area: 'Western States',
              locations: ['Rajasthan', 'Gujarat', 'Maharashtra', 'Goa', 'Madhya Pradesh', 'Chhattisgarh']
            },
            {
              emoji: '🌴',
              area: 'Southern States',
              locations: ['Karnataka', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Kerala']
            },
            {
              emoji: '🏞',
              area: 'Eastern & Northeastern States',
              locations: ['West Bengal', 'Odisha', 'Assam', 'Arunachal Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura']
            }
          ]
        };
      default:
        return { title: '', areas: [] };
    }
  };

  const locationData = getLocationData();
  const allLocations = locationData.areas.flatMap(area => area.locations);

  const handleFromChange = (value: string) => {
    setFrom(value);
    if (value.length > 0) {
      setFromSuggestions(allLocations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToChange = (value: string) => {
    setTo(value);
    if (value.length > 0) {
      setToSuggestions(allLocations.filter(loc => 
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
      case 'local': return 'Local City Bus';
      case 'district': return 'District Bus';
      case 'state': return 'State Bus';
      default: return 'Bus';
    }
  };

  const getPopularRoutes = () => {
    switch (busType) {
      case 'local':
        return [
          { route: 'Secunderabad → Charminar', count: '25 buses' },
          { route: 'Ameerpet → ECIL', count: '18 buses' },
          { route: 'Kukatpally → Koti', count: '22 buses' }
        ];
      case 'district':
        return [
          { route: 'Hyderabad → Warangal', count: '12 buses' },
          { route: 'Karimnagar → Nizamabad', count: '8 buses' },
          { route: 'Khammam → Nalgonda', count: '10 buses' }
        ];
      case 'state':
        return [
          { route: 'Telangana → Karnataka', count: '15 buses' },
          { route: 'Andhra Pradesh → Tamil Nadu', count: '20 buses' },
          { route: 'Maharashtra → Gujarat', count: '18 buses' }
        ];
      default:
        return [];
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
          <h1 className="text-2xl font-bold text-gray-900">
            {getBusTypeTitle()} - Plan Your Journey
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Select Your Route
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

          <Card>
            <CardHeader>
              <CardTitle>{locationData.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {locationData.areas.map((area, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{area.emoji}</span>
                    <h4 className="font-semibold text-gray-800">{area.area}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {area.locations.join(', ')}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Popular Routes</h3>
          <div className="space-y-2">
            {getPopularRoutes().map((route, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{route.route}</span>
                <span className="text-blue-600">{route.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteSelection;
