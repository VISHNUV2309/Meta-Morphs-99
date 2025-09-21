import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Calendar,
  Star,
  Award,
  Zap,
  Heart
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  points: number;
  earnedDate?: Date;
}

interface Level {
  level: number;
  name: string;
  pointsRequired: number;
  perks: string[];
}

const achievements: Achievement[] = [
  {
    id: "first-journal",
    title: "First Journal",
    description: "Write your first journal entry",
    icon: "📝",
    earned: true,
    points: 10,
    earnedDate: new Date(Date.now() - 432000000) // 5 days ago
  },
  {
    id: "7-day-streak",
    title: "7-Day Streak",
    description: "Complete activities for 7 days in a row",
    icon: "🔥",
    earned: true,
    points: 100,
    earnedDate: new Date(Date.now() - 86400000) // Yesterday
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Complete 50 quizzes",
    icon: "🧠",
    earned: true,
    points: 50
  },
  {
    id: "mood-mapper",
    title: "Mood Mapper",
    description: "Check in with your mood 100 times",
    icon: "😌",
    earned: false,
    points: 75
  },
  {
    id: "kindness-badge",
    title: "Kindness Badge",
    description: "Complete kindness prompt",
    icon: "💝",
    earned: false,
    points: 25
  },
  {
    id: "mindful-month",
    title: "Mindful Month", 
    description: "Complete 30-day streak",
    icon: "🌟",
    earned: false,
    points: 500
  }
];

const levels: Level[] = [
  {
    level: 1,
    name: "Seedling",
    pointsRequired: 0,
    perks: ["Basic theme", "Daily check-ins"]
  },
  {
    level: 2,
    name: "Sprout",
    pointsRequired: 500,
    perks: ["Green theme unlock", "Achievement badges", "Weekly insights"]
  },
  {
    level: 3,
    name: "Bloom",
    pointsRequired: 1500,
    perks: ["Purple theme unlock", "Extra quiz hints", "Mood analytics"]
  },
  {
    level: 4,
    name: "Flourish",
    pointsRequired: 3500,
    perks: ["Gold theme unlock", "Premium playlist access", "Custom reminders"]
  },
  {
    level: 5,
    name: "Wisdom Tree",
    pointsRequired: 7500,
    perks: ["All themes", "Priority AI support", "Advanced analytics"]
  }
];

export const Progress = () => {
  // Mock user data
  const userStats = {
    totalPoints: 750,
    currentLevel: 2,
    currentStreak: 5,
    longestStreak: 12,
    totalJournalEntries: 23,
    totalQuizzes: 45,
    totalMoodChecks: 67,
    weeklyGoalProgress: 65,
    monthlyGoalProgress: 43
  };

  const currentLevel = levels.find(l => l.level === userStats.currentLevel);
  const nextLevel = levels.find(l => l.level === userStats.currentLevel + 1);
  const progressToNext = nextLevel ? 
    ((userStats.totalPoints - currentLevel!.pointsRequired) / (nextLevel.pointsRequired - currentLevel!.pointsRequired)) * 100 
    : 100;

  const earnedAchievements = achievements.filter(a => a.earned);
  const availableAchievements = achievements.filter(a => !a.earned);

  // Mock weekly activity data
  const weeklyActivity = [
    { day: 'Mon', activities: 3, mood: 'happy' },
    { day: 'Tue', activities: 2, mood: 'calm' },
    { day: 'Wed', activities: 4, mood: 'happy' },
    { day: 'Thu', activities: 1, mood: 'neutral' },
    { day: 'Fri', activities: 3, mood: 'calm' },
    { day: 'Sat', activities: 0, mood: null },
    { day: 'Sun', activities: 2, mood: 'happy' }
  ];

  const moodColors = {
    happy: 'bg-yellow-400',
    calm: 'bg-blue-400',
    neutral: 'bg-gray-400',
    stressed: 'bg-orange-400',
    sad: 'bg-purple-400'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>Your Progress</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Current Level & Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Level Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Level {userStats.currentLevel}</h3>
              <p className="text-muted-foreground">{currentLevel?.name}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{userStats.totalPoints}</div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
          
          {nextLevel && (
            <>
              <ProgressBar value={progressToNext} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{currentLevel?.pointsRequired} pts</span>
                <span>{nextLevel.pointsRequired - userStats.totalPoints} to Level {nextLevel.level}</span>
                <span>{nextLevel.pointsRequired} pts</span>
              </div>
            </>
          )}

          {/* Current Level Perks */}
          <div className="space-y-2">
            <h4 className="font-medium">Current Perks:</h4>
            <div className="flex flex-wrap gap-2">
              {currentLevel?.perks.map((perk, index) => (
                <Badge key={index} variant="secondary">
                  {perk}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="space-y-4">
          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userStats.currentStreak}</div>
                  <p className="text-xs text-muted-foreground">Current Streak</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{userStats.longestStreak}</div>
                  <p className="text-xs text-muted-foreground">Longest Streak</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userStats.totalJournalEntries}</div>
                  <p className="text-xs text-muted-foreground">Journal Entries</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.totalQuizzes}</div>
                  <p className="text-xs text-muted-foreground">Quizzes Completed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Goals Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Weekly Goal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Complete 5 activities</span>
                    <span>{Math.round((userStats.weeklyGoalProgress / 100) * 5)}/5</span>
                  </div>
                  <ProgressBar value={userStats.weeklyGoalProgress} />
                  <p className="text-xs text-muted-foreground">
                    Great progress! Keep it up 🌟
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Monthly Goal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>20 days active</span>
                    <span>{Math.round((userStats.monthlyGoalProgress / 100) * 20)}/20</span>
                  </div>
                  <ProgressBar value={userStats.monthlyGoalProgress} />
                  <p className="text-xs text-muted-foreground">
                    You're doing amazing! 💪
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          {/* Earned Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Earned Achievements ({earnedAchievements.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {earnedAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.earnedDate && (
                        <p className="text-xs text-muted-foreground">
                          Earned {achievement.earnedDate.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary">+{achievement.points}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Available Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 border rounded-lg opacity-70">
                    <div className="text-2xl grayscale">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant="outline">+{achievement.points}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>This Week's Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                  {weeklyActivity.map((day, index) => (
                    <div key={day.day} className="text-center space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">
                        {day.day}
                      </div>
                      <div 
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          day.activities > 0 
                            ? day.mood 
                              ? moodColors[day.mood as keyof typeof moodColors]
                              : 'bg-gray-300'
                            : 'bg-gray-200'
                        }`}
                      >
                        {day.activities || '-'}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    <span>No activity</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span>Calm</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span>Happy</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-xl font-bold">{userStats.totalMoodChecks}</div>
                  <p className="text-sm text-muted-foreground">Mood Check-ins</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-xl font-bold">{earnedAchievements.length}</div>
                  <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold">{userStats.currentLevel}</div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};