import React from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BreadcrumbItem {
  id: string;
  label: string;
  path?: string;
  isActive?: boolean;
}

interface NavigationBreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (itemId: string) => void;
  onBack?: () => void;
  showMapContext?: boolean;
  mapLocation?: string;
  contextualActions?: React.ReactNode;
}

const NavigationBreadcrumb: React.FC<NavigationBreadcrumbProps> = ({
  items,
  onNavigate,
  onBack,
  showMapContext = false,
  mapLocation,
  contextualActions
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[var(--color-surface)]/50 backdrop-blur-sm border-b border-[var(--color-border)]/30">
      <div className="flex items-center space-x-4">
        {/* Back Button */}
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-[var(--color-text)]/60 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        )}

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2">
          {/* Home/Map indicator */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('mapa')}
            className="text-[var(--color-text)]/60 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 px-2"
            title="Volver al mapa"
          >
            <Home className="w-4 h-4" />
          </Button>

          {/* Breadcrumb items */}
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <ChevronRight className="w-4 h-4 text-[var(--color-text)]/30" />
              <button
                onClick={() => onNavigate(item.id)}
                className={`
                  px-3 py-1 rounded-md text-sm font-jakarta transition-colors
                  ${item.isActive 
                    ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10 font-medium' 
                    : 'text-[var(--color-text)]/70 hover:text-[var(--color-text)] hover:bg-[var(--color-accent)]/5'
                  }
                `}
              >
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </nav>

        {/* Map Context Indicator */}
        {showMapContext && mapLocation && (
          <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-[var(--color-border)]/30">
            <Badge className="bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-jakarta">
              📍 {mapLocation}
            </Badge>
          </div>
        )}
      </div>

      {/* Contextual Actions */}
      {contextualActions && (
        <div className="flex items-center space-x-2">
          {contextualActions}
        </div>
      )}
    </div>
  );
};

export default NavigationBreadcrumb;