import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SurveyCard } from "@/components/SurveyCard";
import { EncryptionStatus } from "@/components/EncryptionStatus";
import { CreateSurveyDialog } from "@/components/CreateSurveyDialog";
import { SurveyDetailsDialog } from "@/components/SurveyDetailsDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Survey {
  title: string;
  description: string;
  responses: number;
  status: "active" | "draft" | "closed";
  date: string;
  color: "blue" | "teal" | "amber";
}

const Index = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      title: "Employee Satisfaction Survey",
      description: "Anonymous feedback on workplace culture and satisfaction",
      responses: 42,
      status: "active" as const,
      date: "Nov 1, 2025",
      color: "blue" as const,
    },
    {
      title: "Product Feedback Collection",
      description: "Gather honest opinions about new product features",
      responses: 18,
      status: "active" as const,
      date: "Nov 3, 2025",
      color: "teal" as const,
    },
    {
      title: "Healthcare Privacy Study",
      description: "Sensitive medical information collection with full anonymity",
      responses: 67,
      status: "closed" as const,
      date: "Oct 28, 2025",
      color: "amber" as const,
    },
  ]);

  const handleCreateSurvey = (newSurvey: { title: string; description: string }) => {
    const colors: ("blue" | "teal" | "amber")[] = ["blue", "teal", "amber"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const survey: Survey = {
      ...newSurvey,
      responses: 0,
      status: "active",
      date: new Date().toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      color: randomColor,
    };
    setSurveys([survey, ...surveys]);
  };

  const handleViewDetails = (survey: Survey) => {
    setSelectedSurvey(survey);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Your Surveys</h2>
            <p className="text-muted-foreground">
              Manage encrypted surveys with complete privacy protection
            </p>
          </div>
          
          <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="w-5 h-5" />
            Create Survey
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey, index) => (
            <SurveyCard 
              key={index} 
              {...survey} 
              onViewDetails={() => handleViewDetails(survey)}
            />
          ))}
        </div>
      </main>
      
      <EncryptionStatus />
      
      <CreateSurveyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateSurvey={handleCreateSurvey}
      />
      
      <SurveyDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        survey={selectedSurvey}
      />
    </div>
  );
};

export default Index;
