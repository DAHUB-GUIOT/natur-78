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
      className="fixed top-16 left-4 z-50 w-80 bg-[#1a3d1a] border-4 border-[#EDFF60] shadow-2xl transform transition-all duration-300 ease-out"
      style={{
        boxShadow: '8px 8px 0px #EDFF60, 16px 16px 0px rgba(237, 255, 96, 0.3)'
      }}
      data-state={isOpen ? 'open' : 'closed'}
    >
      {/* Header */}
      <div className="bg-[#0f2d0f] border-b-4 border-[#EDFF60] p-4">
        <h2 className="text-[#EDFF60] font-unbounded-medium text-lg uppercase tracking-wider">
          MENÚ NATUR
        </h2>
      </div>

      {/* Menu Items */}
      <div className="max-h-96 overflow-y-auto">
        {menuData.map((category, index) => (
          <div key={index} className="border-b-2 border-[#2d5d2d]">
            <button
              onClick={() => handleCategoryClick(index)}
              className="w-full flex items-center justify-between p-4 bg-[#1a3d1a] hover:bg-[#2d5d2d] transition-colors duration-200 text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{category.icon}</span>
                <span className="text-[#EDFF60] font-jakarta-bold text-sm uppercase tracking-wide group-hover:text-white transition-colors">
                  {category.title}
                </span>
              </div>
              {category.subcategories && (
                <ChevronRight 
                  className={`w-5 h-5 text-[#EDFF60] transition-transform duration-200 ${
                    expandedCategory === index ? 'rotate-90' : ''
                  }`}
                />
              )}
            </button>

            {/* Subcategories */}
            {category.subcategories && expandedCategory === index && (
              <div 
                className="bg-[#0f2d0f] border-t-2 border-[#2d5d2d] overflow-hidden"
                data-state="expanded"
              >
                <div className="grid grid-cols-2 gap-1 p-2">
                  {category.subcategories.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubcategoryClick(sub.url)}
                      className="p-3 bg-[#1a3d1a] hover:bg-[#EDFF60] hover:text-[#0f2d0f] text-[#EDFF60] font-jakarta text-xs uppercase tracking-wide transition-all duration-200 border border-[#2d5d2d] hover:border-[#EDFF60] hover:shadow-md"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-[#0f2d0f] border-t-4 border-[#EDFF60] p-3 text-center">
        <span className="text-[#EDFF60] font-jakarta text-xs opacity-70">
          Festival NATUR 2025
        </span>
      </div>


    </div>
  );
}