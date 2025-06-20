
import { Button } from "@/components/ui/button";
import { MapPin, Menu, User, Route, HelpCircle, LogOut } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <h1 className="text-2xl font-bold text-gray-900">Gamyam</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border shadow-lg">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Route className="mr-2 h-4 w-4" />
                      <span>Route</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help Center</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
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
                <>
                  <Button variant="ghost" className="justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Route className="mr-2 h-4 w-4" />
                    Route
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help Center
                  </Button>
                  <Button variant="outline" onClick={onLogout} className="justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
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
