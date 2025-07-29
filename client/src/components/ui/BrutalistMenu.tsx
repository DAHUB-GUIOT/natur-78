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
        className="relative p-3 bg-[#0a1a0a] border-2 border-[#cad95e] hover:bg-[#cad95e] hover:text-[#0a1a0a] text-[#cad95e] transition-all duration-200 group"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
        <span className="sr-only">Abrir menú</span>
        
        {/* Brutalist accent */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#cad95e] group-hover:bg-[#0a1a0a] transition-colors duration-200"></div>
      </button>

      <BrutalistDropdownMenu 
        isOpen={isMenuOpen}
        onClose={closeMenu}
        triggerRef={triggerRef}
      />
    </>
  );
}