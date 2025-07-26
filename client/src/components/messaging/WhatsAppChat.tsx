import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video,
  Search,
  ArrowLeft,
  Check,
  CheckCheck,
  Mic,
  Camera,
  X,
  Edit2,
  Trash2,
  MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  isRead: boolean;
  createdAt: string;
  messageType: string;
  attachmentUrl?: string;
  isEdited?: boolean;
  editedAt?: string;
}

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  isOnline?: boolean;
  lastSeen?: string;
  isTyping?: boolean;
}

interface Conversation {
  id: number;
  participant1Id: number;
  participant2Id: number;
  lastMessageId?: number;
  lastActivity: string;
  otherUser?: User;
  unreadCount?: number;
}

interface WhatsAppChatProps {
  currentUserId: number;
  onClose?: () => void;
}

export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ currentUserId, onClose }) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [replyingToMessage, setReplyingToMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Check for stored contact to start chat with
  useEffect(() => {
    const startChatWith = localStorage.getItem('startChatWith');
    if (startChatWith) {
      // Set search query to find the user
      const companyId = startChatWith;
      if (companyId === 'tripcol') {
        setSearchQuery('tripcol'); // Search by email prefix
      } else if (companyId === 'dahub') {
        setSearchQuery('dahub'); // Search by email prefix
      }
      // Clear the stored contact
      localStorage.removeItem('startChatWith');
    }
  }, []);

  // Fetch conversations with user details
  const { data: conversations = [], isLoading: conversationsLoading } = useQuery<Conversation[]>({
    queryKey: ['/api/messages/conversations/enhanced'],
    enabled: !!currentUserId,
  });

  // Fetch users for search
  const { data: searchUsers = [] } = useQuery<User[]>({
    queryKey: ['/api/messages/search-users', searchQuery],
    enabled: !!currentUserId && searchQuery.length > 0,
  });

  // Fetch messages for selected conversation
  const { data: messages = [], refetch: refetchMessages } = useQuery<Message[]>({
    queryKey: [`/api/messages/${selectedConversation}`],
    enabled: !!selectedConversation,
    refetchInterval: 5000, // Poll for new messages
  });

  // Get other user in conversation
  const otherUser = conversations.find(c => c.id === selectedConversation)?.otherUser;

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (data: { 
      receiverId: number; 
      content: string; 
      replyToId?: number;
      attachmentUrl?: string;
    }) => {
      return apiRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setMessageContent('');
      setReplyingToMessage(null);
      refetchMessages();
      queryClient.invalidateQueries({ queryKey: ['/api/messages/conversations/enhanced'] });
      scrollToBottom();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje.",
        variant: "destructive",
      });
    },
  });

  // Edit message mutation
  const editMessageMutation = useMutation({
    mutationFn: async ({ messageId, content }: { messageId: number; content: string }) => {
      return apiRequest(`/api/messages/${messageId}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
      });
    },
    onSuccess: () => {
      setEditingMessageId(null);
      setMessageContent('');
      refetchMessages();
    },
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: number) => {
      return apiRequest(`/api/messages/${messageId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      refetchMessages();
      toast({
        title: "Mensaje eliminado",
        description: "El mensaje ha sido eliminado.",
      });
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: number) => {
      return apiRequest(`/api/messages/${messageId}/read`, {
        method: 'PUT',
      });
    },
    onSuccess: () => {
      refetchMessages();
      queryClient.invalidateQueries({ queryKey: ['/api/messages/conversations/enhanced'] });
    },
  });

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Mark messages as read when viewing
  useEffect(() => {
    if (messages.length > 0) {
      messages.forEach((message) => {
        if (message.receiverId === currentUserId && !message.isRead) {
          markAsReadMutation.mutate(message.id);
        }
      });
    }
  }, [messages, currentUserId]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Format timestamp
  const formatMessageTime = (date: string) => {
    const messageDate = new Date(date);
    const now = new Date();
    
    if (isToday(messageDate)) {
      return format(messageDate, 'HH:mm');
    } else if (isYesterday(messageDate)) {
      return 'Ayer ' + format(messageDate, 'HH:mm');
    } else {
      return format(messageDate, 'dd/MM/yyyy HH:mm', { locale: es });
    }
  };

  // Format last seen
  const formatLastSeen = (date?: string) => {
    if (!date) return 'Desconectado';
    const lastSeenDate = new Date(date);
    
    if (isToday(lastSeenDate)) {
      return `últ. vez hoy a las ${format(lastSeenDate, 'HH:mm')}`;
    } else if (isYesterday(lastSeenDate)) {
      return `últ. vez ayer a las ${format(lastSeenDate, 'HH:mm')}`;
    } else {
      return `últ. vez ${format(lastSeenDate, 'dd/MM/yyyy', { locale: es })}`;
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!messageContent.trim() || !selectedConversation) return;

    const conversation = conversations.find(c => c.id === selectedConversation);
    if (!conversation) return;

    const receiverId = conversation.participant1Id === currentUserId 
      ? conversation.participant2Id 
      : conversation.participant1Id;

    if (editingMessageId) {
      editMessageMutation.mutate({
        messageId: editingMessageId,
        content: messageContent.trim(),
      });
    } else {
      sendMessageMutation.mutate({
        receiverId,
        content: messageContent.trim(),
        replyToId: replyingToMessage?.id,
      });
    }
  };

  // Handle edit message
  const handleEditMessage = (message: Message) => {
    setEditingMessageId(message.id);
    setMessageContent(message.content);
    inputRef.current?.focus();
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingMessageId(null);
    setMessageContent('');
  };

  // Filter conversations by search
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    const user = conv.otherUser;
    if (!user) return false;
    
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || email.includes(query);
  });

  if (conversationsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-transparent backdrop-blur-xl">
        <div className="text-white">Cargando conversaciones...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-transparent">
      {/* Conversations List */}
      <div className={cn(
        "w-full md:w-96 backdrop-blur-xl bg-white/10 border-r border-white/20 flex flex-col",
        selectedConversation && "hidden md:flex"
      )}>
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/20 px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-white">Mensajes B2B</h2>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
            <Input
              placeholder="Buscar empresas o contactos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 backdrop-blur-xl bg-white/10 border-white/20 text-white placeholder-white/70"
            />
          </div>
        </div>

        {/* Conversations and Search Results */}
        <ScrollArea className="flex-1">
          {/* Search Results */}
          {searchQuery && searchUsers.length > 0 && (
            <>
              <div className="px-3 py-2 backdrop-blur-xl bg-white/10">
                <p className="text-xs font-semibold text-white">Usuarios disponibles</p>
              </div>
              {searchUsers.map((user) => (
                <div
                  key={`search-${user.id}`}
                  onClick={async () => {
                    // Start a new conversation
                    try {
                      const response = await apiRequest('/api/messages', {
                        method: 'POST',
                        body: JSON.stringify({
                          receiverId: user.id,
                          content: `Hola ${user.firstName || user.email.split('@')[0]}, me gustaría conectar contigo para explorar oportunidades de colaboración.`
                        }),
                      });
                      queryClient.invalidateQueries({ queryKey: ['/api/messages/conversations/enhanced'] });
                      setSearchQuery(''); // Clear search after starting chat
                      setSearchQuery('');
                    } catch (error) {
                      toast({
                        title: "Error",
                        description: "No se pudo iniciar la conversación",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="flex items-center px-3 py-2 hover:bg-white/20 cursor-pointer transition-colors border-b border-white/10"
                >
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={user.profilePicture} />
                    <AvatarFallback className="bg-green-600 text-white">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-white/70">{user.email}</p>
                    <p className="text-xs text-green-400">Click para iniciar conversación</p>
                  </div>
                </div>
              ))}
              <div className="px-3 py-2 backdrop-blur-xl bg-white/10 mt-2">
                <p className="text-xs font-semibold text-white">Conversaciones activas</p>
              </div>
            </>
          )}

          {/* Existing Conversations */}
          {filteredConversations.map((conversation) => {
            const user = conversation.otherUser;
            const isSelected = conversation.id === selectedConversation;
            
            return (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={cn(
                  "flex items-center px-3 py-2 hover:bg-white/20 cursor-pointer transition-colors",
                  isSelected && "bg-white/10"
                )}
              >
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback className="bg-white/20 text-white">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <span className="text-xs text-white/70">
                      {formatMessageTime(conversation.lastActivity)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/70 truncate">
                      {user?.email}
                    </p>
                    {conversation.unreadCount && conversation.unreadCount > 0 && (
                      <Badge className="bg-green-600 text-white text-xs h-5 min-w-[20px] px-1">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col bg-transparent">
          {/* Chat Header */}
          <div className="backdrop-blur-xl bg-white/20 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden text-white hover:bg-white/20 mr-2"
                onClick={() => setSelectedConversation(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={otherUser?.profilePicture} />
                <AvatarFallback className="bg-white/20 text-white">
                  {otherUser?.firstName?.[0]}{otherUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">
                  {otherUser?.firstName} {otherUser?.lastName}
                </p>
                <p className="text-xs text-white/70">
                  {otherUser?.isOnline ? (
                    <span className="text-green-400">En línea</span>
                  ) : (
                    formatLastSeen(otherUser?.lastSeen)
                  )}
                  {otherUser?.isTyping && (
                    <span className="text-green-400"> • escribiendo...</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                <Video className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                <Phone className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="backdrop-blur-xl bg-white/20 text-white border-white/20">
                  <DropdownMenuItem className="hover:bg-white/20">Ver perfil</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/20">Silenciar notificaciones</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/20">Vaciar chat</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-300 hover:bg-white/20">Bloquear</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea 
            className="flex-1 px-4 py-2 backdrop-blur-xl bg-white/5"
          >
            {messages.map((message, index) => {
              const isOwn = message.senderId === currentUserId;
              const showDate = index === 0 || 
                new Date(messages[index - 1].createdAt).toDateString() !== 
                new Date(message.createdAt).toDateString();

              return (
                <React.Fragment key={message.id}>
                  {showDate && (
                    <div className="flex justify-center my-2">
                      <span className="backdrop-blur-xl bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                        {isToday(new Date(message.createdAt)) 
                          ? 'Hoy' 
                          : isYesterday(new Date(message.createdAt))
                          ? 'Ayer'
                          : format(new Date(message.createdAt), 'dd/MM/yyyy', { locale: es })}
                      </span>
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "flex mb-1",
                      isOwn ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "relative max-w-[70%] px-3 py-2 rounded-lg group",
                        isOwn ? "bg-green-600" : "backdrop-blur-xl bg-white/20"
                      )}
                    >
                      {/* Message Actions */}
                      <div className={cn(
                        "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity",
                        isOwn ? "-left-20" : "-right-20"
                      )}>
                        <div className="flex items-center gap-1 backdrop-blur-xl bg-white/20 rounded-lg p-1">
                          {isOwn && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-white hover:bg-white/20"
                              onClick={() => handleEditMessage(message)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-white hover:bg-white/20"
                            onClick={() => setReplyingToMessage(message)}
                          >
                            <ArrowLeft className="h-3 w-3 rotate-180" />
                          </Button>
                          {isOwn && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-white hover:bg-white/20"
                              onClick={() => deleteMessageMutation.mutate(message.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <p className="text-white text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[10px] text-white/80">
                          {formatMessageTime(message.createdAt)}
                        </span>
                        {message.isEdited && (
                          <span className="text-[10px] text-white/80">editado</span>
                        )}
                        {isOwn && (
                          <span className="text-xs">
                            {message.isRead ? (
                              <CheckCheck className="h-4 w-4 text-blue-300" />
                            ) : (
                              <Check className="h-4 w-4 text-white/70" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Reply Preview */}
          {replyingToMessage && (
            <div className="backdrop-blur-xl bg-white/20 px-4 py-2 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-green-400 font-semibold">Respondiendo a</p>
                <p className="text-sm text-white truncate">{replyingToMessage.content}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => setReplyingToMessage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Edit Preview */}
          {editingMessageId && (
            <div className="backdrop-blur-xl bg-white/20 px-4 py-2 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-green-400 font-semibold">Editando mensaje</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={cancelEdit}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Input Area */}
          <div className="backdrop-blur-xl bg-white/20 px-4 py-3 flex items-center gap-3">
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              ref={inputRef}
              placeholder="Escribe un mensaje"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 backdrop-blur-xl bg-white/10 border-white/20 text-white placeholder-white/70"
            />
            {messageContent.trim() ? (
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={sendMessageMutation.isPending}
              >
                <Send className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "text-white hover:bg-white/20",
                  isRecording && "text-red-400"
                )}
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-transparent backdrop-blur-xl">
          <div className="text-center">
            <div className="w-72 h-72 mx-auto mb-4 backdrop-blur-xl bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-32 w-32 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Selecciona una conversación</h3>
            <p className="text-white/70">Elige una empresa para comenzar a chatear</p>
          </div>
        </div>
      )}
    </div>
  );
};