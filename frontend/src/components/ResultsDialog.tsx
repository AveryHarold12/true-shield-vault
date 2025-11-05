import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Progress } from './ui/progress';

interface SurveyResult {
  pvp: number;
  pve: number;
  economic: number;
  others: number;
}

interface ResultsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  results: SurveyResult | null;
  onDecrypt: () => Promise<void>;
  isDecrypting: boolean;
}

export function ResultsDialog({
  isOpen,
  onClose,
  results,
  onDecrypt,
  isDecrypting
}: ResultsDialogProps) {
  const totalVotes = results
    ? results.pvp + results.pve + results.economic + results.others
    : 0;

  const getPercentage = (value: number) => {
    return totalVotes > 0 ? (value / totalVotes) * 100 : 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Survey Results</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {!results ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Results are encrypted. Click below to decrypt and view the results.
              </p>
              <Button onClick={onDecrypt} disabled={isDecrypting}>
                {isDecrypting ? 'Decrypting...' : 'Decrypt Results'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Total votes: {totalVotes}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>PvP Preference</span>
                    <span>{results.pvp} ({getPercentage(results.pvp).toFixed(1)}%)</span>
                  </div>
                  <Progress value={getPercentage(results.pvp)} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>PvE Preference</span>
                    <span>{results.pve} ({getPercentage(results.pve).toFixed(1)}%)</span>
                  </div>
                  <Progress value={getPercentage(results.pve)} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Economic Focus</span>
                    <span>{results.economic} ({getPercentage(results.economic).toFixed(1)}%)</span>
                  </div>
                  <Progress value={getPercentage(results.economic)} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Other Preferences</span>
                    <span>{results.others} ({getPercentage(results.others).toFixed(1)}%)</span>
                  </div>
                  <Progress value={getPercentage(results.others)} className="h-2" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
