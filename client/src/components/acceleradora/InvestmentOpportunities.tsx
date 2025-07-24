
import { Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const investmentOpportunitiesData = [
  {
    title: "Fondo Verde NATUR",
    description: "Invierte en una cartera diversificada de startups sostenibles en etapas tempranas con retornos financieros y de impacto.",
    minimumInvestment: "$10,000 USD"
  },
  {
    title: "Club de Inversionistas Ángeles",
    description: "Únete a una red exclusiva de inversionistas comprometidos con el emprendimiento regenerativo en Colombia.",
    minimumInvestment: "$25,000 USD"
  },
  {
    title: "Inversiones directas",
    description: "Oportunidades para invertir directamente en startups seleccionadas que han pasado por nuestro riguroso programa.",
    minimumInvestment: "Variable"
  }
];

export const InvestmentOpportunities = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
        <Briefcase className="mr-2 h-6 w-6 text-green-600" />
        Oportunidades de Inversión
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {investmentOpportunitiesData.map((opportunity, index) => (
          <Card key={index} className="bg-white shadow hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold text-green-700 mb-2">{opportunity.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{opportunity.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Inversión mínima:</p>
                  <p className="font-bold text-green-700">{opportunity.minimumInvestment}</p>
                </div>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Más información
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
