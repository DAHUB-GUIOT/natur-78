
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const testimonialsData = [
  {
    quote: "Acceleradora NATUR nos proporcionó las herramientas y conexiones necesarias para hacer crecer nuestro proyecto de turismo regenerativo. Hoy somos una empresa rentable con impacto positivo.",
    author: "María González",
    company: "EcoViajes Colombia"
  },
  {
    quote: "El programa no solo nos dio acceso a capital, sino a una comunidad comprometida con la sostenibilidad. Los mentores fueron fundamentales para refinar nuestro modelo de negocio.",
    author: "Carlos Ramírez",
    company: "RegenFarms"
  },
  {
    quote: "Participar en la aceleradora nos permitió convertir una idea en un negocio viable. El enfoque en métricas de impacto nos ayudó a construir un proyecto genuinamente regenerativo.",
    author: "Ana Martínez",
    company: "BioHábitat"
  }
];

export const Testimonials = () => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
        <MessageSquare className="mr-2 h-6 w-6 text-green-600" />
        Testimonios de Participantes
      </h2>
      
      <Carousel className="w-full">
        <CarouselContent>
          {testimonialsData.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="text-green-600 text-4xl font-serif mb-4">"</div>
                  <p className="text-gray-600 italic flex-grow">{testimonial.quote}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
