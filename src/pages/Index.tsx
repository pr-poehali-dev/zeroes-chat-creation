import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("общий");

  const rooms = ["общий", "музыка", "игры", "флуд", "помощь"];
  const users = [
    { name: "Алекс", status: "online", avatar: "🎮" },
    { name: "Мария", status: "online", avatar: "🎵" },
    { name: "Дима", status: "offline", avatar: "💻" },
    { name: "Катя", status: "online", avatar: "🎨" },
    { name: "Макс", status: "offline", avatar: "🚀" },
  ];

  const messages = [
    { user: "Алекс", message: "Привет всем! 😊", time: "14:23", room: "общий" },
    {
      user: "Мария",
      message: "Кто слушает новый альбом?",
      time: "14:25",
      room: "музыка",
    },
    {
      user: "Дима",
      message: "Помогите с кодом плиз",
      time: "14:27",
      room: "помощь",
    },
    {
      user: "Катя",
      message: "Классная картинка! 🎨",
      time: "14:30",
      room: "общий",
    },
  ];

  const emojis = [
    "😊",
    "😂",
    "😍",
    "🤔",
    "👍",
    "❤️",
    "🔥",
    "⭐",
    "🎉",
    "🎮",
    "🎵",
    "💻",
  ];

  const LoginForm = () => (
    <div className="min-h-screen bg-y2k-mesh flex items-center justify-center p-4">
      <Card className="w-full max-w-md y2k-card backdrop-blur-lg bg-opacity-90">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold accent-font bg-y2k-gradient bg-clip-text text-transparent">
            ЧАТ 2000
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Добро пожаловать в эпоху Y2K
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Никнейм</label>
            <Input
              placeholder="Введите ваш никнейм"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="y2k-input"
            />
          </div>
          <Button
            onClick={() => username && setIsLoggedIn(true)}
            className="w-full y2k-button"
            disabled={!username}
          >
            <Icon name="Zap" className="mr-2" size={18} />
            Войти в чат
          </Button>
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">или войти как гость</p>
            <Button
              variant="outline"
              onClick={() => {
                setUsername("Гость" + Math.floor(Math.random() * 1000));
                setIsLoggedIn(true);
              }}
              className="w-full"
            >
              <Icon name="User" className="mr-2" size={18} />
              Гостевой вход
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ChatInterface = () => (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-card border-r border-border">
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold accent-font bg-y2k-gradient bg-clip-text text-transparent">
              ЧАТ 2000
            </h2>
          </div>

          <Tabs defaultValue="rooms" className="w-full">
            <TabsList className="grid w-full grid-cols-2 m-2">
              <TabsTrigger value="rooms">Комнаты</TabsTrigger>
              <TabsTrigger value="users">Пользователи</TabsTrigger>
            </TabsList>

            <TabsContent value="rooms" className="p-4">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-2">
                  {rooms.map((room) => (
                    <Button
                      key={room}
                      variant={selectedRoom === room ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedRoom(room)}
                    >
                      <Icon name="Hash" className="mr-2" size={16} />
                      {room}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="users" className="p-4">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-3">
                  {users.map((user) => (
                    <div
                      key={user.name}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.name}</span>
                          <div
                            className={
                              user.status === "online"
                                ? "status-online"
                                : "status-offline"
                            }
                          ></div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          user.status === "online" ? "default" : "secondary"
                        }
                      >
                        {user.status === "online" ? "В сети" : "Не в сети"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Hash" size={20} />
                <h3 className="font-semibold">{selectedRoom}</h3>
                <Badge variant="secondary">42 участника</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Icon name="Settings" size={16} />
                </Button>
                <Button size="sm" variant="outline">
                  <Icon name="User" size={16} />
                  {username}
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages
                .filter((msg) => msg.room === selectedRoom)
                .map((msg, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{msg.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">
                          {msg.time}
                        </span>
                      </div>
                      <div className="chat-bubble">{msg.message}</div>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex space-x-1">
                {emojis.map((emoji) => (
                  <Button
                    key={emoji}
                    size="sm"
                    variant="ghost"
                    className="text-lg p-1 h-8 w-8"
                    onClick={() => setNewMessage((prev) => prev + emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Напишите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="y2k-input"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setNewMessage("");
                  }
                }}
              />
              <Button className="y2k-button">
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return <ChatInterface />;
};

export default Index;
