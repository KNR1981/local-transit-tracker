import { useState } from "react";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import AuthModal from "@/components/AuthModal";
import Dashboard from "@/components/Dashboard";
import RouteSelection from "@/components/RouteSelection";
import BusOptions from "@/components/BusOptions";
import BusMap from "@/components/BusMap";

type AuthType = 'login' | 'signup';
type BusType = 'local' | 'district' | 'state';
type AppView = 'landing' | 'dashboard' | 'route-selection' | 'bus-options' | 'bus-map';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [showAuthModal, setShowAuthModal] = useState<AuthType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedBusType, setSelectedBusType] = useState<BusType>('local');
  const [routeData, setRouteData] = useState({ from: '', to: '' });
  const [selectedBusId, setSelectedBusId] = useState('');

  const handleAuthClick = (type: AuthType) => {
    setShowAuthModal(type);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(null);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    }
  };

  const handleBusTypeSelect = (type: BusType) => {
    setSelectedBusType(type);
    setCurrentView('route-selection');
  };

  const handleRouteNext = (from: string, to: string) => {
    setRouteData({ from, to });
    setCurrentView('bus-options');
  };

  const handleBusSelect = (busId: string) => {
    setSelectedBusId(busId);
    setCurrentView('bus-map');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleBackToRouteSelection = () => {
    setCurrentView('route-selection');
  };

  const handleBackToBusOptions = () => {
    setCurrentView('bus-options');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onAuthClick={handleAuthClick} />;
      case 'dashboard':
        return <Dashboard onBusTypeSelect={handleBusTypeSelect} />;
      case 'route-selection':
        return (
          <RouteSelection
            busType={selectedBusType}
            onBack={handleBackToDashboard}
            onNext={handleRouteNext}
          />
        );
      case 'bus-options':
        return (
          <BusOptions
            from={routeData.from}
            to={routeData.to}
            onBack={handleBackToRouteSelection}
            onSelectBus={handleBusSelect}
          />
        );
      case 'bus-map':
        return (
          <BusMap
            busId={selectedBusId}
            from={routeData.from}
            to={routeData.to}
            onBack={handleBackToBusOptions}
          />
        );
      default:
        return <LandingPage onAuthClick={handleAuthClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView !== 'bus-map' && (
        <Header
          onAuthClick={handleAuthClick}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          onLogoClick={handleLogoClick}
        />
      )}
      
      {renderCurrentView()}

      {showAuthModal && (
        <AuthModal
          type={showAuthModal}
          onClose={() => setShowAuthModal(null)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default Index;
