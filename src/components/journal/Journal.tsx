import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Sparkles, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  date: Date;
  mood: string;
  content: string;
  aiReflection?: string;
  sentiment: string;
}

const moodOptions = [
  { emoji: "😊", label: "happy", color: "bg-yellow-100 text-yellow-800" },
  { emoji: "😌", label: "calm", color: "bg-blue-100 text-blue-800" },
  { emoji: "😐", label: "neutral", color: "bg-gray-100 text-gray-800" },
  { emoji: "😰", label: "stressed", color: "bg-orange-100 text-orange-800" },
  { emoji: "😢", label: "sad", color: "bg-purple-100 text-purple-800" },
];

const journalPrompts = [
  "How are you feeling today?",
  "What's one thing you are grateful for right now?",
  "What challenge did you overcome today?",
  "Name one small thing you'll do for self-care today.",
  "What made you smile today?",
  "What's one lesson you learned this week?",
  "Describe a moment when you felt proud of yourself.",
  "What's something you're looking forward to?",
  "How did you show kindness today?",
  "What would you tell your past self from a year ago?"
];

export const Journal = () => {
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: new Date(Date.now() - 86400000), // Yesterday
      mood: "calm",
      content: "Had a great meditation session this morning. Feeling more centered and ready to tackle the day. The breathing exercises really helped with my anxiety.",
      aiReflection: "It's wonderful that you're finding meditation helpful for managing anxiety. Regular practice can build resilience and improve emotional regulation.",
      sentiment: "positive"
    },
    {
      id: "2", 
      date: new Date(Date.now() - 172800000), // Two days ago
      mood: "stressed",
      content: "Work was overwhelming today. Had three deadlines and felt like I couldn't catch up. Need to work on time management and asking for help when needed.",
      aiReflection: "Recognizing when you're overwhelmed is an important skill. Consider breaking large tasks into smaller steps and remember that it's okay to ask for support.",
      sentiment: "neutral"
    }
  ]);
  const { toast } = useToast();

  const generateRandomPrompt = () => {
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setCurrentEntry(randomPrompt + "\n\n");
  };

  const saveEntry = () => {
    if (!currentEntry.trim() || !selectedMood) {
      toast({
        title: "Missing Information",
        description: "Please write something and select your mood",
        variant: "destructive",
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood: selectedMood,
      content: currentEntry,
      aiReflection: generateAIReflection(currentEntry, selectedMood),
      sentiment: analyzeSentiment(currentEntry)
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry("");
    setSelectedMood("");
    setIsWriting(false);
    
    toast({
      title: "Entry Saved! ✨",
      description: "You earned 5 points for journaling today",
    });
  };

  const generateAIReflection = (content: string, mood: string) => {
    // Simple AI reflection based on content and mood
    if (mood === "sad" || mood === "stressed") {
      return "Your feelings are valid and it's okay to have difficult days. Remember that emotions are temporary and you have the strength to navigate through this.";
    }
    if (mood === "happy" || mood === "calm") {
      return "It's beautiful to see you experiencing positive moments. Try to savor these feelings and remember them during challenging times.";
    }
    return "Thank you for sharing your thoughts. Regular reflection helps build self-awareness and emotional intelligence.";
  };

  const analyzeSentiment = (content: string) => {
    const positiveWords = ["good", "great", "happy", "wonderful", "amazing", "grateful", "proud", "love"];
    const negativeWords = ["bad", "awful", "terrible", "sad", "angry", "frustrated", "worried", "anxious"];
    
    const words = content.toLowerCase().split(" ");
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    if (positiveCount > negativeCount) return "positive";
    if (negativeCount > positiveCount) return "negative";
    return "neutral";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Daily Journal</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="write">Write Entry</TabsTrigger>
          <TabsTrigger value="history">Past Entries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Today's Entry</h3>
                <Button variant="outline" size="sm" onClick={generateRandomPrompt}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get Prompt
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mood Selector */}
              <div>
                <label className="text-sm font-medium mb-2 block">How are you feeling today?</label>
                <div className="flex space-x-2">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.label}
                      variant={selectedMood === mood.label ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMood(mood.label)}
                      className="flex-col h-auto py-2"
                    >
                      <span className="text-lg">{mood.emoji}</span>
                      <span className="text-xs capitalize">{mood.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Writing Area */}
              <div>
                <Textarea
                  placeholder="Write about your day, thoughts, feelings, or anything that's on your mind..."
                  value={currentEntry}
                  onChange={(e) => {
                    setCurrentEntry(e.target.value);
                    if (!isWriting && e.target.value.trim()) {
                      setIsWriting(true);
                    }
                  }}
                  className="min-h-[200px] resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {currentEntry.length} characters
                </div>
                <Button onClick={saveEntry} disabled={!currentEntry.trim() || !selectedMood}>
                  <Plus className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="space-y-4">
            {entries.map((entry) => {
              const mood = moodOptions.find(m => m.label === entry.mood);
              return (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{mood?.emoji}</span>
                        <div>
                          <h4 className="font-medium capitalize">{entry.mood}</h4>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {entry.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className={
                        entry.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                        entry.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {entry.sentiment}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{entry.content}</p>
                    {entry.aiReflection && (
                      <div className="bg-muted p-3 rounded-md">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">AI Reflection</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{entry.aiReflection}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
            
            {entries.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No entries yet</h3>
                  <p className="text-muted-foreground mb-4">Start your wellness journey by writing your first journal entry.</p>
                  <Button onClick={() => setIsWriting(true)}>
                    Write First Entry
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};