
// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

// Mock coordinates for common routes (you can expand this)
const routeCoordinates: { [key: string]: { lat: number, lng: number } } = {
  'hyderabad': { lat: 17.3850, lng: 78.4867 },
  'karimnagar': { lat: 18.4386, lng: 79.1288 },
  'khammam': { lat: 17.2473, lng: 80.1514 },
  'mancherial': { lat: 18.8718, lng: 79.4506 },
  'srisailam': { lat: 16.0739, lng: 78.8682 },
  'vijayawada': { lat: 16.5062, lng: 80.6480 },
  'bangalore': { lat: 12.9716, lng: 77.5946 },
  'kurnool': { lat: 15.8281, lng: 78.0373 },
  'ananthapur': { lat: 14.6819, lng: 77.6006 }
};

export const calculateFare = (busType: 'local' | 'district' | 'state', from: string, to: string, busName: string): { fare: string, distance: number } => {
  // Calculate distance
  const fromCoords = routeCoordinates[from.toLowerCase()] || routeCoordinates['hyderabad'];
  const toCoords = routeCoordinates[to.toLowerCase()] || routeCoordinates['hyderabad'];
  const distance = calculateDistance(fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng);

  let fare = '';

  if (busType === 'local' || busType === 'district') {
    switch (busName) {
      case 'City Ordinary':
        if (distance <= 4) {
          fare = '₹10';
        } else if (distance <= 6) {
          fare = '₹15';
        } else {
          fare = `₹${Math.round(10 + (distance * 2.5))}`;
        }
        break;
      
      case 'Metro Express (Non-AC)':
        if (distance <= 2) {
          fare = '₹10';
        } else if (distance <= 6) {
          fare = '₹20';
        } else {
          fare = `₹${Math.round(10 + (distance * 3))}`;
        }
        break;
      
      case 'Metro Deluxe':
        fare = `₹${Math.round(15 + (distance * 2))}`;
        break;
      
      case 'Deluxe':
        if (distance <= 6) {
          fare = '₹15 - ₹20';
        } else {
          fare = `₹${Math.round(15 + (distance * 2))} - ₹${Math.round(20 + (distance * 2))}`;
        }
        break;
      
      case 'Super-Luxury':
        if (distance <= 15) {
          fare = '₹40 - ₹70';
        } else if (distance <= 30) {
          fare = '₹70 - ₹100';
        } else {
          fare = `₹${Math.round(70 + (distance * 2))}+`;
        }
        break;
      
      default:
        fare = '₹10 - ₹20';
    }
  } else {
    // State bus pricing
    const routeKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const reverseRouteKey = `${to.toLowerCase()}-${from.toLowerCase()}`;
    
    const stateBusPricing: { [key: string]: string } = {
      'hyderabad-karimnagar': '₹231',
      'hyderabad-khammam': '₹296',
      'hyderabad-mancherial': '₹348',
      'srisailam-hyderabad': '₹369',
      'hyderabad-srisailam': '₹345',
      'hyderabad-vijayawada': '₹363',
      'hyderabad-bangalore': '₹631',
      'bangalore-hyderabad': '₹674',
      'hyderabad-kurnool': '₹278',
      'hyderabad-ananthapur': '₹471'
    };

    if (busName === 'Garuda') {
      fare = stateBusPricing[routeKey] || stateBusPricing[reverseRouteKey] || `₹${Math.round(distance * 15)}`;
    } else if (busName === 'Vajra') {
      const vajraPricing: { [key: string]: string } = {
        'hyderabad-karimnagar': '₹231',
        'hyderabad-khammam': '₹296',
        'hyderabad-mancherial': '₹348',
        'hyderabad-vijayawada': '₹352',
        'hyderabad-bangalore': '₹674',
        'hyderabad-kurnool': '₹278'
      };
      fare = vajraPricing[routeKey] || vajraPricing[reverseRouteKey] || `₹${Math.round(distance * 12)}`;
    } else {
      fare = `₹${Math.round(distance * 10)} - ₹${Math.round(distance * 20)}`;
    }
  }

  return { fare, distance };
};
