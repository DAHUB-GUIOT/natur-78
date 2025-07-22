
import { BookOpen, Download, Eye, Users, Map as MapIcon, Sprout } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GuiaProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  modules: {
    icon: React.ReactNode;
    text: string;
  }[];
  authors: string;
  audience: string;
};

const GuideCard = ({ guide }: { guide: GuiaProps }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border border-green-100">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-100 text-green-700">
            {guide.icon}
          </div>
          <div>
            <CardTitle className="text-xl text-green-700">{guide.title}</CardTitle>
            <CardDescription>{guide.subtitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {guide.modules.map((module, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="text-green-600 mt-1">{module.icon}</div>
              <span className="text-foreground/90">{module.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t border-green-100 bg-green-50">
        <div className="w-full flex flex-wrap gap-2 justify-center pt-4">
          <Button variant="outline" size="sm" className="gap-1 bg-white text-green-700 border-green-700 hover:bg-green-50">
            <Download size={16} />
            Descargar PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-1 bg-white text-green-700 border-green-700 hover:bg-green-50">
            <Eye size={16} />
            Ver en línea
          </Button>
        </div>
        <div className="w-full text-sm text-muted-foreground pt-2">
          <p><span className="font-medium text-green-700">Autores:</span> {guide.authors}</p>
          <p><span className="font-medium text-green-700">Ideal para:</span> {guide.audience}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export const GuiasDestacadasSection = () => {
  const guides: GuiaProps[] = [
    {
      icon: <Users size={24} />,
      title: "Turismo Regenerativo en Territorios Rurales",
      subtitle: "Cómo crear experiencias auténticas que respeten la biodiversidad, empoderen comunidades y generen ingresos sostenibles.",
      modules: [
        { icon: <BookOpen size={18} />, text: "Módulo 1: Principios y diferencias con ecoturismo" },
        { icon: <Users size={18} />, text: "Módulo 2: Relación con comunidades locales" },
        { icon: <Sprout size={18} />, text: "Módulo 3: Diseño de experiencias regenerativas" },
      ],
      authors: "Colectivo NATUR + Red de Anfitriones de la Sierra",
      audience: "Anfitriones, ONGs, emprendedores rurales",
    },
    {
      icon: <MapIcon size={24} />,
      title: "Autodiagnóstico Territorial Participativo",
      subtitle: "Herramienta colaborativa para mapear necesidades, sueños, actores y oportunidades en tu comunidad.",
      modules: [
        { icon: <MapIcon size={18} />, text: "Paso a paso para aplicar la herramienta" },
        { icon: <Users size={18} />, text: "Dinámicas para grupos comunitarios" },
        { icon: <BookOpen size={18} />, text: "Ejemplo práctico (ver caso Chocó)" },
      ],
      authors: "Fundación RAIS + NATUR Lab",
      audience: "Líderes comunitarios, ONGs, redes locales",
    },
    {
      icon: <Sprout size={24} />,
      title: "Agroecología desde la Raíz",
      subtitle: "Manual práctico para iniciar o fortalecer una huerta agroecológica regenerativa.",
      modules: [
        { icon: <Sprout size={18} />, text: "Preparación del suelo sin químicos" },
        { icon: <Sprout size={18} />, text: "Asociación de cultivos y biodiversidad" },
        { icon: <BookOpen size={18} />, text: "Biofertilizantes y cuidado ecológico" },
      ],
      authors: "Escuela Semilla Viva + Aliados NATUR",
      audience: "Familias campesinas, jóvenes rurales",
    },
  ];

  return (
    <section className="py-6">
      <h2 className="text-xl font-gasoek mb-4 text-green-700">
        Guías destacadas
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <GuideCard key={index} guide={guide} />
        ))}
      </div>
    </section>
  );
};
