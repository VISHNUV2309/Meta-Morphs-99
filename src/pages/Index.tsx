import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { AIChat } from "@/components/chat/AIChat";
import { Journal } from "@/components/journal/Journal";
import { Quiz } from "@/components/quiz/Quiz";
import { Music } from "@/components/music/Music";
import { Progress } from "@/components/progress/Progress";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onPageChange={setCurrentPage} />;
      case "chat":
        return <AIChat />;
      case "journal":
        return <Journal />;
      case "quiz":
        return <Quiz />;
      case "music":
        return <Music />;
      case "progress":
        return <Progress />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <AppLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </AppLayout>
  );
};

export default Index;
