import { useState, useMemo, useCallback } from "react";
import { Header } from "./components/header";
import { HomePage } from "./components/home-page";
import { BusinessGrid } from "./components/business-grid";
import { HubModal } from "./components/hub-modal";
import { PricingPage } from "./components/pricing-page";
import { DashboardPage } from "./components/dashboard-page";
import { AddListingPage } from "./components/add-listing-page";
import { MobileFooter } from "./components/mobile-footer";
import { Sidebar } from "./components/sidebar";
import { Button } from "./components/ui/button";

interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  isOpen: boolean;
  services?: string[];
  fullDescription?: string;
  ecoScore?: number; // Eco score rating from 1-5
  followers?: number; // Social media style followers count
  isFollowing?: boolean; // Whether current user follows this business
  clickMetrics?: {
    visits: number;
    calls: number;
    websites: number;
    likes: number;
  };
}

// Generate realistic click metrics based on business rating and review count
const generateClickMetrics = (rating: number, reviewCount: number) => {
  const baseMultiplier = Math.floor(rating * 2) + Math.floor(reviewCount / 10);
  return {
    visits: Math.floor(Math.random() * 1000 + baseMultiplier * 50 + 500),
    calls: Math.floor(Math.random() * 300 + baseMultiplier * 10 + 50),
    websites: Math.floor(Math.random() * 800 + baseMultiplier * 20 + 200),
    likes: Math.floor(Math.random() * 1500 + baseMultiplier * 30 + 300)
  };
};

// Generate eco score based on business category
const generateEcoScore = (category: string) => {
  const ecoFriendlyCategories = {
    "Coffee Shop": 4.2,
    "Restaurant": 3.8,
    "Fitness": 4.1,
    "Retail": 3.5,
    "Professional Services": 4.3,
    "Beauty & Spa": 3.7,
    "Healthcare": 4.0,
    "Education": 4.5,
    "Entertainment": 3.2,
    "Automotive": 2.8
  };
  
  const baseScore = ecoFriendlyCategories[category as keyof typeof ecoFriendlyCategories] || 3.5;
  // Add some random variation (±0.3)
  const variation = (Math.random() - 0.5) * 0.6;
  const finalScore = Math.max(1, Math.min(5, baseScore + variation));
  return Math.round(finalScore * 10) / 10; // Round to 1 decimal
};

// Generate realistic followers count based on business rating and review count
const generateFollowers = (rating: number, reviewCount: number) => {
  const baseMultiplier = Math.floor(rating * 2) + Math.floor(reviewCount / 5);
  return Math.floor(Math.random() * 3000 + baseMultiplier * 100 + 1200);
};

// Core businesses for optimal performance
const rawBusinesses: Business[] = [
  {
    id: "1",
    name: "Downtown Coffee Co.",
    description: "Artisanal coffee roasters serving premium blends in a cozy atmosphere.",
    category: "Coffee Shop",
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1080",
    address: "123 Main St, Downtown",
    phone: "(555) 123-4567",
    website: "https://downtowncoffee.com",
    hours: "6:00 AM - 8:00 PM",
    isOpen: true,
    services: ["Coffee & Espresso", "Pastries", "Free WiFi", "Meeting Rooms"],
    fullDescription: "Downtown Coffee Co. has been serving the community for over 10 years with premium, locally-roasted coffee beans.",
    ecoScore: 4.3,
    followers: 3247,
    clickMetrics: { visits: 2847, calls: 523, websites: 1256, likes: 1834 }
  },
  {
    id: "2", 
    name: "Bella Vista Restaurant",
    description: "Authentic Italian cuisine with fresh ingredients and traditional recipes.",
    category: "Restaurant",
    rating: 4.6,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080",
    address: "456 Oak Avenue, North Side",
    phone: "(555) 234-5678",
    website: "https://bellavista.com",
    hours: "11:00 AM - 10:00 PM",
    isOpen: true,
    services: ["Dine-in", "Takeout", "Catering", "Private Events"],
    fullDescription: "Experience authentic Italian flavors at Bella Vista.",
    ecoScore: 3.9,
    followers: 2834,
    clickMetrics: { visits: 3456, calls: 892, websites: 1789, likes: 2156 }
  },
  {
    id: "3",
    name: "FitLife Gym",
    description: "State-of-the-art fitness facility with personal training and group classes.",
    category: "Fitness",
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1744551472726-24a3eb12e82a?w=1080",
    address: "789 Fitness Blvd, East Side",
    phone: "(555) 345-6789",
    website: "https://fitlifegym.com",
    hours: "5:00 AM - 11:00 PM",
    isOpen: true,
    services: ["Personal Training", "Group Classes", "Cardio Equipment", "Weight Training"],
    fullDescription: "FitLife Gym offers a complete fitness experience.",
    ecoScore: 4.1,
    followers: 4567,
    clickMetrics: { visits: 4123, calls: 756, websites: 2341, likes: 2897 }
  },
  {
    id: "4",
    name: "Urban Style Boutique",
    description: "Trendy fashion boutique featuring the latest styles and accessories.",
    category: "Retail",
    rating: 4.4,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1619335680637-b892ceb9c0af?w=1080",
    address: "321 Fashion Ave, West Side",
    phone: "(555) 456-7890",
    website: "https://urbanstyle.com",
    hours: "10:00 AM - 9:00 PM",
    isOpen: false,
    services: ["Women's Fashion", "Accessories", "Personal Styling", "Gift Cards"],
    fullDescription: "Urban Style Boutique curates the latest fashion trends.",
    ecoScore: 3.5,
    followers: 1923
  },
  {
    id: "5",
    name: "Tech Solutions Pro",
    description: "Professional IT services and computer repair for businesses and individuals.",
    category: "Professional Services",
    rating: 4.9,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1080",
    address: "555 Tech Park Dr, South Side",
    phone: "(555) 567-8901",
    website: "https://techsolutions.com",
    hours: "8:00 AM - 6:00 PM",
    isOpen: true,
    services: ["Computer Repair", "Network Setup", "Data Recovery", "IT Consulting"],
    fullDescription: "Tech Solutions Pro provides comprehensive IT services.",
    ecoScore: 4.3,
    followers: 3782
  }
];

