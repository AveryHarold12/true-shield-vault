import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CreateSurveyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateSurvey: (survey: {
    title: string;
    description: string;
  }) => void;
}

export const CreateSurveyDialog = ({
  open,
  onOpenChange,
  onCreateSurvey,
}: CreateSurveyDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onCreateSurvey({ title, description });
    setTitle("");
    setDescription("");
    onOpenChange(false);
    
    toast({
      title: "Survey Created",
      description: "Your encrypted survey has been created successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Survey</DialogTitle>
          <DialogDescription>
            Create an encrypted survey to collect anonymous responses
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Survey Title</Label>
              <Input
                id="title"
                placeholder="Enter survey title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your survey purpose"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Survey</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
