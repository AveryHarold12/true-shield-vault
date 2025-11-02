import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Users, Calendar } from "lucide-react";

interface SurveyCardProps {
  title: string;
  description: string;
  responses: number;
  status: "active" | "draft" | "closed";
  date: string;
  color: "blue" | "teal" | "amber";
  onViewDetails?: () => void;
}

const colorClasses = {
  blue: "bg-primary/5 border-primary/20 hover:border-primary/40",
  teal: "bg-secondary/5 border-secondary/20 hover:border-secondary/40",
  amber: "bg-accent/5 border-accent/20 hover:border-accent/40",
};

const statusColors = {
  active: "bg-secondary text-secondary-foreground",
  draft: "bg-muted text-muted-foreground",
  closed: "bg-destructive/10 text-destructive",
};

export const SurveyCard = ({ title, description, responses, status, date, color, onViewDetails }: SurveyCardProps) => {
  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-lg hover-scale ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-accent" />
          <Badge variant="secondary" className={statusColors[status]}>
            {status}
          </Badge>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{responses} responses</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        
        <Button size="sm" variant="ghost" onClick={onViewDetails}>
          View Details
        </Button>
      </div>
    </Card>
  );
};
