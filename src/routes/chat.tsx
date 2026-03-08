import { useState, useEffect, useRef } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'me' | 'server';
  timestamp: string;
}

export const Route = createFileRoute('/chat')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { permissionError: 'Only logged user can use chat' },
      });
    }
  },
  component: ChatPage,
});

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const socket = new WebSocket('wss://ws.ifelse.io');
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log('WS Connected');
    };

    socket.onmessage = event => {
      const newMessage: ChatMessage = {
        id: Date.now(),
        text: event.data,
        sender: 'server',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, newMessage]);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log('WS Disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !socketRef.current) return;

    socketRef.current.send(inputValue);

    const myMessage: ChatMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, myMessage]);
    setInputValue('');

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className='flex justify-center h-[calc(100vh-200px)]'>
      <Card className='w-full max-w-2xl flex flex-col bg-slate-900 border-slate-800 text-white shadow-2xl '>
        <CardHeader className='border-b border-slate-800'>
          <CardTitle className='flex items-center justify-between '>
            Chat Room
            <span
              className={cn(
                'text-xs px-2 py-1 rounded-full',
                isConnected ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500',
              )}
            >
              {isConnected ? 'Online' : 'Offline'}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent
          ref={scrollContainerRef}
          className='flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900'
        >
          <ScrollArea>
            <div className='space-y-4'>
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-100 rounded-tr-none'}`}
                  >
                    {msg.text}
                  </div>
                  <span className='text-[10px] text-gray-500 mt-1'>{msg.timestamp}</span>
                </div>
              ))}
              {messages.length === 0 && <p className='text-center text-gray-500 mt-10'>No messages yet. Say hi!</p>}
            </div>
          </ScrollArea>
        </CardContent>

        <form onSubmit={handleSendMessage} className='p-4 bg-slate-900/50 border-t border-slate-800 flex gap-2'>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder='Type a message...'
            disabled={!isConnected}
            className='bg-slate-800 border-slate-700 text-white focus-visible:ring-blue-500'
            ref={inputRef}
          />
          <Button type='submit' disabled={!isConnected} className='bg-blue-600 hover:bg-blue-700 shrink-0'>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
}
