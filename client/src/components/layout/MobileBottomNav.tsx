import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface MobileBottomNavProps {
  items: NavItem[];
  activeView: string;
  onNavigation: (viewId: string) => void;
  className?: string;
}

export const MobileBottomNav = ({ 
  items, 
  activeView, 
  onNavigation, 
  className 
}: MobileBottomNavProps) => {
  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
        "bg-white/5 backdrop-blur-2xl border-t border-white/10 shadow-lg",
        "px-2 py-2 safe-area-pb",
        className
      )}
      data-testid="mobile-bottom-nav"
    >
      <nav className="flex items-center justify-around max-w-lg mx-auto">
        {items.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigation(item.id)}
              className={cn(
                "flex flex-col items-center justify-center px-2 py-2 rounded-xl transition-all duration-200 backdrop-blur-lg",
                "min-h-[56px] min-w-[48px] touch-manipulation",
                isActive 
                  ? "bg-white/20 text-green-400 border border-white/30 shadow-sm" 
                  : "text-white/80 hover:text-white hover:bg-white/15 border border-transparent"
              )}
              data-testid={`nav-${item.id}`}
            >
              <Icon 
                className={cn(
                  "w-5 h-5 mb-1 transition-transform duration-200",
                  isActive && "scale-110"
                )} 
              />
              <span 
                className={cn(
                  "text-xs font-medium leading-none",
                  isActive ? "text-green-400" : "text-white/80"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};