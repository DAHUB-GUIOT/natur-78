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

const menuData: MenuCategory[] = [
  {
    icon: '🌿',
    title: 'FESTIVAL NATUR BOGOTÁ 2025',
    subcategories: [
      // VIVE NATUR
      { label: 'VIVE NATUR', url: '/vive-natur' },
      { label: 'Charlas NATUR (Agenda Académica)', url: '/charlas' },
      { label: 'Rooftop + Zona de Comidas', url: '/rooftop' },
      { label: 'Emprendimientos Sostenibles', url: '/emprendimientos' },
      { label: 'Zona Chill', url: '/zona-chill' },
      { label: 'Foro Colombia Sostenible 2025', url: '/foro' },
      { label: 'Zona Kinder & Coffee Party', url: '/zona-kinder' },
      // NATUR PRO
      { label: 'NATUR PRO', url: '/natur-pro' },
      { label: 'Cartel de Artistas', url: '/artistas' },
      { label: 'Talleres', url: '/talleres' },
      { label: 'Zona Startups', url: '/startups' },
      { label: 'Coffee Talks / Speed Talks', url: '/coffee-talks' },
      { label: 'Rumba y Manifestaciones', url: '/rumba' },
      { label: 'Zona Wellness', url: '/wellness' },
      { label: 'Experiencia NATUR', url: '/experiencia' },
      { label: 'Zona VIP', url: '/vip' }
    ]
  },
  {
    icon: '📰',
    title: 'NOTICIAS',
    subcategories: [
      { label: 'Artículos', url: '/blog/articulos' },
      { label: 'Crónicas', url: '/blog/cronicas' },
      { label: 'Entrevistas', url: '/blog/entrevistas' },
      { label: 'Novedades del Turismo Regenerativo', url: '/blog/novedades' }
    ]
  },
  {
    icon: '🧭',
    title: 'PLATAFORMA NATUR',
    subcategories: [
      { label: 'Portal de Empresas', url: '/portal-empresas' },
      { label: 'Comunidad de Viajeros', url: '/portal-viajeros' },
      { label: 'Mapa Interactivo de Experiencias', url: '/mapa' }
    ]
  },
  {
    icon: 'ℹ️',
    title: 'INFO',
    subcategories: [
      { label: 'Sobre Nosotros', url: '/sobre' },
      { label: 'Contacto', url: '/contacto' },
      { label: 'Aliados', url: '/aliados' },
      { label: 'Preguntas Frecuentes', url: '/faq' },
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
  const menuRef = useRef<HTMLDivElement>(null);

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
      className="fixed inset-0 z-50 bg-[#0a1a0a] text-[#EDFF60] transform transition-all duration-300 ease-out"
      data-state={isOpen ? 'open' : 'closed'}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#EDFF60]/20">
        <h1 className="text-4xl font-gasoek text-[#EDFF60] tracking-wider">NATUR</h1>
        <button 
          onClick={onClose}
          className="text-[#EDFF60] hover:text-white text-2xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Menu Content - BIME Style Layout */}
      <div className="flex h-full">
        {/* Left Sidebar - Main Categories */}
        <div className="w-1/4 bg-[#0f2d0f] border-r border-[#EDFF60]/20 p-6">
          <div className="space-y-4">
            {menuData.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(index)}
                className={`w-full text-left p-3 text-lg font-jakarta-bold uppercase tracking-wider transition-colors duration-200 ${
                  expandedCategory === index 
                    ? 'text-[#EDFF60] bg-[#1a3d1a]' 
                    : 'text-gray-400 hover:text-[#EDFF60]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.title}</span>
                  {expandedCategory === index && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center Content - Subcategories */}
        <div className="flex-1 p-6">
          {expandedCategory !== null && menuData[expandedCategory]?.subcategories && (
            <>
              {/* Festival NATUR Layout - Special Pro/Live columns */}
              {expandedCategory === 0 && (
                <div className="grid grid-cols-2 gap-8 h-full">
                  {/* VIVE NATUR (Pro) Column */}
                  <div>
                    <h3 className="text-2xl font-jakarta-bold text-[#EDFF60] bg-[#EDFF60] text-[#0a1a0a] px-4 py-2 uppercase tracking-wider mb-6 text-center">
                      VIVE NATUR
                    </h3>
                    <ul className="space-y-3">
                      {menuData[expandedCategory].subcategories?.slice(0, 8).map((sub, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => handleSubcategoryClick(sub.url)}
                            className="text-gray-300 hover:text-[#EDFF60] transition-colors duration-200 text-left block w-full"
                          >
                            • {sub.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* NATUR PRO (Live) Column */}
                  <div>
                    <h3 className="text-2xl font-jakarta-bold text-[#EDFF60] bg-[#EDFF60] text-[#0a1a0a] px-4 py-2 uppercase tracking-wider mb-6 text-center">
                      NATUR PRO
                    </h3>
                    <ul className="space-y-3">
                      {menuData[expandedCategory].subcategories?.slice(8).map((sub, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => handleSubcategoryClick(sub.url)}
                            className="text-gray-300 hover:text-[#EDFF60] transition-colors duration-200 text-left block w-full"
                          >
                            • {sub.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Other Categories - Single Column Layout */}
              {expandedCategory !== 0 && (
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-jakarta-bold text-[#EDFF60] uppercase tracking-wider mb-6">
                    {menuData[expandedCategory].title}
                  </h3>
                  <ul className="space-y-4 grid grid-cols-1 gap-3">
                    {menuData[expandedCategory].subcategories?.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <button
                          onClick={() => handleSubcategoryClick(sub.url)}
                          className="text-gray-300 hover:text-[#EDFF60] transition-colors duration-200 text-left block text-lg"
                        >
                          • {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Default State - Show Main Menu */}
          {expandedCategory === null && (
            <div className="flex flex-col justify-center items-center h-full text-center">
              <h2 className="text-3xl font-gasoek text-[#EDFF60] mb-4 uppercase tracking-wider">
                FESTIVAL NATUR 2025
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl">
                Selecciona una categoría del menú lateral para explorar todas las opciones del festival de turismo sostenible más importante de Colombia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#EDFF60] text-[#0a1a0a] px-6 py-3 font-jakarta-bold uppercase tracking-wide hover:bg-yellow-300 transition-colors">
                  Boletos
                </button>
                <button className="border border-[#EDFF60] text-[#EDFF60] px-6 py-3 font-jakarta-bold uppercase tracking-wide hover:bg-[#EDFF60] hover:text-[#0a1a0a] transition-colors">
                  Agenda
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Info Section */}
        <div className="w-1/4 bg-[#0f2d0f] border-l border-[#EDFF60]/20 p-6">
          <div className="space-y-6">
            {/* Festival Buttons - Only show for Festival category */}
            {expandedCategory === 0 && (
              <>
                <button className="w-full bg-[#EDFF60] text-[#0a1a0a] py-3 px-4 font-jakarta-bold uppercase tracking-wide text-sm hover:bg-yellow-300 transition-colors">
                  🎫 TICKETS
                </button>
                <button className="w-full border border-[#EDFF60] text-[#EDFF60] py-3 px-4 font-jakarta-bold uppercase tracking-wide text-sm hover:bg-[#EDFF60] hover:text-[#0a1a0a] transition-colors">
                  📅 AGENDA
                </button>
                <div className="border-t border-[#EDFF60]/20 pt-6"></div>
              </>
            )}
            
            
          </div>
        </div>
      </div>

    </div>
  );
}