
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, CreditCard } from "lucide-react";

interface SubscriptionPlansProps {
  billingType: string;
  setBillingType: (type: string) => void;
  customAmount: string;
  setCustomAmount: (amount: string) => void;
  handleSubscribe: (plan: string) => void;
}

export const SubscriptionPlans = ({
  billingType,
  setBillingType,
  customAmount,
  setCustomAmount,
  handleSubscribe
}: SubscriptionPlansProps) => {
  // Added JSX return value
  return (
    <div className="px-4 md:px-6 py-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Planes de Suscripción</h2>
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-green-100 rounded-lg">
            <Button
              variant={billingType === "monthly" ? "default" : "ghost"}
              className={billingType === "monthly" ? "bg-green-600 text-white" : "text-green-700"}
              onClick={() => setBillingType("monthly")}
            >
              Mensual
            </Button>
            <Button
              variant={billingType === "annual" ? "default" : "ghost"}
              className={billingType === "annual" ? "bg-green-600 text-white" : "text-green-700"}
              onClick={() => setBillingType("annual")}
            >
              Anual <Badge className="ml-1 bg-green-800">-15%</Badge>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan 1: Colaborador */}
          <Card className="overflow-hidden hover:shadow-lg transition-all border-2 border-transparent hover:border-green-200">
            <CardHeader className="bg-green-50 pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-xl mb-1">Colaborador</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">{billingType === "monthly" ? "$20.000" : "$204.000"}</span>
                <span className="text-sm text-muted-foreground">/{billingType === "monthly" ? "mes" : "año"}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Acceso a la plataforma
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Reconocimiento en página web
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Newsletter mensual
                </li>
              </ul>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleSubscribe("colaborador")}
              >
                Suscribirse
              </Button>
            </CardContent>
          </Card>
          
          {/* Plan 2: Impulsor */}
          <Card className="overflow-hidden hover:shadow-lg transition-all border-2 border-green-600">
            <Badge className="absolute top-4 right-4 bg-green-600">Popular</Badge>
            <CardHeader className="bg-green-50 pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-xl mb-1">Impulsor</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">{billingType === "monthly" ? "$40.000" : "$408.000"}</span>
                <span className="text-sm text-muted-foreground">/{billingType === "monthly" ? "mes" : "año"}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Todo lo de Colaborador
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Descuentos en experiencias
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Acceso a eventos exclusivos
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Reporte trimestral de impacto
                </li>
              </ul>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleSubscribe("impulsor")}
              >
                Suscribirse
              </Button>
            </CardContent>
          </Card>
          
          {/* Plan 3: Personalizado */}
          <Card className="overflow-hidden hover:shadow-lg transition-all border-2 border-transparent hover:border-green-200">
            <CardHeader className="bg-green-50 pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-xl mb-1">Personalizado</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">Tú decides</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <label htmlFor="custom-amount" className="block text-sm font-medium mb-1">
                  Monto a contribuir (COP)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    $
                  </span>
                  <Input
                    id="custom-amount"
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Ingresa un monto"
                    className="flex-1"
                  />
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Contribución a tu medida
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Certificado de donación
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" 
                onClick={() => handleSubscribe("personalizado")}
              >
                Contribuir
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
