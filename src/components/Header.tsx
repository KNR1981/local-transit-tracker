
import { Button } from "@/components/ui/button";
import { MapPin, Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onAuthClick: (type: 'login' | 'signup') => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header = ({ onAuthClick, isAuthenticated, onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">BusTracker</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => onAuthClick('login')}>
                  Login
                </Button>
                <Button onClick={() => onAuthClick('signup')}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <Button variant="outline" onClick={onLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => onAuthClick('login')}>
                    Login
                  </Button>
                  <Button onClick={() => onAuthClick('signup')}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
