import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X, Minimize2, Maximize2, Move, RotateCcw, 
  ChevronDown, ChevronUp, Pin, Navigation
} from "lucide-react";

interface ContentOverlayProps {
  children: React.ReactNode;
  title: string;
  isMapView: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  allowResize?: boolean;
  allowMove?: boolean;
  defaultPosition?: 'right' | 'left' | 'center' | 'floating';
  priority?: 'high' | 'medium' | 'low';
}

const ContentOverlay: React.FC<ContentOverlayProps> = ({
  children,
  title,
  isMapView,
  onClose,
  onMinimize,
  allowResize = true,
  allowMove = true,
  defaultPosition = 'right',
  priority = 'medium'
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [customPosition, setCustomPosition] = useState({ x: 0, y: 0 });

  // Smart positioning based on content priority and map visibility
  const getOverlayStyles = () => {
    if (!isMapView) {
      // Full content mode - no overlay needed
      return {
        position: 'relative' as const,
        className: 'w-full h-full'
      };
    }

    // Map view - overlay positioning
    const baseClasses = "fixed z-30 transition-all duration-300 ease-in-out backdrop-blur-xl";
    
    if (isMinimized) {
      return {
        position: 'fixed' as const,
        className: `${baseClasses} bottom-6 right-6 w-80 h-16 bg-[var(--color-surface)]/95 border border-[var(--color-border)] rounded-lg shadow-xl`
      };
    }

    if (isExpanded) {
      return {
        position: 'fixed' as const,
        className: `${baseClasses} inset-6 bg-[var(--color-surface)]/98 border border-[var(--color-border)] rounded-lg shadow-2xl`
      };
    }

    // Normal overlay positioning
    switch (position) {
      case 'right':
        return {
          position: 'fixed' as const,
          className: `${baseClasses} top-24 right-6 bottom-6 w-96 max-w-[calc(100vw-320px)] bg-[var(--color-surface)]/95 border border-[var(--color-border)] rounded-lg shadow-xl`
        };
      case 'left':
        return {
          position: 'fixed' as const,
          className: `${baseClasses} top-24 left-80 bottom-6 w-96 bg-[var(--color-surface)]/95 border border-[var(--color-border)] rounded-lg shadow-xl`
        };
      case 'center':
        return {
          position: 'fixed' as const,
          className: `${baseClasses} top-24 left-1/2 transform -translate-x-1/2 bottom-6 w-[600px] max-w-[calc(100vw-80px)] bg-[var(--color-surface)]/95 border border-[var(--color-border)] rounded-lg shadow-xl`
        };
      case 'floating':
        return {
          position: 'fixed' as const,
          className: `${baseClasses} bg-[var(--color-surface)]/95 border border-[var(--color-border)] rounded-lg shadow-xl`,
          style: {
            top: customPosition.y,
            left: customPosition.x,
            width: '400px',
            height: '500px'
          }
        };
      default:
        return {
          position: 'fixed' as const,
          className: `${baseClasses} top-24 right-6 bottom-6 w-96 bg-[var(--color-surface)]/95 border border-[var(--color-border)] rounded-lg shadow-xl`
        };
    }
  };

  const overlayStyles = getOverlayStyles();

  // Drag handlers for floating mode
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!allowMove || position !== 'floating') return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - customPosition.x,
      y: e.clientY - customPosition.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      setCustomPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Mobile responsive behavior
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile adjustments
  if (isMobile && isMapView) {
    return (
      <div className="fixed inset-x-4 bottom-4 top-24 z-30 bg-[var(--color-surface)]/98 backdrop-blur-xl border border-[var(--color-border)] rounded-lg shadow-2xl flex flex-col">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]/30">
          <div>
            <h2 className="font-gasoek text-lg text-[var(--color-text)] uppercase tracking-wider">{title}</h2>
            <Badge className="bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-jakarta mt-1">
              Vista móvil
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Content */}
        {!isMinimized && (
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        )}
      </div>
    );
  }

  // Desktop/Tablet view
  return (
    <div 
      className={overlayStyles.className}
      style={overlayStyles.style}
    >
      {/* Header with Controls */}
      <div 
        className="flex items-center justify-between p-4 border-b border-[var(--color-border)]/30 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          <h2 className="font-gasoek text-lg text-[var(--color-text)] uppercase tracking-wider">
            {title}
          </h2>
          {priority === 'high' && (
            <Badge className="bg-red-500/20 text-red-400 text-xs font-jakarta">
              Prioritario
            </Badge>
          )}
          {isMapView && (
            <Badge className="bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-jakarta">
              Sobre mapa
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-1">
          {/* Position Controls */}
          {isMapView && allowMove && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPosition('left')}
                className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
                title="Posición izquierda"
              >
                <Navigation className="w-4 h-4 rotate-180" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPosition('center')}
                className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
                title="Centrar"
              >
                <Navigation className="w-4 h-4 rotate-90" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPosition('right')}
                className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
                title="Posición derecha"
              >
                <Navigation className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Size Controls */}
          {allowResize && isMapView && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
                title="Minimizar"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
                title="Expandir"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Close Control */}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-red-500"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {isMinimized ? (
          <div className="p-4 flex items-center justify-between">
            <span className="text-sm text-[var(--color-text)]/70 font-jakarta">{title}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(false)}
              className="text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
            >
              Restaurar
            </Button>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Resize handle for floating mode */}
      {position === 'floating' && allowResize && !isMinimized && (
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize bg-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/40 transition-colors" />
      )}
    </div>
  );
};

export default ContentOverlay;