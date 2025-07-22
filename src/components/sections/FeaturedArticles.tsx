import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
type ArticleProps = {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  href: string;
};
const Article = ({
  title,
  description,
  category,
  imageUrl,
  href
}: ArticleProps) => {
  return <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all bg-white">
      <div className="h-48 overflow-hidden">
        <img src={imageUrl} alt={title} className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300" />
      </div>
      <CardHeader className="pt-6">
        <div className="flex items-center mb-2">
          <div className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {category}
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button variant="ghost" className="text-green-700 p-0 hover:text-green-800 hover:bg-transparent">
          Leer más <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>;
};
export const FeaturedArticles = () => {
  const articles: ArticleProps[] = [{
    title: "Turismo Regenerativo en Colombia",
    description: "Descubre cómo el turismo está ayudando a regenerar ecosistemas en Colombia.",
    category: "Sostenibilidad",
    imageUrl: "/lovable-uploads/80daf641-6721-400e-93f3-34619c713948.png",
    href: "#"
  }, {
    title: "Comunidades Locales y Turismo",
    description: "El impacto positivo del turismo consciente en las comunidades locales.",
    category: "Comunidad",
    imageUrl: "/lovable-uploads/356f57cf-e3c6-4ac0-814b-2f37af9a0cc4.png",
    href: "#"
  }, {
    title: "Nuevas Experiencias Certificadas",
    description: "Explora nuestras nuevas experiencias certificadas en turismo sostenible.",
    category: "Experiencias",
    imageUrl: "/lovable-uploads/694d9d9b-d412-40e7-9206-6fffb8a88602.png",
    href: "#"
  }];
  return <div className="w-full">
      
      
      
    </div>;
};