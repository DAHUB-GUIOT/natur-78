
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Network, Link as LinkIcon, Users } from 'lucide-react';

type ArticleCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
};

const ArticleCard = ({ icon: Icon, title, description, iconColor, bgColor }: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden border border-green-100/20 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className={`${bgColor} p-3 rounded-lg w-fit mb-2`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="pt-1">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 pb-4">
        <Button variant="link" className="text-green-700 p-0 hover:text-green-800">
          Leer más <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export const NetworkingArticles = () => {
  const articles: ArticleCardProps[] = [
    {
      icon: Network,
      title: "Networking Efectivo",
      description: "Estrategias para construir relaciones duraderas en el sector del turismo sostenible",
      iconColor: "text-green-700",
      bgColor: "bg-green-100"
    },
    {
      icon: Users,
      title: "Comunidades de Práctica",
      description: "Únete a grupos de trabajo colaborativo por regiones y áreas de especialidad",
      iconColor: "text-green-700",
      bgColor: "bg-green-100"
    },
    {
      icon: LinkIcon,
      title: "Oportunidades de Colaboración",
      description: "Encuentra iniciativas que buscan aliados y proyectos para participar",
      iconColor: "text-green-700",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <div className="bg-white/50 rounded-lg p-6 shadow-sm border border-green-100 my-8">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-green-700">Conexiones Destacadas</h3>
        <Button variant="outline" className="border-green-700 text-green-700">
          Ver Todas
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};
