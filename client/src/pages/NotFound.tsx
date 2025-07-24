import { useLocation, Link } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, MapPin, Building2, User } from "lucide-react";

const NotFound = () => {
  const [location] = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location
    );
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-gray-400 mb-8">
          <div className="text-8xl font-bold mb-4 text-gray-200">404</div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h1>
        
        <p className="text-gray-600 mb-8">
          La página que buscas no existe o ha sido movida. Te sugerimos que explores estas opciones:
        </p>

        <div className="grid gap-3 mb-8">
          <Link to="/">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Button>
          </Link>
          
          <Link to="/mapa">
            <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
              <MapPin className="mr-2 h-4 w-4" />
              Explorar experiencias
            </Button>
          </Link>
          
          <Link to="/registro">
            <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
              <Building2 className="mr-2 h-4 w-4" />
              Registrar tu empresa
            </Button>
          </Link>
          
          <Link to="/perfil">
            <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50">
              <User className="mr-2 h-4 w-4" />
              Ir a mi perfil
            </Button>
          </Link>
        </div>

        <div className="text-sm text-gray-500">
          <p>Si el problema persiste, puedes contactarnos:</p>
          <p className="mt-2">
            <strong>Ruta solicitada:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-xs">{location}</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
