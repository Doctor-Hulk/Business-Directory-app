import { X, Home, Search, Plus, Bookmark, User, Settings, HelpCircle, LogOut, Building2, CreditCard, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ isOpen, onClose, activeTab, onTabChange }: SidebarProps) {
  const navigationItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "hubs", icon: Building2, label: "Explore Hubs" },
    { id: "search", icon: Search, label: "Search" },
    { id: "pricing", icon: Plus, label: "ADD HUB" },
    { id: "bookmarks", icon: Bookmark, label: "Bookmarks" },
  ];

  const accountItems = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "help", icon: HelpCircle, label: "Help & Support" },
  ];

  const handleItemClick = (id: string) => {
    onTabChange(id);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-72 md:w-80`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border bg-gradient-to-r from-primary/5 to-green-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <span className="text-sidebar-foreground text-lg font-medium bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">NOBOX HUB</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-sidebar-foreground hover:bg-primary/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sidebar-foreground text-sm font-medium mb-3 px-3">
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className={`w-full justify-start gap-3 h-10 px-3 ${
                          isActive
                            ? "bg-gradient-to-r from-primary/10 to-green-50 text-primary border-r-2 border-primary"
                            : "text-sidebar-foreground hover:bg-gradient-to-r hover:from-primary/5 hover:to-green-25"
                        }`}
                        onClick={() => handleItemClick(item.id)}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    );
                  })}
                </nav>
              </div>

              <Separator className="bg-sidebar-border" />

              <div>
                <h3 className="text-sidebar-foreground text-sm font-medium mb-3 px-3">
                  Account
                </h3>
                <nav className="space-y-1">
                  {accountItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className={`w-full justify-start gap-3 h-10 px-3 ${
                          isActive
                            ? "bg-gradient-to-r from-primary/10 to-green-50 text-primary border-r-2 border-primary"
                            : "text-sidebar-foreground hover:bg-gradient-to-r hover:from-primary/5 hover:to-green-25"
                        }`}
                        onClick={() => handleItemClick(item.id)}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3 text-sidebar-foreground hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}