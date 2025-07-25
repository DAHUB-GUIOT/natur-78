import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, ChevronLeft, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  subject?: string;
  isRead: boolean;
  createdAt: string;
  messageType: string;
}

interface Conversation {
  id: number;
  participant1Id: number;
  participant2Id: number;
  lastMessageId?: number;
  lastActivity: string;
}

interface MessageCenterProps {
  currentUserId: number;
  preSelectedUserId?: number;
  compact?: boolean;
}

export const MessageCenter: React.FC<MessageCenterProps> = ({ currentUserId, preSelectedUserId, compact = false }) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const { toast } = useToast();

  // Fetch conversations
  const { data: conversations = [], isLoading: conversationsLoading } = useQuery<Conversation[]>({
    queryKey: ['/api/messages/conversations'],
    enabled: !!currentUserId,
  });

  // Auto-select conversation if preSelectedUserId is provided
  useEffect(() => {
    if (preSelectedUserId && conversations.length > 0) {
      const conversation = conversations.find(conv => 
        (conv.participant1Id === currentUserId && conv.participant2Id === preSelectedUserId) ||
        (conv.participant2Id === currentUserId && conv.participant1Id === preSelectedUserId)
      );
      if (conversation) {
        setSelectedConversation(conversation.id);
      }
    }
  }, [preSelectedUserId, conversations, currentUserId]);

  // Fetch messages for selected conversation
  const { data: messages = [], refetch: refetchMessages } = useQuery<Message[]>({
    queryKey: [`/api/messages/${selectedConversation}`],
    enabled: !!selectedConversation,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (data: { receiverId: number; content: string }) => {
      return apiRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setMessageContent('');
      refetchMessages();
      queryClient.invalidateQueries({ queryKey: ['/api/messages/conversations'] });
      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje ha sido enviado exitosamente.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta de nuevo.",
        variant: "destructive",
      });
    },
  });

  // Mark message as read
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: number) => {
      return apiRequest(`/api/messages/${messageId}/read`, {
        method: 'PUT',
      });
    },
    onSuccess: () => {
      refetchMessages();
    },
  });

  const handleSendMessage = () => {
    if (!messageContent.trim() || !selectedConversation) return;

    // Get the other participant's ID from the conversation
    const conversation = conversations.find((c: Conversation) => c.id === selectedConversation);
    if (!conversation) return;

    const receiverId = conversation.participant1Id === currentUserId 
      ? conversation.participant2Id 
      : conversation.participant1Id;

    sendMessageMutation.mutate({
      receiverId,
      content: messageContent.trim(),
    });
  };

  // Mark messages as read when viewing conversation
  useEffect(() => {
    if (messages.length > 0) {
      messages.forEach((message: Message) => {
        if (message.receiverId === currentUserId && !message.isRead) {
          markAsReadMutation.mutate(message.id);
        }
      });
    }
  }, [messages, currentUserId]);

  if (conversationsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Cargando conversaciones...</p>
      </div>
    );
  }

  return (
    <div className={`${compact ? 'h-full' : 'h-[600px]'} flex bg-white rounded-lg ${compact ? '' : 'shadow-sm border'}`}>
      {/* Conversations List */}
      {!compact && (
        <div className={`${selectedConversation ? 'hidden md:block' : 'block'} w-full md:w-1/3 border-r`}>
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Mensajes
          </h2>
        </div>
        <ScrollArea className="h-[calc(100%-4rem)]">
          {conversations.length === 0 ? (
            <p className="text-center text-gray-500 p-8">
              No tienes conversaciones aún
            </p>
          ) : (
            <div className="divide-y">
              {conversations.map((conversation: Conversation) => {
                const otherUserId = conversation.participant1Id === currentUserId 
                  ? conversation.participant2Id 
                  : conversation.participant1Id;
                
                return (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>U{otherUserId}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">Usuario {otherUserId}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {new Date(conversation.lastActivity).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>
      )}

      {/* Messages View */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedConversation(null)}
              className="md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h3 className="font-semibold">Conversación</h3>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message: Message) => {
                const isOwnMessage = message.senderId === currentUserId;
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        isOwnMessage
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        isOwnMessage ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="min-h-[80px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageContent.trim() || sendMessageMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center">
          <p className="text-gray-500">Selecciona una conversación para ver los mensajes</p>
        </div>
      )}
    </div>
  );
};