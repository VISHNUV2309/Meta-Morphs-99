import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  BookOpen, 
  Brain, 
  Music, 
  Trophy,
  TrendingUp,
  Calendar,
  Target
} from "lucide-react";

interface DashboardProps {
  onPageChange: (page: string) => void;
}

export const Dashboard = ({ onPageChange }: DashboardProps) => {
  // Mock data - in real app this would come from context/state
  const todaysMood = "calm";
  const weeklyProgress = 65;
  const streakDays = 5;
  const completedToday = ["mood", "journal"];
  const totalPoints = 750;
  const currentLevel = 2;
  const pointsToNextLevel = 750;

  const quickActions = [
    { id: "chat", label: "Chat with AI", icon: MessageCircle, color: "bg-primary" },
    { id: "journal", label: "Write Journal", icon: BookOpen, color: "bg-accent" },
    { id: "quiz", label: "Take Quiz", icon: Brain, color: "bg-secondary" },
    { id: "music", label: "Play Music", icon: Music, color: "bg-muted" },
  ];

  const moodEmoji = {
    happy: "😊",
    calm: "😌", 
    neutral: "😐",
    stressed: "😰",
    sad: "😢"
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back! 🌟</h1>
        <p className="text-muted-foreground">How are you feeling today?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Mood</CardTitle>
            <span className="text-2xl">{moodEmoji[todaysMood as keyof typeof moodEmoji]}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{todaysMood}</div>
            <p className="text-xs text-muted-foreground">
              You're doing great today!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streakDays} days</div>
            <p className="text-xs text-muted-foreground">
              Keep it up! 🔥
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {currentLevel}</div>
            <Progress value={(totalPoints / pointsToNextLevel) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {pointsToNextLevel - totalPoints} points to Level {currentLevel + 1}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Start your wellness journey with these activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  onClick={() => onPageChange(action.id)}
                >
                  <div className={`p-2 rounded-full ${action.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Today's Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Weekly Goal Progress</span>
              <Badge variant="secondary">{weeklyProgress}%</Badge>
            </div>
            <Progress value={weeklyProgress} />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${completedToday.includes('mood') ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm">Mood check</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${completedToday.includes('journal') ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm">Journal entry</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${completedToday.includes('quiz') ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm">Complete quiz</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${completedToday.includes('music') ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm">Listen to music</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};