import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import WhatsAppChat from '@/components/messaging/WhatsAppChat';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Search, Users, ArrowLeft, Plus } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  role?: string;
  isOnline?: boolean;
}

interface Conversation {
  id: number;
  participant1Id: number;
  participant2Id: number;
  lastMessageId?: number;
  lastActivity: string;
  otherUser?: User;
  unreadCount?: number;
  lastMessage?: {
    content: string;
    createdAt: string;
    senderId: number;
  };
}

export default function MessagingPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserSearch, setShowUserSearch] = useState(false);

  // Get current user
  const { data: currentUser } = useQuery<{ user: User }>({
    queryKey: ['/api/auth/me'],
  });

  // Fetch conversations
  const { data: conversations = [], refetch: refetchConversations } = useQuery<Conversation[]>({
    queryKey: ['/api/messages/conversations/enhanced'],
    enabled: !!currentUser?.user.id,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Search users for new conversations
  const { data: searchUsers = [] } = useQuery<User[]>({
    queryKey: ['/api/messages/search-users', searchQuery],
    enabled: !!currentUser?.user.id && searchQuery.length > 0,
  });

  // Auto-select conversation from localStorage if set, or auto-select TripCol for demo
  useEffect(() => {
    const storedContactId = localStorage.getItem('selectedContactId');
    if (storedContactId && conversations.length > 0) {
      const contactId = parseInt(storedContactId);
      const conversation = conversations.find(conv => 
        conv.participant1Id === contactId || conv.participant2Id === contactId
      );
      if (conversation) {
        setSelectedConversation(conversation.id);
        localStorage.removeItem('selectedContactId'); // Clear after using
      }
    } else if (conversations.length > 0 && !selectedConversation) {
      // Auto-select TripCol conversation for demo (user ID 22)
      const tripcolConversation = conversations.find(conv => 
        (conv.participant1Id === 22 && conv.participant2Id === currentUser?.user.id) ||
        (conv.participant2Id === 22 && conv.participant1Id === currentUser?.user.id)
      );
      if (tripcolConversation) {
        setSelectedConversation(tripcolConversation.id);
      }
    }
  }, [conversations, currentUser]);

  const formatLastActivity = (date: string) => {
    const activityDate = new Date(date);
    
    if (isToday(activityDate)) {
      return format(activityDate, 'HH:mm');
    } else if (isYesterday(activityDate)) {
      return 'Ayer';
    } else {
      return format(activityDate, 'dd/MM', { locale: es });
    }
  };

  const handleStartConversation = async (userId: number) => {
    // Find existing conversation or it will be created when first message is sent
    const existingConversation = conversations.find(conv => 
      conv.participant1Id === userId || conv.participant2Id === userId
    );
    
    if (existingConversation) {
      setSelectedConversation(existingConversation.id);
    } else {
      // Store the contact ID to start conversation with
      localStorage.setItem('selectedContactId', userId.toString());
      setShowUserSearch(false);
      setSearchQuery('');
      // Conversation will be created when first message is sent
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso a Mensajes</h2>
          <p className="text-gray-600 mb-4">Inicia sesión para acceder a tus conversaciones</p>
          <Button onClick={() => window.location.href = '/auth/empresas'}>
            Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/portal-empresas'}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Portal
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">Mensajes Empresariales</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                B2B Messaging
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {conversations.length} conversaciones
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 8rem)' }}>
          <div className="flex h-full">
            {/* Sidebar - Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 bg-green-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold">Mensajes B2B</h1>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-green-700"
                    onClick={() => setShowUserSearch(!showUserSearch)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-200 h-4 w-4" />
                  <Input
                    placeholder={showUserSearch ? "Buscar usuarios..." : "Buscar conversaciones..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-green-700 border-green-500 text-white placeholder-green-200"
                  />
                </div>
              </div>

              {/* User Search Results */}
              {showUserSearch && searchUsers.length > 0 && (
                <div className="border-b border-gray-200 bg-gray-50">
                  <div className="p-2">
                    <p className="text-sm font-medium text-gray-600 mb-2">Usuarios disponibles:</p>
                    {searchUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => handleStartConversation(user.id)}
                      >
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={user.profilePicture} />
                          <AvatarFallback className="bg-green-600 text-white">
                            {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.firstName && user.lastName 
                              ? `${user.firstName} ${user.lastName}`
                              : user.email
                            }
                          </p>
                          <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                        <Plus className="h-4 w-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conversations List */}
              <ScrollArea className="flex-1">
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No hay conversaciones</p>
                    <p className="text-xs">Busca usuarios para iniciar una conversación</p>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedConversation === conversation.id ? 'bg-green-50 border-l-4 border-l-green-600' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-3">
                          <AvatarImage src={conversation.otherUser?.profilePicture} />
                          <AvatarFallback className="bg-green-600 text-white">
                            {(conversation.otherUser?.firstName?.[0] || conversation.otherUser?.email[0] || 'U').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {conversation.otherUser?.firstName && conversation.otherUser?.lastName
                                ? `${conversation.otherUser.firstName} ${conversation.otherUser.lastName}`
                                : conversation.otherUser?.email || 'Usuario'}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatLastActivity(conversation.lastActivity)}
                            </span>
                          </div>
                          
                          {conversation.lastMessage && (
                            <p className="text-sm text-gray-600 truncate mt-1">
                              {conversation.lastMessage.content}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {conversation.otherUser?.role || 'usuario'}
                            </Badge>
                            {conversation.unreadCount && conversation.unreadCount > 0 && (
                              <Badge className="bg-green-600 text-white text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <WhatsAppChat
                  currentUserId={currentUser.user.id}
                  onClose={() => setSelectedConversation(null)}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Selecciona una conversación
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Elige una conversación de la lista o busca un usuario para comenzar a chatear
                    </p>
                    <Button
                      onClick={() => setShowUserSearch(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Buscar Usuarios
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}