import React, { useState, useEffect } from 'react';
import { Accessibility, Eye, EyeOff, Contrast, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ContrastMode = 'normal' | 'high' | 'ultra' | 'inverted';
type FontSizeLevel = 'normal' | 'large' | 'extra-large';

interface AccessibilitySettings {
  contrastMode: ContrastMode;
  fontSize: FontSizeLevel;
  reduceMotion: boolean;
  underlineLinks: boolean;
  highFocus: boolean;
}

const defaultSettings: AccessibilitySettings = {
  contrastMode: 'normal',
  fontSize: 'normal',
  reduceMotion: false,
  underlineLinks: false,
  highFocus: false,
};

export function ContrastEnhancer() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }
  }, []);

  // Apply accessibility settings to the document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply contrast mode
    root.className = root.className.replace(/contrast-\w+/g, '');
    if (settings.contrastMode !== 'normal') {
      root.classList.add(`contrast-${settings.contrastMode}`);
    }

    // Apply font size
    root.className = root.className.replace(/font-size-\w+/g, '');
    if (settings.fontSize !== 'normal') {
      root.classList.add(`font-size-${settings.fontSize}`);
    }

    // Apply motion preferences
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Apply link underlines
    if (settings.underlineLinks) {
      root.classList.add('underline-links');
    } else {
      root.classList.remove('underline-links');
    }

    // Apply high focus visibility
    if (settings.highFocus) {
      root.classList.add('high-focus');
    } else {
      root.classList.remove('high-focus');
    }

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-[#cad95e] text-[#0a1a0a] rounded-full shadow-lg hover:bg-[#b8c654] transition-all duration-200 border-2 border-[#0a1a0a] focus:outline-none focus:ring-4 focus:ring-[#cad95e]/50"
        aria-label="Abrir configuración de accesibilidad"
        title="Configuración de Accesibilidad"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 max-w-[calc(100vw-2rem)] bg-[#0a1a0a] border-2 border-[#cad95e] rounded-lg shadow-xl">
          {/* Header */}
          <div className="p-4 border-b border-[#cad95e]/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-jakarta text-[#cad95e] uppercase tracking-wide">
                Accesibilidad
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#cad95e] hover:text-white p-1 rounded"
                aria-label="Cerrar panel de accesibilidad"
              >
                ×
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {/* Contrast Mode */}
            <div>
              <label className="block text-sm font-jakarta text-[#cad95e] mb-2 uppercase tracking-wide">
                Contraste
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'normal', label: 'Normal', icon: Eye },
                  { value: 'high', label: 'Alto', icon: Contrast },
                  { value: 'ultra', label: 'Ultra', icon: EyeOff },
                  { value: 'inverted', label: 'Invertido', icon: Palette },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => updateSetting('contrastMode', value as ContrastMode)}
                    className={`p-2 text-xs rounded border transition-all duration-200 flex items-center gap-2 ${
                      settings.contrastMode === value
                        ? 'bg-[#cad95e] text-[#0a1a0a] border-[#cad95e]'
                        : 'bg-transparent text-[#cad95e] border-[#cad95e]/30 hover:border-[#cad95e]/60'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-jakarta text-[#cad95e] mb-2 uppercase tracking-wide">
                Tamaño de Texto
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'normal', label: 'Normal' },
                  { value: 'large', label: 'Grande' },
                  { value: 'extra-large', label: 'Extra' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateSetting('fontSize', value as FontSizeLevel)}
                    className={`p-2 text-xs rounded border transition-all duration-200 ${
                      settings.fontSize === value
                        ? 'bg-[#cad95e] text-[#0a1a0a] border-[#cad95e]'
                        : 'bg-transparent text-[#cad95e] border-[#cad95e]/30 hover:border-[#cad95e]/60'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-3">
              {[
                {
                  key: 'reduceMotion' as const,
                  label: 'Reducir Animaciones',
                  description: 'Minimiza las animaciones y transiciones',
                },
                {
                  key: 'underlineLinks' as const,
                  label: 'Subrayar Enlaces',
                  description: 'Muestra todos los enlaces subrayados',
                },
                {
                  key: 'highFocus' as const,
                  label: 'Foco Mejorado',
                  description: 'Mejora la visibilidad del foco del teclado',
                },
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-start gap-3">
                  <button
                    onClick={() => updateSetting(key, !settings[key])}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
                      settings[key]
                        ? 'bg-[#cad95e] border-[#cad95e]'
                        : 'bg-transparent border-[#cad95e]/30'
                    }`}
                    aria-checked={settings[key]}
                    role="checkbox"
                  >
                    {settings[key] && (
                      <span className="text-[#0a1a0a] text-xs font-bold">✓</span>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="text-sm font-jakarta text-[#cad95e]">{label}</div>
                    <div className="text-xs text-gray-400">{description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-[#cad95e]/20">
              <Button
                onClick={resetSettings}
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-[#cad95e]/30 text-[#cad95e] hover:bg-[#cad95e] hover:text-[#0a1a0a] transition-all duration-200"
              >
                Restablecer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}