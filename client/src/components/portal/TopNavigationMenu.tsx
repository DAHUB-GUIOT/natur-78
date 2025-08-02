import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Home, Building2, MapPin, Bell, Search, Settings, User, 
  LogOut, Sun, Menu, X, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TopNavigationMenuProps {
  user?: any;
  notificationCount?: number;
  onSearch?: () => void;
  onLogout?: () => void;
}

const TopNavigationMenu: React.FC<TopNavigationMenuProps> = ({
  user,
  notificationCount = 0,
  onSearch,
  onLogout
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    {
      label: 'Inicio',
      href: '/',
      icon: Home,
      description: 'Página principal'
    },
    {
      label: 'Portal Viajeros',
      href: '/portal-viajeros',
      icon: MapPin,
      description: 'Marketplace turístico'
    },
    {
      label: 'Festival NATUR',
      href: '/agenda',
      icon: Sun,
      description: 'Eventos y actividades'
    }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-400 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-black" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-title text-white">Portal Empresas</h1>
              <p className="text-caption">Festival NATUR 2025</p>
            </div>
          </motion.div>

          {/* Main Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className="glass-button text-white hover:bg-white/10 relative group"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                    
                    {/* Tooltip */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="glass-surface px-3 py-1 rounded-md">
                        <p className="text-caption whitespace-nowrap">{item.description}</p>
                      </div>
                    </div>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearch}
              className="glass-button text-white hover:bg-white/10 hidden md:flex"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="glass-button text-white hover:bg-white/10 relative"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-0 h-5 flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </Button>

            {/* Inverted Mode Toggle */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => {
                  // Toggle inverted mode
                  document.documentElement.classList.toggle('invert');
                }}
                className="glass-button p-2 hover:bg-white/10 flex items-center space-x-2"
                title="Alternar modo invertido"
              >
                <div className="w-8 h-8 rounded-full border-2 border-white/60 flex items-center justify-center bg-white/10">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="hidden lg:block text-white text-sm">Invertido</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="glass-button text-white hover:bg-white/10 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background blur effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-green-900/40 to-black/60 backdrop-blur-md" />
        {/* Solar particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 50, 0],
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 1.5,
              }}
              className={`absolute w-1 h-1 bg-yellow-400 rounded-full blur-sm`}
              style={{
                left: `${20 + i * 30}%`,
                top: '50%',
              }}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNavigationMenu;