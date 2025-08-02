import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SubCategory {
  label: string;
  url?: string;
}

interface MenuCategory {
  icon: string;
  title: string;
  subcategories?: SubCategory[];
  url?: string;
}

// Simplified menu structure for mobile
const mobileMenuData = [
  {
    title: 'FESTIVAL NATUR',
    subcategories: [
      { label: 'VIVE NATUR', url: '/vive-natur' },
      { label: 'NATUR PRO', url: '/natur-pro' }
    ]
  },
  {
    title: 'PLATAFORMA NATUR',
    subcategories: [
      { label: 'Portal Empresas', url: '/portal-empresas' },
      { label: 'Mapa Interactivo', url: '/portal-viajeros' }
    ]
  },
  {
    title: 'INFO',
    subcategories: [
      { label: 'Sobre Nosotros', url: '/sobre' },
      { label: 'Contacto', url: '/contacto' },
      { label: 'Aliados', url: '/aliados' },
      { label: 'FAQ', url: '/faq' },
      { label: 'Términos y Condiciones', url: '/terminos' }
    ]
  }
];

// Original detailed menu for desktop
const desktopMenuData: MenuCategory[] = [
  {
    icon: '🌿',
    title: 'FESTIVAL NATUR BOGOTÁ 2025',
    subcategories: [
      // VIVE NATUR
      { label: 'Charlas NATUR (Agenda Académica)', url: '/charlas' },
      { label: 'Rooftop + Zona de Comidas', url: '/rooftop' },
      { label: 'Emprendimientos Sostenibles', url: '/emprendimientos' },
      { label: 'Zona Chill', url: '/zona-chill' },
      { label: 'Foro Colombia Sostenible 2025', url: '/foro' },
      // NATUR PRO
      { label: 'NATUR PRO', url: '/natur-pro' },
      { label: '+ VIVE NATUR', url: '/vive-natur-plus' },
      { label: 'Cartel de Artistas', url: '/artistas' },
      { label: 'Talleres', url: '/talleres' },
      { label: 'Zona Startups', url: '/startups' },
      { label: 'Coffee Talks / Speed Talks', url: '/coffee-talks' },
      { label: 'Rumba y Manifestaciones', url: '/rumba' },
      { label: 'Zona Wellness', url: '/wellness' },
      { label: 'Experiencia NATUR', url: '/experiencia' },
      { label: 'Zona VIP', url: '/vip' },
      { label: 'Zona Kinder & Coffee Party', url: '/zona-kinder' }
    ]
  },
  {
    icon: '📰',
    title: 'NOTICIAS',
    subcategories: [
      { label: 'Turismo Regenerativo: El Futuro del Viaje Consciente', url: '/articulo-1' },
      { label: 'Colombia Lidera la Revolución del Ecoturismo en Latinoamérica', url: '/articulo-2' },
      { label: 'Festival NATUR 2025: Conectando Comunidades Sostenibles', url: '/articulo-3' }
    ]
  },
  {
    icon: '🌐',
    title: 'PLATAFORMA NATUR',
    subcategories: [
      { label: 'Portal Empresas', url: '/portal-empresas' },
      { label: 'Con-Sentidos', url: '/portal-viajeros' },
      { label: 'Mapa Interactivo', url: '/mapa-interactivo' }
    ]
  },
  {
    icon: 'ℹ️',
    title: 'INFO',
    subcategories: [
      { label: 'Sobre Nosotros', url: '/sobre' },
      { label: 'Contacto', url: '/contacto' },
      { label: 'Aliados', url: '/aliados' },
      { label: 'FAQ', url: '/faq' },
      { label: 'Términos y Condiciones', url: '/terminos' }
    ]
  }
];

