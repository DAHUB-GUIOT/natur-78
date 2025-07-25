import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Phone, Mail, User } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  subject?: string;
  content: string;
  isRead: boolean;
  messageType: string;
  createdAt: string;
}

interface Conversation {
  id: number;
  participant1Id: number;
  participant2Id: number;
  lastMessageId?: number;
  lastActivity: string;
  createdAt: string;
}

export function MessageCenter() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newConversationReceiver, setNewConversationReceiver] = useState("");
  const queryClient = useQueryClient();

  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ["/api/messages/conversations"],
  });

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ["/api/messages", selectedConversation],
    enabled: !!selectedConversation,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (messageData: { receiverId: number; content: string; subject?: string }) =>
      apiRequest("/api/messages", {
        method: "POST",
        body: JSON.stringify(messageData),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      setNewMessage("");
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // For now, we'll send to the first participant (this should be improved)
    sendMessageMutation.mutate({
      receiverId: selectedConversation, // This should be the actual receiver ID
      content: newMessage,
    });
  };

  return (
    <div className="h-full flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Conversaciones
          </h3>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No hay conversaciones aún</p>
              <p className="text-sm">Inicia una conversación enviando un mensaje</p>
            </div>
          ) : (
            conversations.map((conversation: Conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      Usuario {conversation.participant1Id === conversation.participant2Id ? conversation.participant2Id : conversation.participant1Id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(conversation.lastActivity).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Nueva
                  </Badge>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedConversation ? (
          <>
            {/* Messages Header */}
            <div className="p-4 bg-white border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Conversación</h3>
                    <p className="text-sm text-gray-500">En línea</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No hay mensajes en esta conversación</p>
                  <p className="text-sm">Envía el primer mensaje</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message: Message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === selectedConversation ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.senderId === selectedConversation
                            ? "bg-white border"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === selectedConversation ? "text-gray-500" : "text-green-100"
                        }`}>
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 min-h-[40px] max-h-[120px]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sendMessageMutation.isPending}
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Selecciona una conversación</h3>
              <p>Elige una conversación para ver los mensajes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}