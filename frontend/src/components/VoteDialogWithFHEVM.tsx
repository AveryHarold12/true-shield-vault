import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface VoteDialogWithFHEVMProps {
  isOpen: boolean;
  onClose: () => void;
  onVote: (preferences: Record<string, number>) => Promise<void>;
  surveyId: bigint;
  isVoting: boolean;
}

export function VoteDialogWithFHEVM({
  isOpen,
  onClose,
  onVote,
  surveyId,
  isVoting
}: VoteDialogWithFHEVMProps) {
  const [preferences, setPreferences] = useState<Record<string, number>>({
    pvp: 0,
    pve: 0,
    economic: 0,
    others: 0
  });

  const handlePreferenceChange = (category: string, value: number) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = async () => {
    await onVote(preferences);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Your Game Preferences</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">PvP Preference</Label>
              <RadioGroup
                value={preferences.pvp.toString()}
                onValueChange={(value) => handlePreferenceChange('pvp', parseInt(value))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="pvp-1" />
                  <Label htmlFor="pvp-1">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="pvp-2" />
                  <Label htmlFor="pvp-2">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="pvp-3" />
                  <Label htmlFor="pvp-3">High</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">PvE Preference</Label>
              <RadioGroup
                value={preferences.pve.toString()}
                onValueChange={(value) => handlePreferenceChange('pve', parseInt(value))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="pve-1" />
                  <Label htmlFor="pve-1">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="pve-2" />
                  <Label htmlFor="pve-2">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="pve-3" />
                  <Label htmlFor="pve-3">High</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">Economic Preference</Label>
              <RadioGroup
                value={preferences.economic.toString()}
                onValueChange={(value) => handlePreferenceChange('economic', parseInt(value))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="economic-1" />
                  <Label htmlFor="economic-1">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="economic-2" />
                  <Label htmlFor="economic-2">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="economic-3" />
                  <Label htmlFor="economic-3">High</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">Other Preferences</Label>
              <RadioGroup
                value={preferences.others.toString()}
                onValueChange={(value) => handlePreferenceChange('others', parseInt(value))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="others-1" />
                  <Label htmlFor="others-1">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="others-2" />
                  <Label htmlFor="others-2">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="others-3" />
                  <Label htmlFor="others-3">High</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isVoting}>
            {isVoting ? 'Submitting...' : 'Submit Vote'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
