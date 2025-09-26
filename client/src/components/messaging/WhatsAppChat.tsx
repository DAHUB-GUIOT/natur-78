import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface WhatsAppChatProps {
  onClose?: () => void;
  selectedConversationId?: number | null;
  conversationData?: any;
}

interface NormalizedMessage {
  id: number;
  content: string;
  createdAt: Date;
  sender: 'me' | 'them';
  senderId: number;
  receiverId: number;
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

export function WhatsAppChat({ onClose, selectedConversationId, conversationData }: WhatsAppChatProps) {
  const [messageText, setMessageText] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch messages for selected conversation
  const { data: rawMessages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/conversations', selectedConversationId, 'messages'],
    enabled: !!selectedConversationId,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Normalize messages to match UI expectations
  const normalizeMessage = (msg: any): NormalizedMessage => {
    // Convert string user ID to number for comparison
    const currentUserId = user?.id ? parseInt(user.id) : null;
    
    return {
      id: msg.id,
      content: msg.content,
      createdAt: new Date(msg.createdAt), // Convert ISO string to Date
      sender: msg.senderId === currentUserId ? 'me' : 'them',
      senderId: msg.senderId,
      receiverId: msg.receiverId
    };
  };

  const messages = rawMessages.map(normalizeMessage);

  // Fetch real companies from map endpoint 
  const { data: companies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['/api/companies/map'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { conversationId: number; content: string }) => {
      return apiRequest(`/api/conversations/${messageData.conversationId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content: messageData.content }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/conversations', selectedConversationId, 'messages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje se envió exitosamente"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al enviar mensaje",
        description: error.message || "Hubo un problema al enviar el mensaje",
        variant: "destructive"
      });
    }
  });

  // Get current conversation data
  const currentConversation = conversationData || null;
  const otherUser = currentConversation?.otherUser;

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversationId) return;
    
    sendMessageMutation.mutate({
      conversationId: selectedConversationId,
      content: messageText.trim()
    });
    
    setMessageText("");
  };

  const getCurrentMessages = () => {
    return messages || [];
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
      {currentConversation ? (
        /* Chat View - Mobile First */
        <div className="flex flex-col h-full">
          {/* Chat Header - Transparent Style */}
          <div className="flex items-center p-3 md:p-4 bg-transparent border-b border-white/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-green-600/50 p-2 mr-2 md:hidden min-h-[44px] min-w-[44px] touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="w-10 h-10 mr-3">
              <AvatarFallback className="bg-white/20 text-white font-bold text-sm">
                {(otherUser?.companyName || `${otherUser?.firstName} ${otherUser?.lastName}`)?.substring(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-white font-medium text-base md:text-lg truncate">
                  {otherUser?.companyName || `${otherUser?.firstName} ${otherUser?.lastName}` || 'Usuario'}
                </h3>
                {otherUser?.isVerified && (
                  <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                )}
              </div>
              <p className="text-white/70 text-xs md:text-sm truncate">
                {otherUser?.role || 'En línea'}
              </p>
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
                        {formatTime(message.createdAt)}
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
                disabled={!messageText.trim() || sendMessageMutation.isPending}
                size="sm"
                className={`rounded-full p-2 min-h-[40px] min-w-[40px] touch-manipulation ${
                  messageText.trim() && !sendMessageMutation.isPending
                    ? 'bg-white/20 hover:bg-white/30 text-white' 
                    : 'bg-transparent text-white/50 cursor-not-allowed'
                }`}
                data-testid="button-send-message"
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
            {/* Loading state */}
            {companiesLoading ? (
              <div className="p-8 text-center">
                <div className="animate-pulse">
                  <div className="h-4 bg-white/20 rounded mb-4"></div>
                  <div className="h-3 bg-white/20 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            ) : (
              <>
                {/* Available Companies */}
                <div className="px-4 py-3 border-b border-white/20 bg-transparent">
                  <h4 className="text-white/80 font-medium text-sm mb-3">Empresas Disponibles</h4>
                </div>
                {companies.map((company: any) => (
                  <div
                    key={company.id}
                    className="flex items-center p-4 hover:bg-white/10 active:bg-white/20 cursor-pointer border-b border-white/10 touch-manipulation"
                    data-testid={`company-${company.id}`}
                  >
                    <Avatar className="w-12 h-12 mr-3">
                      <AvatarFallback className="bg-white/20 text-white font-bold">
                        {company.companyName?.substring(0, 2).toUpperCase() || 'C'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-medium text-base truncate">
                          {company.companyName || 'Empresa'}
                        </h3>
                        {company.isVerified && (
                          <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-white/80 text-sm truncate">
                        {company.companyCategory || company.businessType || 'Empresa turística'}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {companies.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <MessageCircle className="h-16 w-16 text-white/40 mb-4" />
                    <h3 className="text-white/70 text-lg font-medium mb-2">
                      No hay empresas disponibles
                    </h3>
                    <p className="text-white/60 text-sm">
                      Las empresas aparecerán aquí cuando se registren
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};