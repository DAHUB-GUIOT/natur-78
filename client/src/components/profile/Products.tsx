
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCategory } from './ProfileHeader';

interface ProductsProps {
  userCategory: UserCategory;
  profileData?: any;
}

export const Products = ({ userCategory, profileData }: ProductsProps) => {
  // Get title based on user category
  const getTitle = () => {
    switch(userCategory) {
      case "sponsor": return "Eventos Patrocinados";
      case "startup": return "Clientes";
      case "ecosystem": 
      case "attendee":
      default: return "Productos Adquiridos";
    }
  };
  
  // Get products/items based on user category
  const getItems = () => {
    switch(userCategory) {
      case "sponsor":
        return [
          { id: 1, name: "NATUR Festival 2023", status: "Completado", date: "Oct 2023" },
          { id: 2, name: "Encuentro Ecoturismo", status: "Próximo", date: "Jun 2024" },
          { id: 3, name: "Conferencia Sostenibilidad", status: "En preparación", date: "Sep 2024" }
        ];
      case "startup":
        return [
          { id: 1, name: "Hotel Las Palmas", status: "Activo", date: "Desde Mar 2023" },
          { id: 2, name: "Parque Ecológico", status: "Activo", date: "Desde Jun 2022" },
          { id: 3, name: "Agencia Viajes Verde", status: "En pruebas", date: "Desde Abr 2024" }
        ];
      case "ecosystem":
      case "attendee":
      default:
        return [
          { id: 1, name: "Canasta Artesanal", status: "Entregado", date: "Feb 2024" },
          { id: 2, name: "Tour Comunidad Local", status: "Reservado", date: "Jun 2024" },
          { id: 3, name: "Guía Sostenibilidad", status: "Digital", date: "Mar 2024" }
        ];
    }
  };
  
  const items = getItems();
  
  return (
    <Card className="border border-green-100 bg-white/80 backdrop-blur-sm shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-green-800">{getTitle()}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="border border-green-100 rounded-lg p-4 bg-white hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <h4 className="text-green-800 font-medium">{item.name}</h4>
                <Badge 
                  className={`
                    ${item.status === "Completado" || item.status === "Activo" || item.status === "Entregado" || item.status === "Digital" ? 
                      "bg-green-100 text-green-800 border-green-300" : 
                      item.status === "Próximo" || item.status === "Reservado" ? 
                      "bg-blue-100 text-blue-800 border-blue-300" : 
                      "bg-amber-100 text-amber-800 border-amber-300"}
                  `}
                >
                  {item.status}
                </Badge>
              </div>
              <p className="text-green-600 text-sm mt-2">{item.date}</p>
              
              {/* Profile-specific data if available */}
              {profileData && userCategory === "startup" && profileData.problemSolved && (
                <p className="text-green-700/70 text-xs mt-3 border-t border-green-100 pt-2">
                  {profileData.problemSolved.substring(0, 100)}...
                </p>
              )}
              
              {profileData && userCategory === "sponsor" && profileData.proposal && (
                <p className="text-green-700/70 text-xs mt-3 border-t border-green-100 pt-2">
                  {profileData.proposal.substring(0, 100)}...
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
