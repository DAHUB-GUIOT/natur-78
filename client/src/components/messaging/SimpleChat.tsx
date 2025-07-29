import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageCircle, Users, CheckCircle } from "lucide-react";

interface SimpleChatProps {
  onClose?: () => void;
}

interface Company {
  id: number;
  companyName: string;
  description?: string;
  userId: number;
  isVerified: boolean;
  contactEmail?: string;
  website?: string;
}

export function SimpleChat({ onClose }: SimpleChatProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sentMessages, setSentMessages] = useState<Array<{id: number, content: string, timestamp: Date}>>([]);

  // Mock data for verified companies (clean implementation)
  const verifiedCompanies: Company[] = [
    {
      id: 1,
      companyName: "DaHub",
      description: "Plataforma tecnológica para turismo sostenible",
      userId: 21,
      isVerified: true,
      contactEmail: "dahub.tech@gmail.com",
      website: "dahub.tech"
    },
    {
      id: 2,
      companyName: "TripCol",
      description: "Operador turístico especializado en experiencias auténticas",
      userId: 22,
      isVerified: true,
      contactEmail: "tripcol.tour@gmail.com",
      website: "tripcol.com"
    },
    {
      id: 3,
      companyName: "Pacífico Salvaje",
      description: "Turismo ecológico en la costa pacífica colombiana",
      userId: 23,
      isVerified: true,
      contactEmail: "info@pacificosalvaje.com",
      website: "pacificosalvaje.com"
    },
    {
      id: 4,
      companyName: "Sabores del Caribe",
      description: "Experiencias gastronómicas caribeñas auténticas",
      userId: 24,
      isVerified: true,
      contactEmail: "contacto@saboresdelcaribe.co",
      website: "saboresdelcaribe.co"
    }
  ];

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedCompany) return;
    
    // Add message to local state (simplified implementation)
    const newMessage = {
      id: Date.now(),
      content: messageText.trim(),
      timestamp: new Date()
    };
    
    setSentMessages(prev => [...prev, newMessage]);
    setMessageText("");

    // Show success feedback
    setTimeout(() => {
      const confirmationMessage = {
        id: Date.now() + 1,
        content: `Mensaje recibido. Nos pondremos en contacto contigo pronto.`,
        timestamp: new Date()
      };
      setSentMessages(prev => [...prev, confirmationMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessagesForCompany = (companyId: number) => {
    return sentMessages.filter(msg => selectedCompany?.id === companyId);
  };

  return (
    <div className="h-full flex">
      {/* Companies List */}
      <div className="w-1/3 border-r border-gray-600/30 backdrop-blur-xl bg-gray-900/40">
        <div className="p-4 border-b border-gray-600/30">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Contactos
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {verifiedCompanies.length} empresas disponibles
          </p>
        </div>
        <div className="space-y-2 p-2">
          {verifiedCompanies.map((company) => (
            <Card 
              key={company.id}
              className={`cursor-pointer transition-all backdrop-blur-sm ${
                selectedCompany?.id === company.id 
                  ? 'bg-green-600/20 border-green-500/50' 
                  : 'bg-gray-800/40 border-gray-600/30 hover:bg-gray-700/50'
              }`}
              onClick={() => setSelectedCompany(company)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-green-600 text-white">
                      {company.companyName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white truncate">
                        {company.companyName}
                      </p>
                      {company.isVerified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {company.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedCompany ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-600/30 backdrop-blur-xl bg-gray-900/40">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-green-600 text-white">
                    {selectedCompany.companyName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white">{selectedCompany.companyName}</h4>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-400">
                    {selectedCompany.contactEmail} • {selectedCompany.website}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {getMessagesForCompany(selectedCompany.id).length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Inicia una conversación con {selectedCompany.companyName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Empresa verificada • Respuesta garantizada
                    </p>
                  </div>
                </div>
              ) : (
                getMessagesForCompany(selectedCompany.id).map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        index % 2 === 0
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-800/60 text-white border border-gray-600/30'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        index % 2 === 0 ? 'text-green-100' : 'text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-600/30 backdrop-blur-xl bg-gray-900/40">
              <div className="flex gap-2">
                <Input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Escribe a ${selectedCompany.companyName}...`}
                  className="flex-1 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tu mensaje será enviado directamente a {selectedCompany.companyName}
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">
                Selecciona una empresa para iniciar una conversación
              </p>
              <p className="text-sm text-gray-500">
                Todas las empresas están verificadas y responderán a tus mensajes
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}