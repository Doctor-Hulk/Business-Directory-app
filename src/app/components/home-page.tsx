import { useState, useMemo } from "react";
import { Star, MapPin, ArrowRight, Phone, Globe, Eye, ChevronLeft, ChevronRight, MessageCircle, Heart, Leaf, ShieldCheck, Crown, Users, Plus, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { BusinessCard } from "./business-card";

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
  ecoScore?: number;
  followers?: number;
  isFollowing?: boolean;
  clickMetrics?: {
    visits: number;
    calls: number;
    websites: number;
    likes: number;
  };
}

interface HomePageProps {
  businesses: Business[];
  onBusinessSelect: (business: Business) => void;
  onViewAllCategory: (category: string) => void;
  onViewPricing: () => void;
  onCallClick?: (businessId: string) => void;
  onWebsiteClick?: (businessId: string) => void;
  onLikeClick?: (businessId: string) => void;
  onFollowClick?: (businessId: string) => void;
}

// Helper functions moved outside component to prevent re-creation on each render
// Helper function to create excerpt
const createExcerpt = (text: string, maxLength: number = 50) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Helper function to truncate business name optimally for single line
const truncateName = (name: string, maxLength: number = 22) => {
  if (name.length <= maxLength) return name;
  return name.slice(0, maxLength).trim() + '...';
};

// Helper function to extract city name from address
const getCityName = (address: string) => {
  // Split by comma and take the last part (assuming format: "123 Street, City, State")
  const parts = address.split(',').map(part => part.trim());
  if (parts.length >= 2) {
    // Return the second-to-last part (city name)
    return parts[parts.length - 2];
  }
  // Fallback: return the address as is
  return address;
};

// Helper function to get category colors
const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    'Restaurant': 'bg-gradient-to-r from-red-500 to-rose-600',
    'Coffee Shop': 'bg-gradient-to-r from-amber-500 to-orange-600', 
    'Retail': 'bg-gradient-to-r from-purple-500 to-indigo-600',
    'Fitness': 'bg-gradient-to-r from-green-500 to-emerald-600',
    'Beauty & Spa': 'bg-gradient-to-r from-pink-500 to-rose-500',
    'Professional Services': 'bg-gradient-to-r from-blue-500 to-cyan-600',
    'Healthcare': 'bg-gradient-to-r from-teal-500 to-cyan-500',
    'Education': 'bg-gradient-to-r from-violet-500 to-purple-600',
    'Entertainment': 'bg-gradient-to-r from-fuchsia-500 to-pink-600',
  };
  
  // Default fallback color
  return colorMap[category] || 'bg-gradient-to-r from-slate-500 to-gray-600';
};

// Helper function to group businesses by category and get top rated - moved outside component
const getTopBusinessesByCategory = (businesses: Business[], limit: number = 5) => {
  const categories = [...new Set(businesses.map(b => b.category))];
  
  return categories.map(category => {
    const categoryBusinesses = businesses
      .filter(b => b.category === category)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    
    return {
      category,
      businesses: categoryBusinesses
    };
  });
};

function CategoryCarousel({ category, businesses, onBusinessSelect, onViewAllCategory, onCallClick, onWebsiteClick, onLikeClick }: {
  category: string;
  businesses: Business[];
  onBusinessSelect: (business: Business) => void;
  onViewAllCategory: (category: string) => void;
  onCallClick?: (businessId: string) => void;
  onWebsiteClick?: (businessId: string) => void;
  onLikeClick?: (businessId: string) => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Show 6 items per page
  const totalPages = Math.ceil(businesses.length / itemsPerPage);
  
  const currentBusinesses = businesses.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="overflow-hidden gap-0 border-2 border-border/80" style={{ borderRadius: '5px' }}>
      <CardHeader className={`${getCategoryColor(category)} border-b px-4`} style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px', paddingTop: '2px', paddingBottom: '0px' }}>
        <div className="flex flex-col items-center gap-1">
          {/* Title row with navigation arrows */}
          <div className="flex items-center justify-between w-full">
            <button
              onClick={prevPage}
              className="text-white hover:text-white/80 transition-colors p-1 select-none"
              disabled={totalPages <= 1}
            >
              {totalPages > 1 ? (
                <svg 
                  width="20" 
                  height="16" 
                  viewBox="0 0 20 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.3))' }}
                >
                  {/* Arrow line */}
                  <line 
                    x1="17" 
                    y1="8" 
                    x2="2" 
                    y2="8" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                  {/* Arrow head */}
                  <polyline 
                    points="6,4 2,8 6,12" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none"
                  />
                </svg>
              ) : ''}
            </button>
            
            <h3 className="text-white font-medium">Top {category}</h3>
            
            <button
              onClick={nextPage}
              className="text-white hover:text-white/80 transition-colors p-1 select-none"
              disabled={totalPages <= 1}
            >
              {totalPages > 1 ? (
                <svg 
                  width="20" 
                  height="16" 
                  viewBox="0 0 20 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.3))' }}
                >
                  {/* Arrow line */}
                  <line 
                    x1="3" 
                    y1="8" 
                    x2="18" 
                    y2="8" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                  {/* Arrow head */}
                  <polyline 
                    points="14,4 18,8 14,12" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none"
                  />
                </svg>
              ) : ''}
            </button>
          </div>
          
          {/* Dot navigation */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentPage 
                      ? 'bg-white' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      

      
      <CardContent style={{ padding: '0px 4px 2px 4px' }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0.5">
          {currentBusinesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              onVisit={onBusinessSelect}
              onCallClick={onCallClick}
              onWebsiteClick={onWebsiteClick}
              onLikeClick={onLikeClick}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function HomePage({ businesses, onBusinessSelect, onViewAllCategory, onViewPricing, onCallClick, onWebsiteClick, onLikeClick, onFollowClick }: HomePageProps) {
  const categorizedBusinesses = useMemo(() => getTopBusinessesByCategory(businesses, 20), [businesses]);

  return (
    <div className="min-h-screen">
      {/* Category Sections */}
      <div className="px-1 pt-6 pb-8 space-y-8">
        {categorizedBusinesses.map(({ category, businesses: categoryBusinesses }) => (
          <section key={category}>
            <CategoryCarousel
              category={category}
              businesses={categoryBusinesses}
              onBusinessSelect={onBusinessSelect}
              onViewAllCategory={onViewAllCategory}
              onCallClick={onCallClick}
              onWebsiteClick={onWebsiteClick}
              onLikeClick={onLikeClick}
            />
          </section>
        ))}
      </div>

      {/* Call to Action */}
      <section className="bg-muted/50 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4">Ready to Grow Your Business?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of businesses that trust BusinessHub for their growth and promotion needs. 
            Get discovered by more customers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onViewPricing}>
              ADD HUB
            </Button>
            <Button variant="outline" size="lg" onClick={() => onViewAllCategory("")}>
              Explore Hubs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}