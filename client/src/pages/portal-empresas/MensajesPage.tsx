import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MessageCircle, Send, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WhatsAppChat } from "@/components/messaging/WhatsAppChat";

export default function MensajesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  // Fetch conversations
  const { data: conversations = [], isLoading: conversationsLoading } = useQuery({
    queryKey: ['/api/conversations'],
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Auto-refresh every 30 seconds
  }) as { data: any[]; isLoading: boolean };

  // Filter conversations
  const filteredConversations = conversations.filter((conv: any) => {
    if (!searchQuery) return true;
    const otherUser = conv.otherUser;
    return (
      otherUser?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      otherUser?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      otherUser?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Ahora";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      <div className="flex h-screen">
        {/* Conversations Sidebar */}
        <div className="w-full lg:w-80 border-r border-white/20 bg-white/5 backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 border-b border-white/20">
            <h1 className="text-xl font-bold text-white mb-4">Mensajes</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                placeholder="Buscar conversaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                data-testid="input-search-conversations"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="overflow-y-auto h-[calc(100vh-120px)]">
            {conversationsLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3 animate-pulse">
                    <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-white/20 rounded mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-white/80 text-lg mb-2">
                  {conversations.length === 0 ? 'No tienes conversaciones' : 'No se encontraron conversaciones'}
                </h3>
                <p className="text-white/60">
                  {conversations.length === 0 
                    ? 'Inicia una conversación desde la Red de Empresas'
                    : 'Intenta cambiar el término de búsqueda'
                  }
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation: any) => {
                const otherUser = conversation.otherUser;
                const lastMessage = conversation.lastMessage;
                const isSelected = selectedConversation === conversation.id;
                
                return (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 border-b border-white/10 text-left transition-all duration-200 hover:bg-white/10 ${
                      isSelected ? 'bg-white/15' : ''
                    }`}
                    data-testid={`conversation-${conversation.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-green-400/30">
                        <AvatarImage src={otherUser?.profileImage} />
                        <AvatarFallback className="bg-green-600/20 text-green-400">
                          {otherUser?.companyName?.charAt(0) || otherUser?.firstName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-medium truncate">
                            {otherUser?.companyName || `${otherUser?.firstName} ${otherUser?.lastName}`}
                          </h3>
                          {lastMessage && (
                            <span className="text-white/60 text-xs">
                              {formatMessageTime(lastMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-white/70 text-sm truncate">
                          {lastMessage?.content || 'Conversación iniciada'}
                        </p>
                        
                        {conversation.unreadCount > 0 && (
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-green-400 text-xs">{otherUser?.role}</span>
                            <div className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 lg:flex hidden">
          {selectedConversation ? (
            <div className="w-full h-full">
              <WhatsAppChat 
                selectedConversationId={selectedConversation}
                conversationData={filteredConversations.find(conv => conv.id === selectedConversation)}
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white/5 backdrop-blur-xl">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-white/80 text-xl mb-2">Selecciona una conversación</h3>
                <p className="text-white/60">Elige una conversación para empezar a chatear</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Chat View */}
        {selectedConversation && (
          <div className="lg:hidden fixed inset-0 bg-gray-900 z-50">
            <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/5 backdrop-blur-xl">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedConversation(null)}
                className="text-white"
              >
                ← Volver
              </Button>
              <h2 className="text-white font-medium">Chat</h2>
              <Button variant="ghost" className="text-white">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
            <div className="h-[calc(100vh-80px)]">
              <WhatsAppChat 
                selectedConversationId={selectedConversation}
                conversationData={filteredConversations.find(conv => conv.id === selectedConversation)}
                onClose={() => setSelectedConversation(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}