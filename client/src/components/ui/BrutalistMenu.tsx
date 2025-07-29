import React, { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { BrutalistDropdownMenu } from './BrutalistDropdownMenu';

export function BrutalistMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={toggleMenu}
        className="relative p-3 bg-[#1a3d1a] border-2 border-[#EDFF60] hover:bg-[#EDFF60] hover:text-[#1a3d1a] text-[#EDFF60] transition-all duration-200 group"
        style={{
          boxShadow: '4px 4px 0px #EDFF60'
        }}
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
        <span className="sr-only">Abrir menú</span>
        
        {/* Brutalist accent */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EDFF60] group-hover:bg-[#1a3d1a] transition-colors duration-200"></div>
      </button>

      <BrutalistDropdownMenu 
        isOpen={isMenuOpen}
        onClose={closeMenu}
        triggerRef={triggerRef}
      />
    </>
  );
}