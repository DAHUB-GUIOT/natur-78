import React from "react";
import { Link } from "wouter";
import { Building2, MapPin, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function MainPortals() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Accede a Festival NATUR
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige tu portal de acceso según tu perfil y descubre todas las oportunidades 
            que Festival NATUR tiene para ofrecerte
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Portal Empresas */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Building2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Portal Empresas
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Acceso exclusivo para empresas registradas, emprendimientos e iniciativas. 
                  Gestiona tus experiencias, conecta con la comunidad y haz crecer tu negocio sostenible.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-green-500" />
                  <span>Networking empresarial</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-green-500" />
                  <span>Gestión de experiencias</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Heart className="w-4 h-4 mr-2 text-green-500" />
                  <span>Dashboard empresarial</span>
                </div>
              </div>

              <Link to="/registro">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold">
                  Acceder como Empresa
                </Button>
              </Link>
              
              <p className="text-xs text-gray-500 mt-3">
                ¿Ya tienes cuenta? <Link to="/experiencias" className="text-green-600 hover:underline">Inicia sesión</Link>
              </p>
            </CardContent>
          </Card>

          {/* Con-Sentidos */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <MapPin className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Con-Sentidos
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Portal público para viajeros y exploradores. Descubre experiencias únicas, 
                  conecta con iniciativas locales y vive el turismo regenerativo.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Mapa de experiencias</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Conexión con locales</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Heart className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Turismo consciente</span>
                </div>
              </div>

              <Link to="/mapa">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                  Explorar Con-Sentidos
                </Button>
              </Link>
              
              <p className="text-xs text-gray-500 mt-3">
                Acceso libre para todos los viajeros
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ¿Eres administrador del festival?
          </p>
          <Link to="/admin">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Acceso Administrativo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}