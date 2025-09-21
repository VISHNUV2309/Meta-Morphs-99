import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Trophy, Star } from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export const TopBar = ({ onMenuClick }: TopBarProps) => {
  // Mock user data - in real app this would come from context/state
  const userLevel = 2;
  const userPoints = 750;
  const userStreak = 5;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold">Good morning! 🌅</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
            <Star className="h-3 w-3" />
            <span>Level {userLevel}</span>
          </Badge>
          
          <Badge variant="outline" className="flex items-center space-x-1">
            <Trophy className="h-3 w-3" />
            <span className="hidden sm:inline">Streak:</span>
            <span>{userStreak}d</span>
          </Badge>
          
          <Badge className="bg-primary text-primary-foreground">
            {userPoints} pts
          </Badge>
        </div>
      </div>
    </header>
  );
};