interface BrutalistDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export function BrutalistDropdownMenu({ isOpen, onClose, triggerRef }: BrutalistDropdownMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentMenuData = isMobile ? mobileMenuData : desktopMenuData;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleCategoryClick = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const handleSubcategoryClick = (url?: string) => {
    if (url) {
      window.location.href = url;
    }
    onClose();
  };

  return (
    <div 
      ref={menuRef}
      className="fixed inset-0 z-50 bg-[#0a1a0a] text-[#cad95e] transform transition-all duration-300 ease-out"
      data-state={isOpen ? 'open' : 'closed'}
    >
      {/* Header - Mobile Optimized */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#cad95e]/20">
        <h1 className="text-2xl md:text-4xl font-gasoek text-[#cad95e] tracking-wider">NATUR</h1>
        <button 
          onClick={onClose}
          className="text-[#cad95e] hover:text-white text-2xl font-bold p-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          ×
        </button>
      </div>

      {/* Menu Content - Mobile First Simple Design */}
      {isMobile ? (
        // Mobile: Simple Vertical Menu
        <div className="p-4 overflow-y-auto">
          <div className="space-y-3">
            {currentMenuData.map((category, index) => (
              <div key={index} className="border-b border-[#cad95e]/20 pb-3">
                <button
                  onClick={() => handleCategoryClick(index)}
                  className={`w-full text-left p-3 text-base font-jakarta uppercase tracking-wide transition-colors duration-200 rounded touch-manipulation min-h-[48px] ${
                    expandedCategory === index 
                      ? 'text-[#cad95e] bg-[#1a3d1a]' 
                      : 'text-gray-300 hover:text-[#cad95e]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm font-jakarta font-medium">{category.title}</h1>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      expandedCategory === index ? 'rotate-180' : ''
                    }`} />
                  </div>
                </button>
                
                {/* Mobile Subcategories */}
                {expandedCategory === index && category.subcategories && (
                  <div className="mt-2 ml-4 space-y-1">
                    {category.subcategories.map((sub, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleSubcategoryClick(sub.url)}
                        className="block w-full text-left p-2 text-sm text-gray-400 hover:text-[#cad95e] transition-colors duration-200 rounded touch-manipulation min-h-[44px]"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Quick Actions */}
            <div className="pt-4 space-y-2">
              <button 
                onClick={() => handleSubcategoryClick('/tickets')}
                className="w-full bg-[#cad95e] text-[#0a1a0a] p-3 font-jakarta-bold uppercase tracking-wide hover:bg-yellow-300 transition-colors touch-manipulation min-h-[48px] rounded"
              >
                Boletos
              </button>
              <button 
                onClick={() => handleSubcategoryClick('/agenda')}
                className="w-full border border-[#cad95e] text-[#cad95e] p-3 font-jakarta-bold uppercase tracking-wide hover:bg-[#cad95e] hover:text-[#0a1a0a] transition-colors touch-manipulation min-h-[48px] rounded"
              >
                Agenda
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Desktop: Original Complex Layout
        <div className="flex h-full overflow-hidden">
          {/* Desktop Left Sidebar */}
          <div className="w-1/4 bg-[#0f2d0f] border-r border-[#cad95e]/20 p-6 overflow-y-auto">
            <div className="space-y-4">
              {currentMenuData.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(index)}
                  className={`w-full text-left p-2 text-xs font-jakarta uppercase tracking-wide transition-colors duration-200 ${
                    expandedCategory === index 
                      ? 'text-[#cad95e] bg-[#1a3d1a]' 
                      : 'text-gray-400 hover:text-[#cad95e]'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-lg">{category.icon}</span>
                    <h1 className="text-xs font-jakarta">{category.title}</h1>
                    {expandedCategory === index && (
                      <ChevronRight className="w-3 h-3 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Content Area */}
          <div className="flex-1 p-8 overflow-y-auto">
            {expandedCategory !== null && currentMenuData[expandedCategory]?.subcategories && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-jakarta text-[#cad95e] uppercase tracking-wide mb-6 text-center">
                  {currentMenuData[expandedCategory].title}
                </h1>
                
                {/* Desktop subcategories */}
                {expandedCategory === 0 && (
                  // Festival NATUR - Two columns
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-lg font-jakarta text-[#cad95e] mb-4 text-center">VIVE NATUR</h2>
                      <ul className="space-y-2">
                        {desktopMenuData[0].subcategories?.slice(0, 5).map((sub, idx) => (
                          <li key={idx}>
                            <button onClick={() => handleSubcategoryClick(sub.url)} className="text-gray-300 hover:text-[#cad95e] text-sm">
                              • {sub.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-lg font-jakarta text-[#cad95e] mb-4 text-center">NATUR PRO</h2>
                      <ul className="space-y-2">
                        {desktopMenuData[0].subcategories?.slice(5).map((sub, idx) => (
                          <li key={idx}>
                            <button onClick={() => handleSubcategoryClick(sub.url)} className="text-gray-300 hover:text-[#cad95e] text-sm">
                              • {sub.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Other categories - Simple list */}
                {expandedCategory !== 0 && (
                  <ul className="space-y-3 max-w-2xl mx-auto">
                    {currentMenuData[expandedCategory].subcategories?.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <button
                          onClick={() => handleSubcategoryClick(sub.url)}
                          className="text-gray-300 hover:text-[#cad95e] transition-colors duration-200 text-left block w-full p-3 border border-[#cad95e]/10 hover:border-[#cad95e]/30 rounded"
                        >
                          • {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Default State */}
            {expandedCategory === null && (
              <div className="flex flex-col justify-center items-center h-full text-center">
                <h2 className="text-3xl font-gasoek text-[#cad95e] mb-4 uppercase tracking-wider">
                  FESTIVAL NATUR 2025
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl">
                  Selecciona una categoría del menú lateral para explorar todas las opciones del festival.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleSubcategoryClick('/tickets')}
                    className="bg-[#cad95e] text-[#0a1a0a] px-6 py-3 font-jakarta-bold uppercase tracking-wide hover:bg-yellow-300 transition-colors"
                  >
                    Boletos
                  </button>
                  <button 
                    onClick={() => handleSubcategoryClick('/agenda')}
                    className="border border-[#cad95e] text-[#cad95e] px-6 py-3 font-jakarta-bold uppercase tracking-wide hover:bg-[#cad95e] hover:text-[#0a1a0a] transition-colors"
                  >
                    Agenda
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}