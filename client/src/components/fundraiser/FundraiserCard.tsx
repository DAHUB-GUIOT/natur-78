
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface FundraiserCardProps {
  campaign: {
    id: string;
    titulo: string;
    imagen: string;
    departamento: string;
    ciudad: string;
    descripcion: string;
    montoActual: number;
    montoObjetivo: number;
    estado: "activa" | "finalizada" | "proxima";
    categoria: string;
    destacado?: "urgente" | "nuevo";
  };
  onContribute: (campaignId: string) => void;
}

export function FundraiserCard({ campaign, onContribute }: FundraiserCardProps) {
  const progress = (campaign.montoActual / campaign.montoObjetivo) * 100;
  
  return (
    <div className="group relative bg-[#212415] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={campaign.imagen}
          alt={campaign.titulo}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {campaign.destacado && (
          <Badge 
            className={`absolute top-2 right-2 ${
              campaign.destacado === "urgente" ? "bg-red-600" : "bg-[#C77B30]"
            }`}
          >
            {campaign.destacado === "urgente" ? "Urgente" : "Nuevo"}
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-1">{campaign.titulo}</h3>
          <p className="text-sm text-[#F5F5F2]/70">
            {campaign.departamento}, {campaign.ciudad}
          </p>
        </div>

        <p className="text-sm text-[#F5F5F2]/90 line-clamp-2">
          {campaign.descripcion}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Recaudado</span>
            <span>{formatCurrency(campaign.montoActual)} / {formatCurrency(campaign.montoObjetivo)}</span>
          </div>
          <Progress value={progress} className="h-2 bg-[#2A2E22]" />
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="capitalize text-[#F5F5F2]">
            {campaign.estado}
          </Badge>
          <Button
            onClick={() => onContribute(campaign.id)}
            className="bg-[#C77B30] hover:bg-[#A65D1E] text-[#F5F5F2]"
          >
            Contribuir
          </Button>
        </div>
      </div>
    </div>
  );
}
