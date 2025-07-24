
import { Calendar, Earth, ArrowRight, Sprout, User, Bell, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type TallerProps = {
  icon: React.ReactNode;
  title: string;
  date: string;
  instructor?: string;
};

const TallerCard = ({
  taller
}: {
  taller: TallerProps;
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex items-center p-4">
        <div className={`p-2 rounded-lg bg-green-100 mr-4`}>
          <div className="text-green-700">{taller.icon}</div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-green-700">{taller.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Calendar size={14} className="mr-1 text-green-700" /> {taller.date}
          </div>
          {taller.instructor && <p className="text-sm text-muted-foreground mt-1">{taller.instructor}</p>}
        </div>
        <Button size="sm" variant="ghost" className="text-green-700">
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  );
};

export const TalleresSection = () => {
  const talleres: TallerProps[] = [
    {
      icon: <Earth size={24} />,
      title: "Ecoturismo y derechos territoriales",
      date: "4 de mayo, 2025 • 16:00-18:00",
      instructor: "Por: Ana Martínez, Red de Anfitriones"
    }, 
    {
      icon: <MapIcon size={24} />,
      title: "Facilitación para autodiagnósticos",
      date: "12 de mayo, 2025 • 15:00-17:30",
      instructor: "Por: Carlos Rodríguez, NATUR Lab"
    }, 
    {
      icon: <Sprout size={24} />,
      title: "Huertas medicinales y autocuidado",
      date: "25 de mayo, 2025 • 09:00-11:00",
      instructor: "Por: María González, Escuela Semilla Viva"
    }
  ];

  return (
    <section>
      <h2 className="text-xl font-gasoek mb-4 text-green-700">
        Talleres en Vivo
      </h2>
      
      <div className="space-y-4">
        {talleres.map((taller, index) => <TallerCard key={index} taller={taller} />)}
      </div>
      
      <div className="mt-6 flex flex-wrap gap-4">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Calendar size={16} className="mr-2" /> 
          Ver calendario completo
        </Button>
        <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
          <Bell size={16} className="mr-2" />
          Suscríbete a las convocatorias
        </Button>
      </div>
    </section>
  );
};
