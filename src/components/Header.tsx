
import { Button } from "@/components/ui/button";
import { Menu, User, HelpCircle, LogOut } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  onAuthClick: (type: 'login' | 'signup') => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
  onLogoClick?: () => void;
  onProfileClick?: () => void;
  onHelpClick?: () => void;
}

const Header = ({ onAuthClick, isAuthenticated, onLogout, onLogoClick, onProfileClick, onHelpClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const handleLogoClick = () => {
    if (isAuthenticated && onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div 
            className={`flex items-center space-x-2 ${isAuthenticated ? 'cursor-pointer' : ''}`}
            onClick={handleLogoClick}
          >
            <div className="bg-white p-2 rounded-lg">
              <img 
                src="/lovable-uploads/c25c33f6-71c0-4b72-bb70-73d697dc99f9.png" 
                alt="Gamyam Logo"
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Gamyam</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border shadow-lg">
                    <DropdownMenuItem className="cursor-pointer" onClick={onProfileClick}>
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('profile')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={onHelpClick}>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>{t('helpCenter')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => onAuthClick('login')}>
                  {t('login')}
                </Button>
                <Button onClick={() => onAuthClick('signup')}>
                  {t('signup')}
                </Button>
              </>
            )}
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
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
                  <Button variant="ghost" className="justify-start" onClick={onProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    {t('profile')}
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={onHelpClick}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    {t('helpCenter')}
                  </Button>
                  <Button variant="outline" onClick={onLogout} className="justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => onAuthClick('login')}>
                    {t('login')}
                  </Button>
                  <Button onClick={() => onAuthClick('signup')}>
                    {t('signup')}
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