// Process businesses to add click metrics, eco scores, and followers for those that don't have them (done once on module load)
const mockBusinesses: Business[] = rawBusinesses.map(business => ({
  ...business,
  clickMetrics: business.clickMetrics || generateClickMetrics(business.rating, business.reviewCount),
  ecoScore: business.ecoScore !== undefined ? business.ecoScore : generateEcoScore(business.category),
  followers: business.followers !== undefined ? business.followers : generateFollowers(business.rating, business.reviewCount)
}));

// Create initial metrics mapping - use existing metrics or defaults
const initialMetrics = Object.fromEntries(
  mockBusinesses.map(b => [b.id, b.clickMetrics || { visits: 0, calls: 0, websites: 0, likes: 0 }])
);

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSortOptions, setSelectedSortOptions] = useState<string[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [businessMetrics, setBusinessMetrics] = useState<Record<string, { visits: number; calls: number; websites: number; likes: number; }>>(
    initialMetrics
  );
  const [followingBusinesses, setFollowingBusinesses] = useState<Set<string>>(new Set());

  // Click tracking functions - optimized to prevent unnecessary re-renders
  const handleVisitClick = useCallback((businessId: string) => {
    setBusinessMetrics(prev => {
      const current = prev[businessId];
      if (!current) return prev; // Prevent updates if no metrics exist
      
      // Only update if actually changing
      const newMetrics = { ...current, visits: current.visits + 1 };
      return { ...prev, [businessId]: newMetrics };
    });
  }, []);

  const handleCallClick = useCallback((businessId: string) => {
    setBusinessMetrics(prev => {
      const current = prev[businessId];
      if (!current) return prev;
      
      const newMetrics = { ...current, calls: current.calls + 1 };
      return { ...prev, [businessId]: newMetrics };
    });
  }, []);

  const handleWebsiteClick = useCallback((businessId: string) => {
    setBusinessMetrics(prev => {
      const current = prev[businessId];
      if (!current) return prev;
      
      const newMetrics = { ...current, websites: current.websites + 1 };
      return { ...prev, [businessId]: newMetrics };
    });
  }, []);

  const handleLikeClick = useCallback((businessId: string) => {
    setBusinessMetrics(prev => {
      const current = prev[businessId];
      if (!current) return prev;
      
      const newMetrics = { ...current, likes: current.likes + 1 };
      return { ...prev, [businessId]: newMetrics };
    });
  }, []);

  const handleFollowClick = useCallback((businessId: string) => {
    setFollowingBusinesses(prev => {
      const newSet = new Set(prev);
      const wasFollowing = newSet.has(businessId);
      
      if (wasFollowing) {
        newSet.delete(businessId);
      } else {
        newSet.add(businessId);
      }
      
      // Update follower count in a separate effect to avoid cascading updates
      setTimeout(() => {
        const businessIndex = mockBusinesses.findIndex(b => b.id === businessId);
        if (businessIndex !== -1) {
          const currentFollowers = mockBusinesses[businessIndex].followers || 0;
          mockBusinesses[businessIndex] = {
            ...mockBusinesses[businessIndex],
            followers: wasFollowing ? Math.max(0, currentFollowers - 1) : currentFollowers + 1
          };
        }
      }, 0);
      
      return newSet;
    });
  }, []);

  // Merge businesses with updated metrics and follow state - optimized with stable references
  const businessesWithMetrics = useMemo(() => {
    return mockBusinesses.map(business => {
      const metrics = businessMetrics[business.id];
      const isFollowing = followingBusinesses.has(business.id);
      
      return {
        ...business,
        clickMetrics: metrics,
        isFollowing: isFollowing
      };
    });
  }, [businessMetrics, followingBusinesses]);

  // Filter and sort businesses - optimized for performance
  const filteredBusinesses = useMemo(() => {
    let result = businessesWithMetrics;
    
    // Apply filters
    if (searchQuery || selectedCategories.length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter((business) => {
        const matchesSearch = !searchQuery || 
          business.name.toLowerCase().includes(query) ||
          business.description.toLowerCase().includes(query) ||
          business.category.toLowerCase().includes(query);
        
        const matchesCategory = selectedCategories.length === 0 || 
                               selectedCategories.includes(business.category);
        
        return matchesSearch && matchesCategory;
      });
    }
    
    // Apply sorting
    if (selectedSortOptions.length > 0) {
      const sortOption = selectedSortOptions[0];
      result = [...result].sort((a, b) => {
        switch (sortOption) {
          case "Most Ecoscore":
            return (b.ecoScore || 0) - (a.ecoScore || 0);
          case "Most Liked":
            return (b.clickMetrics?.likes || 0) - (a.clickMetrics?.likes || 0);
          case "Most Called":
            return (b.clickMetrics?.calls || 0) - (a.clickMetrics?.calls || 0);
          case "Most Visited":
            return (b.clickMetrics?.visits || 0) - (a.clickMetrics?.visits || 0);
          case "Most Web Visits":
            return (b.clickMetrics?.websites || 0) - (a.clickMetrics?.websites || 0);
          case "Eco Pay":
            return (b.ecoScore || 0) - (a.ecoScore || 0);
          default:
            return 0;
        }
      });
    }
    
    return result;
  }, [businessesWithMetrics, searchQuery, selectedCategories, selectedSortOptions]);

  const handleBusinessSelect = useCallback((business: Business) => {
    handleVisitClick(business.id);
    setSelectedBusiness(business);
    setIsModalOpen(true);
  }, [handleVisitClick]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedBusiness(null);
  }, []);

  const handleViewAllCategory = useCallback((category: string) => {
    if (category) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }
    setActiveTab("hubs");
  }, []);

  const handleViewPricing = useCallback(() => {
    setActiveTab("pricing");
  }, []);

  const handlePlanSelect = useCallback((plan: string) => {
    setSelectedPlan(plan);
    setActiveTab("add");
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomePage
            businesses={businessesWithMetrics}
            onBusinessSelect={handleBusinessSelect}
            onViewAllCategory={handleViewAllCategory}
            onViewPricing={handleViewPricing}
            onCallClick={handleCallClick}
            onWebsiteClick={handleWebsiteClick}
            onLikeClick={handleLikeClick}
            onFollowClick={handleFollowClick}
          />
        );
      case "hubs":
      case "search":
        return (
          <BusinessGrid
            businesses={filteredBusinesses}
            onBusinessSelect={handleBusinessSelect}
            onCallClick={handleCallClick}
            onWebsiteClick={handleWebsiteClick}
            onLikeClick={handleLikeClick}
            onFollowClick={handleFollowClick}
          />
        );
      case "pricing":
        return <PricingPage onPlanSelect={handlePlanSelect} />;
      case "dashboard":
        return <DashboardPage />;
      case "add":
        return <AddListingPage selectedPlan={selectedPlan} />;
      case "bookmarks":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <h2 className="mb-4">Your Bookmarks</h2>
            <p className="text-muted-foreground">
              Save your favorite businesses for quick access.
            </p>
          </div>
        );
      case "profile":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <h2 className="mb-4">Your Profile</h2>
            <p className="text-muted-foreground mb-6">
              Manage your account, business listings, and preferences.
            </p>
            <Button className="mb-2 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90">Sign In</Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Create Account</Button>
          </div>
        );
      case "settings":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <h2 className="mb-4">Settings</h2>
            <p className="text-muted-foreground">
              Customize your app preferences and account settings.
            </p>
          </div>
        );
      case "help":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <h2 className="mb-4">Help & Support</h2>
            <p className="text-muted-foreground">
              Get help with using the app and contact support.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search - Show on all pages */}
      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        selectedLocations={selectedLocations}
        onLocationsChange={setSelectedLocations}
        selectedSortOptions={selectedSortOptions}
        onSortOptionsChange={setSelectedSortOptions}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <main className="pb-12">
        {renderContent()}
      </main>

      {/* Mobile Footer */}
      <MobileFooter
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Hub Modal */}
      <HubModal
        business={selectedBusiness}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCallClick={handleCallClick}
        onWebsiteClick={handleWebsiteClick}
        onLikeClick={handleLikeClick}
      />
    </div>
  );
}