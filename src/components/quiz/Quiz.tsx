import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "What is one healthy way to cope with stress?",
    choices: ["Ignoring it", "Deep breathing", "Overthinking", "Skipping meals"],
    correctAnswer: 1,
    explanation: "Deep breathing activates the parasympathetic nervous system, which helps your body relax and reduces stress hormones.",
    topic: "stress"
  },
  {
    id: "2", 
    question: "What's the recommended sleep duration for young adults?",
    choices: ["4-5 hours", "6-7 hours", "8-10 hours", "12+ hours"],
    correctAnswer: 2,
    explanation: "Young adults typically need 7-9 hours of sleep per night for optimal physical and mental health.",
    topic: "sleep"
  },
  {
    id: "3",
    question: "Which activity naturally boosts mood?",
    choices: ["Regular exercise", "Excessive caffeine", "Social media scrolling", "Skipping breakfast"],
    correctAnswer: 0,
    explanation: "Regular exercise releases endorphins, which are natural mood boosters and help reduce symptoms of depression and anxiety.",
    topic: "self-care"
  },
  {
    id: "4",
    question: "What's a healthy coping strategy for panic attacks?",
    choices: ["Hold your breath", "Slow breathing + ground 5 things you can see", "Run away", "Isolate completely"],
    correctAnswer: 1,
    explanation: "The 5-4-3-2-1 grounding technique combined with deep breathing helps bring your attention to the present moment and calm your nervous system.",
    topic: "coping"
  },
  {
    id: "5",
    question: "What does emotional intelligence include?",
    choices: ["Only understanding your own emotions", "Recognizing and managing emotions in yourself and others", "Avoiding all negative emotions", "Never showing emotions"],
    correctAnswer: 1,
    explanation: "Emotional intelligence involves recognizing, understanding, and managing both your own emotions and those of others effectively.",
    topic: "emotional-intelligence"
  },
  {
    id: "6",
    question: "Which is a sign of good mental health boundaries?",
    choices: ["Saying yes to everything", "Never asking for help", "Saying no when overwhelmed", "Isolating from everyone"],
    correctAnswer: 2,
    explanation: "Setting healthy boundaries by saying no when you're overwhelmed helps prevent burnout and maintains your mental wellbeing.",
    topic: "self-care"
  },
  {
    id: "7",
    question: "What's an effective mindfulness technique?",
    choices: ["Multitasking constantly", "Body scan meditation", "Avoiding the present moment", "Rushing through activities"],
    correctAnswer: 1,
    explanation: "Body scan meditation helps you become aware of physical sensations and brings your attention to the present moment.",
    topic: "mindfulness"
  },
  {
    id: "8",
    question: "How can you support a friend experiencing anxiety?",
    choices: ["Tell them to 'just relax'", "Listen without judgment and validate their feelings", "Avoid them until they feel better", "Give them lots of advice"],
    correctAnswer: 1,
    explanation: "Active listening and validation help people feel heard and supported, which can be incredibly therapeutic during anxious moments.",
    topic: "support"
  },
  {
    id: "9",
    question: "What's a healthy way to process difficult emotions?",
    choices: ["Suppress them completely", "Journaling or talking to someone trusted", "Distracting yourself constantly", "Judging yourself for having them"],
    correctAnswer: 1,
    explanation: "Expressing emotions through writing or talking helps process them in a healthy way and prevents emotional buildup.",
    topic: "coping"
  },
  {
    id: "10",
    question: "Which habit supports long-term mental wellness?",
    choices: ["Perfectionism in everything", "Regular self-reflection and self-care", "Comparing yourself to others constantly", "Avoiding all challenges"],
    correctAnswer: 1,
    explanation: "Regular self-reflection helps you understand your patterns and needs, while consistent self-care maintains your mental health foundation.",
    topic: "self-care"
  }
];

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizStats, setQuizStats] = useState({
    totalAttempted: 45,
    correctAnswers: 32,
    streak: 3,
    pointsEarned: 320
  });
  const { toast } = useToast();

  const topics = ["all", "stress", "sleep", "self-care", "coping", "emotional-intelligence", "mindfulness", "support"];

  const getRandomQuestion = (topic: string = "all") => {
    let filteredQuestions = quizQuestions;
    if (topic !== "all") {
      filteredQuestions = quizQuestions.filter(q => q.topic === topic);
    }
    
    if (filteredQuestions.length === 0) {
      filteredQuestions = quizQuestions; // Fallback to all questions
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  };

  const startQuiz = (topic: string = "all") => {
    const question = getRandomQuestion(topic);
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Update stats
    setQuizStats(prev => ({
      ...prev,
      totalAttempted: prev.totalAttempted + 1,
      correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
      streak: correct ? prev.streak + 1 : 0,
      pointsEarned: prev.pointsEarned + (correct ? 10 : 0)
    }));

    // Show toast notification
    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: "You earned 10 points!",
      });
    } else {
      toast({
        title: "Not quite right 😊",
        description: "Keep learning - every attempt helps you grow!",
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion) {
      const newQuestion = getRandomQuestion(currentQuestion.topic);
      setCurrentQuestion(newQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>Mental Wellness Quizzes</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{quizStats.totalAttempted}</div>
              <p className="text-xs text-muted-foreground">Total Attempted</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{Math.round((quizStats.correctAnswers / quizStats.totalAttempted) * 100)}%</div>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{quizStats.streak}</div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{quizStats.pointsEarned}</div>
              <p className="text-xs text-muted-foreground">Points Earned</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {!currentQuestion ? (
        /* Topic Selection */
        <Card>
          <CardHeader>
            <CardTitle>Choose a Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {topics.map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  onClick={() => startQuiz(topic)}
                >
                  <Brain className="h-6 w-6" />
                  <span className="text-sm capitalize">{topic.replace('-', ' ')}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Quiz Question */
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="capitalize">
                {currentQuestion.topic.replace('-', ' ')}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentQuestion(null)}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                New Topic
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
              
              <div className="space-y-3">
                {currentQuestion.choices.map((choice, index) => (
                  <Button
                    key={index}
                    variant={
                      showResult 
                        ? index === currentQuestion.correctAnswer
                          ? "default"
                          : selectedAnswer === index 
                            ? "destructive" 
                            : "outline"
                        : selectedAnswer === index 
                          ? "default" 
                          : "outline"
                    }
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => !showResult && setSelectedAnswer(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{choice}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {showResult && (
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <h4 className="font-medium">
                    {isCorrect ? "Correct!" : "Not quite right"}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex space-x-3">
              {!showResult ? (
                <Button 
                  onClick={submitAnswer} 
                  disabled={selectedAnswer === null}
                  className="flex-1"
                >
                  Submit Answer
                </Button>
              ) : (
                <>
                  <Button onClick={nextQuestion} className="flex-1">
                    Next Question
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentQuestion(null)}>
                    Choose Topic
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  🧠
                </div>
                <div>
                  <p className="font-medium">Quiz Master</p>
                  <p className="text-sm text-muted-foreground">Completed 50 quizzes</p>
                </div>
              </div>
              <Badge variant="secondary">+50 pts</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  🎯
                </div>
                <div>
                  <p className="font-medium">Perfect Score</p>
                  <p className="text-sm text-muted-foreground">Got 10 questions right in a row</p>
                </div>
              </div>
              <Badge variant="secondary">+100 pts</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};