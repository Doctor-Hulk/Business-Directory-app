import { Home, Plus, User, CreditCard, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";

interface MobileFooterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileFooter({ activeTab, onTabChange }: MobileFooterProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "pricing", icon: Plus, label: "ADD HUB" },
    { id: "hubs", icon: CreditCard, label: "Explore" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-white via-green-50/50 to-emerald-50/50 border-t border-primary/20 z-50 backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-around px-1 py-1 min-w-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-0.5 h-auto py-1 px-1 sm:px-2 min-w-0 flex-1 max-w-none ${
                isActive 
                  ? "text-primary bg-gradient-to-br from-primary/10 to-green-50 rounded-md" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs truncate w-full text-center leading-none">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}