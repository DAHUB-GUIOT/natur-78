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
      className="fixed inset-0 z-50 bg-[#0a1a0a] text-[#cad95e] transform transition-all duration-300 ease-out"
      data-state={isOpen ? 'open' : 'closed'}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#cad95e]/20">
        <h1 className="text-4xl font-gasoek text-[#cad95e] tracking-wider">NATUR</h1>
        <button 
          onClick={onClose}
          className="text-[#cad95e] hover:text-white text-2xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Menu Content - BIME Style Layout */}
      <div className="flex h-full">
        {/* Left Sidebar - Main Categories */}
        <div className="w-1/4 bg-[#0f2d0f] border-r border-[#cad95e]/20 p-6">
          <div className="space-y-4">
            {menuData.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(index)}
                className={`w-full text-left p-2 text-sm font-jakarta uppercase tracking-wide transition-colors duration-200 ${
                  expandedCategory === index 
                    ? 'text-[#cad95e] bg-[#1a3d1a]' 
                    : 'text-gray-400 hover:text-[#cad95e]'
                }`}
              >
                <div className="flex items-center gap-2">
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

        {/* Full Width Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {expandedCategory !== null && (
            <>
              {/* Festival Category - Two Column Layout */}
              {expandedCategory === 0 && (
                <div className="grid grid-cols-2 gap-8 h-full max-w-6xl mx-auto">
                  {/* VIVE NATUR Column */}
                  <div>
                    <h1 className="text-lg font-jakarta text-[#cad95e] px-3 py-1 uppercase tracking-wide mb-4 text-center">
                      VIVE NATUR
                    </h1>
                    <ul className="space-y-2">
                      {menuData[expandedCategory].subcategories?.slice(0, 5).map((sub, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => handleSubcategoryClick(sub.url)}
                            className="text-gray-300 hover:text-[#cad95e] transition-colors duration-200 text-left block w-full text-sm font-light"
                          >
                            • {sub.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* NATUR PRO Column */}
                  <div>
                    <h1 className="text-lg font-jakarta text-[#cad95e] px-3 py-1 uppercase tracking-wide mb-4 text-center">
                      NATUR PRO
                    </h1>
                    <ul className="space-y-2">
                      {menuData[expandedCategory].subcategories?.slice(5).map((sub, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => handleSubcategoryClick(sub.url)}
                            className="text-gray-300 hover:text-[#cad95e] transition-colors duration-200 text-left block w-full text-sm font-light"
                          >
                            • {sub.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* NOTICIAS Category - 3 Article Cards */}
              {expandedCategory === 1 && (
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-2xl font-jakarta text-[#cad95e] uppercase tracking-wide mb-6 text-center">
                    NOTICIAS
                  </h1>
                  <div className="grid grid-cols-3 gap-6">
                    {menuData[expandedCategory].subcategories?.map((article, articleIndex) => (
                      <div key={articleIndex} className="bg-[#0f2d0f] border border-[#cad95e]/20 p-6 hover:border-[#cad95e]/40 transition-colors duration-200 rounded-lg">
                        <button
                          onClick={() => handleSubcategoryClick(article.url)}
                          className="text-left block w-full"
                        >
                          <div className="text-3xl mb-4 text-center">📰</div>
                          <h3 className="text-[#cad95e] text-sm font-jakarta mb-3 leading-relaxed">{article.label}</h3>
                          <p className="text-gray-300 text-xs font-light">Descubre las últimas tendencias y noticias del turismo regenerativo en Colombia...</p>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PLATAFORMA NATUR Category - 3 Platform Cards */}
              {expandedCategory === 2 && (
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-2xl font-jakarta text-[#cad95e] uppercase tracking-wide mb-6 text-center">
                    PLATAFORMA NATUR
                  </h1>
                  <div className="grid grid-cols-3 gap-6">
                    {menuData[expandedCategory].subcategories?.map((platform, platformIndex) => (
                      <div key={platformIndex} className="bg-[#0f2d0f] border border-[#cad95e]/20 p-8 hover:border-[#cad95e]/40 transition-colors duration-200 text-center rounded-lg">
                        <button
                          onClick={() => handleSubcategoryClick(platform.url)}
                          className="block w-full"
                        >
                          <div className="text-4xl mb-4">
                            {platformIndex === 0 && '🏢'}
                            {platformIndex === 1 && '🧭'}
                            {platformIndex === 2 && '🗺️'}
                          </div>
                          <h3 className="text-[#cad95e] text-lg font-jakarta mb-3">{platform.label}</h3>
                          <p className="text-gray-300 text-sm font-light">
                            {platformIndex === 0 && 'Conecta con empresas sostenibles y descubre oportunidades de negocio'}
                            {platformIndex === 1 && 'Descubre experiencias auténticas y conecta con comunidades locales'}
                            {platformIndex === 2 && 'Explora destinos regenerativos y planifica tu viaje consciente'}
                          </p>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INFO Category - Single Column Layout */}
              {expandedCategory === 3 && (
                <div className="max-w-2xl mx-auto">
                  <h1 className="text-2xl font-jakarta text-[#cad95e] uppercase tracking-wide mb-6 text-center">
                    {menuData[expandedCategory].title}
                  </h1>
                  <ul className="space-y-3 grid grid-cols-1 gap-3">
                    {menuData[expandedCategory].subcategories?.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <button
                          onClick={() => handleSubcategoryClick(sub.url)}
                          className="text-gray-300 hover:text-[#cad95e] transition-colors duration-200 text-left block text-base font-light w-full p-3 border border-[#cad95e]/10 hover:border-[#cad95e]/30 rounded"
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
              <h2 className="text-3xl font-gasoek text-[#cad95e] mb-4 uppercase tracking-wider">
                FESTIVAL NATUR 2025
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl">
                Selecciona una categoría del menú lateral para explorar todas las opciones del festival de turismo sostenible más importante de Colombia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#cad95e] text-[#0a1a0a] px-6 py-3 font-jakarta-bold uppercase tracking-wide hover:bg-yellow-300 transition-colors">
                  Boletos
                </button>
                <button className="border border-[#cad95e] text-[#cad95e] px-6 py-3 font-jakarta-bold uppercase tracking-wide hover:bg-[#cad95e] hover:text-[#0a1a0a] transition-colors">
                  Agenda
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}