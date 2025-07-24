import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Plus, 
  Search,
  Users,
  Hash,
  MessageCircle,
  Settings,
  Heart,
  Globe,
  Building,
  Zap
} from "lucide-react";

// Mock data para chats y mensajes
const chatRooms = [
  {
    id: 'general',
    name: 'General NATUR',
    type: 'general',
    participants: 234,
    unread: 3,
    icon: Heart,
    description: 'Chat general de la comunidad NATUR'
  },
  {
    id: 'startups',
    name: 'Startups',
    type: 'category',
    participants: 89,
    unread: 0,
    icon: Zap,
    description: 'Conversaciones entre emprendedores'
  },
  {
    id: 'investors',
    name: 'Inversores',
    type: 'category', 
    participants: 45,
    unread: 2,
    icon: Building,
    description: 'Red de inversores y fondos'
  },
  {
    id: 'global',
    name: 'Turismo Global',
    type: 'topic',
    participants: 156,
    unread: 0,
    icon: Globe,
    description: 'Tendencias globales en turismo sostenible'
  }
];

const mockMessages = {
  general: [
    {
      id: 1,
      user: 'María González',
      avatar: '/api/placeholder/32/32',
      message: '¡Hola comunidad! Acabamos de lanzar nuestro nuevo tour regenerativo en la Amazonía 🌿',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      user: 'Carlos Rivera',
      avatar: '/api/placeholder/32/32',
      message: 'Excelente iniciativa María! Nos encantaría conocer más detalles para posibles inversiones',
      timestamp: '10:32 AM',
      isOwn: false
    },
    {
      id: 3,
      user: 'Tú',
      avatar: '/api/placeholder/32/32',
      message: 'Me parece una propuesta muy interesante. ¿Podrían compartir más información?',
      timestamp: '10:35 AM',
      isOwn: true
    }
  ]
};

export const ChatSystem = () => {
  const [activeRoom, setActiveRoom] = useState('general');
  const [messages, setMessages] = useState(mockMessages.general || []);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'Tú',
        avatar: '/api/placeholder/32/32',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const activeRoomData = chatRooms.find(room => room.id === activeRoom);

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Chat Comunitario
        </h1>
        <p className="text-gray-600">
          Conecta y colabora con la comunidad NATUR
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Sidebar - Chat Rooms */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Chats</h3>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar chats..."
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {chatRooms.map((room) => (
                <Card 
                  key={room.id}
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                    activeRoom === room.id ? 'bg-green-50 border-green-200' : ''
                  }`}
                  onClick={() => setActiveRoom(room.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <room.icon className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">
                            {room.name}
                          </p>
                          {room.unread > 0 && (
                            <Badge className="bg-red-500 text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                              {room.unread}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {room.participants}
                          </span>
                          <span>{room.type}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    {activeRoomData && <activeRoomData.icon className="h-5 w-5 text-green-600" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {activeRoomData?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {activeRoomData?.participants} participantes • {activeRoomData?.description}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[70%] ${
                        message.isOwn ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.avatar} alt={message.user} />
                          <AvatarFallback>
                            {message.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${
                          message.isOwn 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          {!message.isOwn && (
                            <p className="font-semibold text-xs mb-1 text-gray-600">
                              {message.user}
                            </p>
                          )}
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Escribe tu mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};