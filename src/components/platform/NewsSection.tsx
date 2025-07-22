
import { Card, CardContent } from "@/components/ui/card";

type NewsCardProps = {
  title: string;
  date: string;
  type: string;
};

const NewsCard = ({ title, date, type }: NewsCardProps) => {
  return (
    <Card className="border border-border bg-card hover:bg-secondary/50 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{date}</p>
            <h3 className="font-medium mt-1">{title}</h3>
            <span className="inline-block mt-2 text-xs bg-accent/20 text-primary px-2 py-0.5 rounded-full">
              {type}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const NewsSection = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Novedades y Actualizaciones</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NewsCard 
          title="Nuevo módulo de certificación disponible" 
          date="Hace 3 días" 
          type="Educación"
        />
        <NewsCard 
          title="Convocatoria para startups sostenibles" 
          date="Hace 1 semana" 
          type="Convocatoria"
        />
        <NewsCard 
          title="Novedades en el marketplace para temporada alta" 
          date="Hace 2 semanas" 
          type="Marketplace"
        />
        <NewsCard 
          title="Evento presencial de networking" 
          date="Próximamente" 
          type="Evento"
        />
      </div>
    </div>
  );
};
