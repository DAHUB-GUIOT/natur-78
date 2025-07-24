
import { FundraiserCard } from "./FundraiserCard";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockCampaigns = [
  {
    id: "1",
    titulo: "Conservación de la Selva del Darién",
    imagen: "/placeholder.svg",
    departamento: "Chocó",
    ciudad: "Acandí",
    descripcion: "Proyecto para proteger la biodiversidad y comunidades locales en el Darién.",
    montoActual: 15000000,
    montoObjetivo: 50000000,
    estado: "activa",
    categoria: "conservacion",
    destacado: "urgente",
  },
  {
    id: "2",
    titulo: "Ecoturismo en Sierra Nevada",
    imagen: "/placeholder.svg",
    departamento: "Magdalena",
    ciudad: "Santa Marta",
    descripcion: "Desarrollo de rutas ecoturísticas con comunidades indígenas.",
    montoActual: 25000000,
    montoObjetivo: 30000000,
    estado: "activa",
    categoria: "cultura",
    destacado: "nuevo",
  },
] as const;

interface FundraiserGridProps {
  searchQuery: string;
  activeFilters: {
    categoria: string[];
    departamento: string[];
    ciudad: string[];
    estado: string[];
  };
}

export function FundraiserGrid({ searchQuery, activeFilters }: FundraiserGridProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  const handleContribute = (campaignId: string) => {
    setSelectedCampaign(campaignId);
  };

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    if (
      searchQuery &&
      !campaign.titulo.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !campaign.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (
      activeFilters.categoria.length > 0 &&
      !activeFilters.categoria.includes(campaign.categoria)
    ) {
      return false;
    }

    if (
      activeFilters.estado.length > 0 &&
      !activeFilters.estado.includes(campaign.estado)
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredCampaigns.map((campaign) => (
          <FundraiserCard
            key={campaign.id}
            campaign={campaign}
            onContribute={handleContribute}
          />
        ))}
      </div>

      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="bg-[#212415] text-[#F5F5F2]">
          <DialogHeader>
            <DialogTitle>Realizar contribución</DialogTitle>
            <DialogDescription className="text-[#F5F5F2]/70">
              Ingresa el monto que deseas donar a este proyecto
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Monto en COP"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-[#2A2E22] border-[#F5F5F2]/10"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedCampaign(null)}
                className="flex-1 border-[#F5F5F2]/10"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  // Handle contribution
                  setSelectedCampaign(null);
                }}
                className="flex-1 bg-[#C77B30] hover:bg-[#A65D1E]"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
