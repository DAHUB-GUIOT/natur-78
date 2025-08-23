# Festival NATUR - Main Pages Export

## 📁 Estructura de Archivos del Export Manual

```
festival-natur/
├── package.json                    # ✅ En EXPORT-MANUAL.md
├── tsconfig.json                   # ✅ En EXPORT-MANUAL.md  
├── vite.config.ts                  # ✅ En EXPORT-MANUAL.md
├── tailwind.config.ts              # ✅ En EXPORT-MANUAL.md
├── drizzle.config.ts               # ✅ En EXPORT-MANUAL.md
├── .env                            # ✅ En EXPORT-MANUAL.md
├── shared/
│   └── schema.ts                   # ✅ En EXPORT-BACKEND.md
├── server/
│   ├── index.ts                    # ✅ En EXPORT-BACKEND.md
│   ├── db.ts                       # ✅ En EXPORT-BACKEND.md
│   ├── storage.ts                  # ✅ En EXPORT-FRONTEND.md
│   ├── routes.ts                   # 📄 Archivo grande - ver servidor actual
│   ├── emailService.ts             # 📄 Ver servidor actual
│   └── googleAuth.ts               # 📄 Ver servidor actual
├── client/
│   ├── src/
│   │   ├── App.tsx                 # ✅ En EXPORT-FRONTEND.md
│   │   ├── index.css               # ✅ En EXPORT-FRONTEND.md
│   │   ├── main.tsx                # 👇 Crear ahora
│   │   ├── pages/
│   │   │   ├── Index.tsx           # 👇 Homepage
│   │   │   ├── MinimalistPortalEmpresas.tsx # 👇 Portal Empresas
│   │   │   ├── PortalViajerosNew.tsx # 👇 Portal Viajeros
│   │   │   ├── PortalEmpresasAuth.tsx # 👇 Auth Empresas
│   │   │   └── AuthViajeros.tsx    # 👇 Auth Viajeros
│   │   ├── components/             # 👇 Componentes UI
│   │   ├── hooks/                  # 👇 Custom hooks
│   │   └── lib/                    # 👇 Utilidades
└── README.md                       # ✅ Creado

```

## 📁 client/src/main.tsx

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

## 📁 client/src/pages/Index.tsx (Homepage)

```typescript
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, MapPin, Users, Calendar, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'wouter';

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/api/placeholder/1200/600?text=Festival+NATUR+2025',
    '/api/placeholder/1200/600?text=Turismo+Sostenible',
    '/api/placeholder/1200/600?text=Biodiversidad+Colombia'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const HeaderButtons = () => (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
      <Link href="/portal-empresas/auth">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          Portal Empresas
        </Button>
      </Link>
      <Link href="/portal-viajeros/auth">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          Portal Viajeros
        </Button>
      </Link>
      <Link href="/tickets">
        <Button 
          className="w-full sm:w-auto bg-[#CAD95E] text-black hover:bg-[#b8c755] transition-all duration-300 font-semibold"
        >
          Comprar Tickets
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-gasoek tracking-wider">
                NATUR
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/agenda" className="text-white hover:text-[#CAD95E] transition-colors">
                Agenda
              </Link>
              <Link href="/noticias" className="text-white hover:text-[#CAD95E] transition-colors">
                Noticias
              </Link>
              <Link href="/acerca" className="text-white hover:text-[#CAD95E] transition-colors">
                Acerca
              </Link>
              <Link href="/contacto" className="text-white hover:text-[#CAD95E] transition-colors">
                Contacto
              </Link>
              <HeaderButtons />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
              >
                <div className="flex flex-col space-y-4">
                  <Link 
                    href="/agenda" 
                    className="text-white hover:text-[#CAD95E] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agenda
                  </Link>
                  <Link 
                    href="/noticias" 
                    className="text-white hover:text-[#CAD95E] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Noticias
                  </Link>
                  <Link 
                    href="/acerca" 
                    className="text-white hover:text-[#CAD95E] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Acerca
                  </Link>
                  <Link 
                    href="/contacto" 
                    className="text-white hover:text-[#CAD95E] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contacto
                  </Link>
                  <div className="pt-2">
                    <HeaderButtons />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1 }}
            />
          ))}
        </div>

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-gasoek mb-6 text-shadow"
          >
            Festival NATUR
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl mb-8 font-light"
          >
            Conectando el turismo sostenible con la biodiversidad de Colombia
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/portal-empresas/auth">
              <Button 
                size="lg"
                className="bg-[#CAD95E] text-black hover:bg-[#b8c755] transition-all duration-300 text-lg px-8 py-3 font-semibold"
              >
                Soy Empresa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portal-viajeros/auth">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-lg px-8 py-3"
              >
                Soy Viajero
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm">Descubre más</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              Ecosistema Completo de Turismo Sostenible
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Una plataforma integral que conecta empresas, viajeros y experiencias auténticas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="h-12 w-12 text-[#CAD95E]" />,
                title: "Portal Empresas",
                description: "Gestiona tu negocio turístico sostenible con herramientas avanzadas"
              },
              {
                icon: <MapPin className="h-12 w-12 text-[#CAD95E]" />,
                title: "Portal Viajeros",
                description: "Descubre experiencias auténticas y viaja con propósito"
              },
              {
                icon: <Users className="h-12 w-12 text-[#CAD95E]" />,
                title: "Networking",
                description: "Conecta con otros profesionales del turismo sostenible"
              },
              {
                icon: <Calendar className="h-12 w-12 text-[#CAD95E]" />,
                title: "Eventos",
                description: "Participa en conferencias, talleres y experiencias educativas"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para formar parte del cambio?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a la comunidad más grande de turismo sostenible en Colombia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portal-empresas/auth">
                <Button 
                  size="lg"
                  className="bg-[#CAD95E] text-black hover:bg-[#b8c755] transition-all duration-300 text-lg px-8 py-3 font-semibold"
                >
                  Registra tu Empresa
                </Button>
              </Link>
              <Link href="/tickets">
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-lg px-8 py-3"
                >
                  Comprar Tickets Festival
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold font-gasoek mb-4">NATUR</h3>
              <p className="text-gray-400">
                Festival de Turismo Sostenible y Biodiversidad de Colombia
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2">
                <li><Link href="/portal-empresas" className="text-gray-400 hover:text-[#CAD95E] transition-colors">Portal Empresas</Link></li>
                <li><Link href="/portal-viajeros" className="text-gray-400 hover:text-[#CAD95E] transition-colors">Portal Viajeros</Link></li>
                <li><Link href="/marketplace" className="text-gray-400 hover:text-[#CAD95E] transition-colors">Marketplace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Evento</h4>
              <ul className="space-y-2">
                <li><Link href="/agenda" className="text-gray-400 hover:text-[#CAD95E] transition-colors">Agenda</Link></li>
                <li><Link href="/tickets" className="text-gray-400 hover:text-[#CAD95E] transition-colors">Tickets</Link></li>
                <li><Link href="/noticias" className="text-gray-400 hover:text-[#CAD95E] transition-colors">Noticias</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li><Link href="/acerca" className="text-gray-400 hover:text-[#CAD95E] transition-colors">Acerca de</Link></li>
                <li><Link href="/contacto" className="text-gray-400 hover:text-[#CAD95E] transition-colors">Contacto</Link></li>
                <li><Link href="/servicios" className="text-gray-400 hover:text-[#CAD95E] transition-colors">Servicios</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Festival NATUR. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

¿Continúo con las páginas principales de los portales (MinimalistPortalEmpresas.tsx, PortalViajerosNew.tsx, etc.)?