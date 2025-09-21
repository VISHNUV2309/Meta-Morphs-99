import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Heart, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  escalate?: boolean;
  suggestedActions?: string[];
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! 👋 I'm your personal wellness assistant. I'm here to listen, support, and provide helpful tips. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
      suggestedActions: ["I feel anxious", "How to sleep better?", "I need motivation", "Tell me about breathing exercises"]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample AI responses based on user input patterns
  const getAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis detection
    if (lowerMessage.includes("want to die") || 
        lowerMessage.includes("kill myself") || 
        lowerMessage.includes("can't cope") ||
        lowerMessage.includes("end it all")) {
      return {
        id: `ai-${Date.now()}`,
        content: "I'm really concerned about you right now. Your feelings are valid, but please know that you don't have to go through this alone. I'm going to connect you with professional support right away. In the meantime, please reach out to the crisis helpline: 988 (Suicide & Crisis Lifeline) available 24/7.",
        sender: "ai",
        timestamp: new Date(),
        escalate: true,
        suggestedActions: ["Call 988 now", "Text HOME to 741741", "Find local support", "Talk to someone I trust"]
      };
    }
    
    // Anxiety responses
    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("worried")) {
      return {
        id: `ai-${Date.now()}`,
        content: "I hear that you're feeling anxious, and that's completely understandable. Anxiety is something many people experience. Let's try a quick breathing exercise together:\n\n1. Breathe in slowly for 4 counts\n2. Hold your breath for 4 counts\n3. Exhale slowly for 6 counts\n\nRepeat this 3-5 times. Would you like to try journaling about what's making you feel anxious today?",
        sender: "ai",
        timestamp: new Date(),
        suggestedActions: ["Start breathing exercise", "Write in journal", "Learn more about anxiety", "Listen to calming music"]
      };
    }
    
    // Sleep responses
    if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("insomnia")) {
      return {
        id: `ai-${Date.now()}`,
        content: "Good sleep is so important for mental wellness. Here are some tips that can help:\n\n• Create a bedtime routine 30 minutes before sleep\n• Avoid screens for 1 hour before bed\n• Keep your room cool and dark\n• Try the 4-7-8 breathing technique\n\nWould you like me to suggest some relaxing music from our Sleep playlist?",
        sender: "ai",
        timestamp: new Date(),
        suggestedActions: ["Play sleep music", "Learn 4-7-8 breathing", "Set bedtime reminder", "Journal about sleep"]
      };
    }
    
    // Stress responses  
    if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelmed") || lowerMessage.includes("pressure")) {
      return {
        id: `ai-${Date.now()}`,
        content: "Feeling stressed is your mind's way of telling you it needs some care. Let's break this down together:\n\n• What's one small thing you can control right now?\n• Have you taken any breaks today?\n• Remember: you don't have to do everything perfectly\n\nTaking a few deep breaths and focusing on the present moment can help. What would feel most helpful right now?",
        sender: "ai",
        timestamp: new Date(),
        suggestedActions: ["Take a 5-minute break", "Practice mindfulness", "Take a quiz on stress", "Listen to focus music"]
      };
    }
    
    // Default supportive response
    return {
      id: `ai-${Date.now()}`,
      content: "Thank you for sharing that with me. I'm here to listen and support you. Every feeling you have is valid, and it's brave of you to reach out. Remember that taking small steps toward wellness is still progress. What would be most helpful for you right now?",
      sender: "ai",
      timestamp: new Date(),
      suggestedActions: ["Tell me more", "Take a wellness quiz", "Write in journal", "Listen to uplifting music"]
    };
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Show crisis alert if escalation is needed
      if (aiResponse.escalate) {
        toast({
          title: "Crisis Support Available",
          description: "Professional help is available 24/7. You are not alone.",
          variant: "destructive",
        });
      }
    }, 1000 + Math.random() * 2000);
  };

  const handleSuggestedAction = (action: string) => {
    setInputMessage(action);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Wellness Assistant</span>
            <Badge variant="secondary" className="ml-auto">24/7 Available</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.sender === 'ai' && (
                        <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <User className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        {message.escalate && (
                          <div className="flex items-center space-x-1 mb-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium text-red-500">Crisis Support</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    
                    {message.suggestedActions && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs opacity-70">Suggested actions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestedActions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleSuggestedAction(action)}
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Heart className="h-4 w-4 text-red-500" />
              <p className="text-xs text-muted-foreground">
                This AI provides support but isn't a replacement for professional mental health care.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};