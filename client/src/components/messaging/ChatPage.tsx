import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Mic,
  ArrowLeft,
  CheckCheck
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  messageType: string;
  isRead: boolean;
  createdAt: string;
}

interface Conversation {
  id: number;
  participant1Id: number;
  participant2Id: number;
  lastMessageId?: number;
  lastActivity: string;
  otherUser?: User;
}

interface ChatPageProps {
  currentUserId: number;
  preSelectedUserId?: number;
  onClose?: () => void;
}

export function ChatPage({ currentUserId, preSelectedUserId, onClose }: ChatPageProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Fetch conversations
  const { data: conversations = [] } = useQuery({
    queryKey: ["/api/conversations"],
    select: (data: Conversation[]) => {
      return data.map(conv => ({
        ...conv,
        otherUser: {
          id: conv.participant1Id === currentUserId ? conv.participant2Id : conv.participant1Id,
          email: `user${conv.participant1Id === currentUserId ? conv.participant2Id : conv.participant1Id}@example.com`,
          firstName: `Usuario`,
          lastName: `${conv.participant1Id === currentUserId ? conv.participant2Id : conv.participant1Id}`
        }
      }));
    }
  });

  // Fetch messages for selected conversation
  const { data: messages = [] } = useQuery({
    queryKey: ["/api/conversations", selectedConversation?.id, "messages"],
    enabled: !!selectedConversation,
  });

  // Search users
  const { data: searchResults = [] } = useQuery({
    queryKey: ["/api/messages/search-users", searchQuery],
    enabled: searchQuery.length > 0,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (data: { receiverId: number; content: string }) => {
      return apiRequest("/api/messages", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
      if (selectedConversation) {
        queryClient.invalidateQueries({ 
          queryKey: ["/api/conversations", selectedConversation.id, "messages"] 
        });
      }
      setMessageText("");
    },
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle pre-selected user
  useEffect(() => {
    if (preSelectedUserId && conversations.length > 0) {
      const existingConv = conversations.find(conv => 
        conv.otherUser?.id === preSelectedUserId
      );
      if (existingConv) {
        setSelectedConversation(existingConv);
      } else {
        // Create new conversation
        const newConv: Conversation = {
          id: 0,
          participant1Id: currentUserId,
          participant2Id: preSelectedUserId,
          lastActivity: new Date().toISOString(),
          otherUser: {
            id: preSelectedUserId,
            email: `user${preSelectedUserId}@example.com`,
            firstName: `Usuario`,
            lastName: `${preSelectedUserId}`
          }
        };
        setSelectedConversation(newConv);
      }
    }
  }, [preSelectedUserId, conversations, currentUserId]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation?.otherUser) return;

    sendMessageMutation.mutate({
      receiverId: selectedConversation.otherUser.id,
      content: messageText.trim(),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewConversation = (user: User) => {
    const newConv: Conversation = {
      id: 0,
      participant1Id: currentUserId,
      participant2Id: user.id,
      lastActivity: new Date().toISOString(),
      otherUser: user
    };
    setSelectedConversation(newConv);
    setSearchQuery("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Conversations List */}
      <div className="w-80 bg-gray-800/90 backdrop-blur-xl border-r border-cyan-500/20 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-cyan-500/20 bg-gradient-to-r from-gray-900/80 to-gray-800/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <h1 className="text-xl font-sans bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Mensajes
              </h1>
            </div>
            <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && Array.isArray(searchResults) && searchResults.length > 0 && (
          <div className="p-4 border-b border-gray-700/50">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Usuarios encontrados</h3>
            {(searchResults as User[]).map((user: User) => (
              <div
                key={user.id}
                onClick={() => startNewConversation(user)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-500/10 cursor-pointer transition-all"
              >
                <Avatar className="h-10 w-10 bg-gradient-to-br from-green-500 to-green-700">
                  <AvatarFallback className="bg-transparent text-white font-bold">
                    {user.firstName?.[0] || user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : user.email
                    }
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`flex items-center gap-3 p-4 hover:bg-gray-700/50 cursor-pointer transition-all border-l-2 ${
                selectedConversation?.id === conversation.id
                  ? "bg-cyan-500/10 border-l-cyan-500"
                  : "border-l-transparent"
              }`}
            >
              <Avatar className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-cyan-500">
                <AvatarFallback className="bg-transparent text-white font-bold">
                  {conversation.otherUser?.firstName?.[0] || conversation.otherUser?.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white truncate">
                    {conversation.otherUser?.firstName && conversation.otherUser?.lastName
                      ? `${conversation.otherUser.firstName} ${conversation.otherUser.lastName}`
                      : conversation.otherUser?.email
                    }
                  </p>
                  <span className="text-xs text-gray-400">
                    {format(new Date(conversation.lastActivity), "HH:mm", { locale: es })}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  Última actividad
                </p>
              </div>
              {/* Online indicator */}
              <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-800"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-gray-800/90 backdrop-blur-xl border-b border-cyan-500/20 p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-cyan-500">
                    <AvatarFallback className="bg-transparent text-white font-bold">
                      {selectedConversation.otherUser?.firstName?.[0] || selectedConversation.otherUser?.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-white">
                      {selectedConversation.otherUser?.firstName && selectedConversation.otherUser?.lastName
                        ? `${selectedConversation.otherUser.firstName} ${selectedConversation.otherUser.lastName}`
                        : selectedConversation.otherUser?.email
                      }
                    </h2>
                    <p className="text-sm text-emerald-400">En línea</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              <div className="space-y-4">
                {Array.isArray(messages) && (messages as Message[]).map((message: Message) => {
                  const isOwn = message.senderId === currentUserId;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                          isOwn
                            ? "bg-gradient-to-r from-green-500 to-green-700 text-white ml-auto"
                            : "bg-gray-700/80 text-white mr-auto border border-gray-600/50"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className={`flex items-center justify-end gap-1 mt-2 ${
                          isOwn ? "text-cyan-100" : "text-gray-400"
                        }`}>
                          <span className="text-xs">
                            {format(new Date(message.createdAt), "HH:mm", { locale: es })}
                          </span>
                          {isOwn && (
                            <CheckCheck className={`h-3 w-3 ${
                              message.isRead ? "text-cyan-200" : "text-cyan-300"
                            }`} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700/80 backdrop-blur-sm px-4 py-3 rounded-2xl border border-gray-600/50">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-gray-800/90 backdrop-blur-xl border-t border-cyan-500/20 p-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-12 bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-full"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                {messageText.trim() ? (
                  <Button
                    onClick={handleSendMessage}
                    disabled={sendMessageMutation.isPending}
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full p-3 shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full p-3"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Send className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Selecciona una conversación
              </h3>
              <p className="text-gray-400 max-w-md">
                Elige una conversación de la lista o busca usuarios para comenzar a chatear
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}