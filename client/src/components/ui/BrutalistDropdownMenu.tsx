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
    title: 'NATUR Bogotá 2025',
    subcategories: [
      { label: 'VIVE NATUR', url: '/vive-natur' },
      { label: 'Charlas NATUR', url: '/charlas' },
      { label: 'Rooftop + Comidas', url: '/rooftop' },
      { label: 'Emprendimientos', url: '/emprendimientos' },
      { label: 'Zona Chill', url: '/zona-chill' },
      { label: 'Foro Colombia Sostenible', url: '/foro' },
      { label: 'Zona Kinder', url: '/zona-kinder' }
    ]
  },
  {
    icon: '🎯',
    title: 'NATUR PRO',
    subcategories: [
      { label: 'Cartel de Artistas', url: '/artistas' },
      { label: 'Talleres', url: '/talleres' },
      { label: 'Zona Startups', url: '/startups' },
      { label: 'Coffee Talks', url: '/coffee-talks' },
      { label: 'Rumba', url: '/rumba' },
      { label: 'Zona Wellness', url: '/wellness' },
      { label: 'Experiencia NATUR', url: '/experiencia' },
      { label: 'Zona VIP', url: '/vip' }
    ]
  },
  {
    icon: '📰',
    title: 'Noticias',
    subcategories: [
      { label: 'Crónicas', url: '/cronicas' },
      { label: 'Artículos', url: '/articulos' },
      { label: 'Novedades', url: '/novedades' }
    ]
  },
  {
    icon: '🧭',
    title: 'Plataforma NATUR',
    subcategories: [
      { label: 'Comunidad de Viajeros', url: '/portal-viajeros' },
      { label: 'Portal de Empresas', url: '/portal-empresas' },
      { label: 'Mapa de Experiencias', url: '/mapa' }
    ]
  },
  {
    icon: 'ℹ️',
    title: 'Info',
    subcategories: [
      { label: 'Sobre NATUR', url: '/sobre' },
      { label: 'Contacto', url: '/contacto' },
      { label: 'FAQ', url: '/faq' },
      { label: 'Alianzas', url: '/alianzas' }
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
            <div className="grid grid-cols-3 gap-6 h-full">
              {/* Pro Column */}
              <div>
                <h3 className="text-xl font-jakarta-bold text-[#EDFF60] uppercase tracking-wider mb-6">
                  Pro
                </h3>
                <ul className="space-y-3">
                  {menuData[expandedCategory].subcategories?.slice(0, Math.ceil(menuData[expandedCategory].subcategories!.length / 3)).map((sub, subIndex) => (
                    <li key={subIndex}>
                      <button
                        onClick={() => handleSubcategoryClick(sub.url)}
                        className="text-gray-300 hover:text-[#EDFF60] transition-colors duration-200 text-left block"
                      >
                        • {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Live Column */}
              <div>
                <h3 className="text-xl font-jakarta-bold text-[#EDFF60] uppercase tracking-wider mb-6">
                  Live
                </h3>
                <ul className="space-y-3">
                  {menuData[expandedCategory].subcategories?.slice(Math.ceil(menuData[expandedCategory].subcategories!.length / 3), Math.ceil(menuData[expandedCategory].subcategories!.length * 2 / 3)).map((sub, subIndex) => (
                    <li key={subIndex}>
                      <button
                        onClick={() => handleSubcategoryClick(sub.url)}
                        className="text-gray-300 hover:text-[#EDFF60] transition-colors duration-200 text-left block"
                      >
                        • {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info Column */}
              <div>
                <h3 className="text-xl font-jakarta-bold text-[#EDFF60] uppercase tracking-wider mb-6">
                  Info
                </h3>
                <ul className="space-y-3">
                  {menuData[expandedCategory].subcategories?.slice(Math.ceil(menuData[expandedCategory].subcategories!.length * 2 / 3)).map((sub, subIndex) => (
                    <li key={subIndex}>
                      <button
                        onClick={() => handleSubcategoryClick(sub.url)}
                        className="text-gray-300 hover:text-[#EDFF60] transition-colors duration-200 text-left block"
                      >
                        • {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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

        {/* Right Sidebar - Additional Info */}
        <div className="w-1/4 bg-[#0f2d0f] border-l border-[#EDFF60]/20 p-6">
          <div className="space-y-6">
            <button className="w-full bg-[#EDFF60] text-[#0a1a0a] py-3 px-4 font-jakarta-bold uppercase tracking-wide text-sm hover:bg-yellow-300 transition-colors">
              🎫 TICKETS
            </button>
            <button className="w-full border border-[#EDFF60] text-[#EDFF60] py-3 px-4 font-jakarta-bold uppercase tracking-wide text-sm hover:bg-[#EDFF60] hover:text-[#0a1a0a] transition-colors">
              📅 AGENDA
            </button>
            
            <div className="pt-6 border-t border-[#EDFF60]/20">
              <h4 className="text-[#EDFF60] font-jakarta-bold uppercase tracking-wider mb-4">
                Destacados
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• The Space</li>
                <li>• Partners</li>
                <li>• The Music Club</li>
                <li>• Networking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}