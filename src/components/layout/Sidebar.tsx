import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  MessageCircle, 
  BookOpen, 
  Brain, 
  Music, 
  Trophy,
  Heart,
  X
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Heart },
  { id: "chat", label: "AI Assistant", icon: MessageCircle },
  { id: "journal", label: "Journal", icon: BookOpen },
  { id: "quiz", label: "Quizzes", icon: Brain },
  { id: "music", label: "Music", icon: Music },
  { id: "progress", label: "Progress", icon: Trophy },
];

export const Sidebar = ({ currentPage, onPageChange, isOpen, onClose }: SidebarProps) => {
  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-card">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">MindfulYou</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                onPageChange(item.id);
                onClose();
              }}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4">
        <div className="rounded-lg bg-muted p-4 text-center">
          <Heart className="mx-auto h-8 w-8 text-primary mb-2" />
          <p className="text-sm font-medium">Your mental wellness matters</p>
          <p className="text-xs text-muted-foreground mt-1">Take one step at a time</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};