import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Wallet Disconnected" : "Wallet Connected",
      description: isConnected 
        ? "Your wallet has been disconnected" 
        : "Rainbow Wallet connected successfully",
    });
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="HiddenForm Logo" className="w-10 h-10" />
          <div>
            <h1 className="text-lg font-semibold text-foreground">HiddenForm Insight Lab</h1>
            <p className="text-xs text-muted-foreground">Privacy-First Survey Platform</p>
          </div>
        </div>
        
        <Button 
          variant={isConnected ? "secondary" : "default"} 
          className="gap-2"
          onClick={handleConnectWallet}
        >
          {isConnected ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Connected
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Connect Wallet
            </>
          )}
        </Button>
      </div>
    </header>
  );
};
