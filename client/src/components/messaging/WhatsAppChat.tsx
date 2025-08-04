import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageCircle, CheckCircle, ArrowLeft } from "lucide-react";

interface WhatsAppChatProps {
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

export function WhatsAppChat({ onClose }: WhatsAppChatProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [messageText, setMessageText] = useState("");
  const [savedConversations, setSavedConversations] = useState<Array<{
    id: number, 
    companyName: string, 
    userId: number,
    messages: Array<{id: number, content: string, timestamp: Date, sender: 'me' | 'them'}>
  }>>([
    {
      id: 1,
      companyName: "TripCol",
      userId: 22,
      messages: [
        {
          id: 1,
          content: "Hola! Estoy interesado en conocer más sobre sus experiencias turísticas.",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          sender: 'me'
        },
        {
          id: 2,
          content: "¡Hola! Gracias por contactarnos. Nos especializamos en experiencias auténticas de turismo sostenible en Colombia. ¿Hay alguna región específica que te interese?",
          timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
          sender: 'them'
        }
      ]
    }
  ]);

  const verifiedCompanies: Company[] = [
    {
      id: 2,
      companyName: "TripCol",
      description: "Operador turístico especializado en experiencias auténticas",
      userId: 22,
      isVerified: true,
      contactEmail: "tripcol.tour@gmail.com",
      website: "tripcol.com"
    }
  ];

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedCompany) return;
    
    const existingConversationIndex = savedConversations.findIndex(
      conv => conv.userId === selectedCompany.userId
    );
    
    const newMessage = {
      id: Date.now(),
      content: messageText.trim(),
      timestamp: new Date(),
      sender: 'me' as const
    };

    if (existingConversationIndex >= 0) {
      const updatedConversations = [...savedConversations];
      updatedConversations[existingConversationIndex].messages.push(newMessage);
      setSavedConversations(updatedConversations);
    } else {
      const newConversation = {
        id: Date.now(),
        companyName: selectedCompany.companyName,
        userId: selectedCompany.userId,
        messages: [newMessage]
      };
      setSavedConversations([...savedConversations, newConversation]);
    }
    
    setMessageText("");
  };

  const getCurrentMessages = () => {
    if (!selectedCompany) return [];
    const conversation = savedConversations.find(conv => conv.userId === selectedCompany.userId);
    return conversation ? conversation.messages : [];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Ahora';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Mobile WhatsApp-like Interface */}
      {selectedCompany ? (
        /* Chat View - Mobile First */
        <div className="flex flex-col h-full">
          {/* Chat Header - Transparent Style */}
          <div className="flex items-center p-3 md:p-4 bg-transparent border-b border-white/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCompany(null)}
              className="text-white hover:bg-green-600/50 p-2 mr-2 md:hidden min-h-[44px] min-w-[44px] touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="w-10 h-10 mr-3">
              <AvatarFallback className="bg-white/20 text-white font-bold text-sm">
                {selectedCompany.companyName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-white font-medium text-base md:text-lg truncate">{selectedCompany.companyName}</h3>
                {selectedCompany.isVerified && (
                  <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                )}
              </div>
              <p className="text-white/70 text-xs md:text-sm truncate">En línea</p>
            </div>
          </div>

          {/* Messages - Transparent Style */}
          <div className="flex-1 p-3 md:p-4 overflow-y-auto bg-transparent">
            <div className="space-y-3">
              {getCurrentMessages().map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[280px] md:max-w-md px-3 py-2 rounded-lg relative ${
                      message.sender === 'me'
                        ? 'bg-white/20 text-white rounded-br-sm'
                        : 'bg-white/10 text-white rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className={`flex items-center justify-end mt-1 space-x-1 ${
                      message.sender === 'me' ? 'text-white/70' : 'text-white/50'
                    }`}>
                      <span className="text-xs">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.sender === 'me' && (
                        <div className="flex">
                          <CheckCircle className="h-3 w-3 text-white/70" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input - Transparent Style */}
          <div className="p-3 md:p-4 bg-transparent border-t border-white/20">
            <div className="flex items-center space-x-2 bg-transparent rounded-full px-4 py-2 border border-white/30">
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Mensaje..."
                className="flex-1 bg-transparent border-0 text-white placeholder:text-white/60 focus:ring-0 focus:outline-none text-sm md:text-base h-auto py-2"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                size="sm"
                className={`rounded-full p-2 min-h-[40px] min-w-[40px] touch-manipulation ${
                  messageText.trim() 
                    ? 'bg-white/20 hover:bg-white/30 text-white' 
                    : 'bg-transparent text-white/50 cursor-not-allowed'
                }`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Contacts List - WhatsApp Style */
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 bg-transparent border-b border-white/20">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Mensajes</h2>
              <div className="bg-white/20 text-white px-2 py-1 text-xs rounded-full">
                B2B
              </div>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto bg-transparent">
            {/* Active Conversations */}
            {savedConversations.length > 0 && (
              <div>
                {savedConversations.map((conversation) => {
                  const lastMessage = conversation.messages[conversation.messages.length - 1];
                  return (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedCompany(verifiedCompanies.find(c => c.userId === conversation.userId) || null)}
                      className="flex items-center p-4 hover:bg-white/10 active:bg-white/20 cursor-pointer border-b border-white/10 touch-manipulation"
                    >
                      <Avatar className="w-12 h-12 mr-3">
                        <AvatarFallback className="bg-white/20 text-white font-bold">
                          {conversation.companyName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-medium text-base truncate">{conversation.companyName}</h3>
                          <span className="text-white/60 text-xs">
                            {lastMessage ? formatTimeAgo(lastMessage.timestamp) : ''}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm truncate">
                          {lastMessage 
                            ? (lastMessage.sender === 'me' ? '✓ ' : '') + lastMessage.content 
                            : 'Sin mensajes'
                          }
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Available Companies */}
            <div className="px-4 py-3 border-b border-white/20 bg-transparent">
              <h4 className="text-white/80 font-medium text-sm mb-3">Empresas Disponibles</h4>
            </div>
            {verifiedCompanies.filter(company => 
              !savedConversations.some(conv => conv.userId === company.userId)
            ).map((company) => (
              <div
                key={company.id}
                onClick={() => setSelectedCompany(company)}
                className="flex items-center p-4 hover:bg-white/10 active:bg-white/20 cursor-pointer border-b border-white/10 touch-manipulation"
              >
                <Avatar className="w-12 h-12 mr-3">
                  <AvatarFallback className="bg-white/20 text-white font-bold">
                    {company.companyName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-medium text-base truncate">{company.companyName}</h3>
                    {company.isVerified && (
                      <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-white/80 text-sm truncate">{company.description}</p>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {savedConversations.length === 0 && verifiedCompanies.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <MessageCircle className="h-16 w-16 text-white/40 mb-4" />
                <h3 className="text-white/70 text-lg font-medium mb-2">
                  No hay conversaciones
                </h3>
                <p className="text-white/60 text-sm">
                  Las empresas aparecerán aquí cuando estén disponibles
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};