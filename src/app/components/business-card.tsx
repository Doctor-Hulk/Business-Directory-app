import { Star, Phone, Globe, Eye, Heart, Leaf, ShieldCheck, Crown, Users, Plus, Check } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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

interface BusinessCardProps {
  business: Business;
  onVisit: (business: Business) => void;
  onCallClick?: (businessId: string) => void;
  onWebsiteClick?: (businessId: string) => void;
  onLikeClick?: (businessId: string) => void;
  onFollowClick?: (businessId: string) => void;
}

// Helper function to truncate business name optimally for single line
const truncateName = (name: string, maxLength: number = 22) => {
  if (name.length <= maxLength) return name;
  return name.slice(0, maxLength).trim() + '...';
};

// Helper function to extract city name from address
const getCityName = (address: string) => {
  const parts = address.split(',').map(part => part.trim());
  if (parts.length >= 2) {
    return parts[parts.length - 1]; // Get the last part (city name)
  }
  return address;
};

export function BusinessCard({ business, onVisit, onCallClick, onWebsiteClick, onLikeClick, onFollowClick }: BusinessCardProps) {
  const handleContactClick = () => {
    onCallClick?.(business.id);
    window.location.href = `tel:${business.phone}`;
  };

  const handleWebsiteClick = () => {
    onWebsiteClick?.(business.id);
    window.open(business.website, '_blank');
  };

  const handleLikeClick = () => {
    onLikeClick?.(business.id);
  };

  const handleFollowClick = () => {
    onFollowClick?.(business.id);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all duration-200 border-2 border-primary/30 hover:border-primary/50" style={{ borderRadius: '5px' }}>
      <CardContent className="p-0 h-full flex flex-col [&:last-child]:pb-0">
        <div className="p-2 space-y-1.5 flex-1 min-w-0 overflow-hidden">
          {/* Image and Business Info Container */}
          <div className="flex flex-col gap-1">
            {/* Image and Title Row */}
            <div className="flex items-start gap-1">
              {/* Image Sandwich: Location + Image + Category */}
              <div className="flex flex-col flex-shrink-0" style={{ borderRadius: '5px', overflow: 'hidden' }}>
                {/* Location badge - attached to top of image */}
                <div className="bg-black/70 backdrop-blur-sm px-1 h-2.5 sm:h-3 flex items-center justify-center w-12 sm:w-14">
                  <span className="text-white text-[7px] sm:text-[8px] font-medium leading-none truncate whitespace-nowrap overflow-hidden text-center">
                    {getCityName(business.address)}
                  </span>
                </div>
                {/* Image */}
                <ImageWithFallback 
                  src={business.image} 
                  alt={business.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
                  style={{ borderRadius: '0' }}
                />
                {/* Category badge - attached to bottom of image */}
                <div className="bg-black/70 backdrop-blur-sm px-1 h-2.5 sm:h-3 flex items-center justify-center w-12 sm:w-14">
                  <span className="text-white text-[7px] sm:text-[8px] font-medium leading-none truncate whitespace-nowrap overflow-hidden text-center">
                    {business.category}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-[10px] font-medium leading-none mb-0.5 truncate" title={business.name}>
                  {truncateName(business.name, 22)}
                </h3>
                {/* Star Rating */}
                <div className="flex items-center gap-0.5 mb-0.5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-2 h-2 ${
                          i < Math.floor(business.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] flex-shrink-0 ml-0.5">{business.rating}</span>
                  <span className="text-[9px] text-muted-foreground flex-shrink-0">
                    ({business.reviewCount})
                  </span>
                </div>
                {/* All Badges Row - Icon only with popovers */}
                <div className="flex items-center gap-0.5 mb-[4px] min-w-0">
                  {/* Verified Badge */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Badge 
                        className="bg-blue-600 text-white px-1 py-0.5 h-auto min-w-0 flex-shrink-0 border border-blue-500 rounded-[5px] inline-flex items-center cursor-pointer hover:bg-blue-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ShieldCheck className="w-2.5 h-2.5" />
                      </Badge>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto px-1.5 py-0.5 text-[10px] h-auto rounded-[5px]" side="top">
                      VERIFIED
                    </PopoverContent>
                  </Popover>
                  
                  {/* Eco Badge */}
                  {(business.ecoScore || business.ecoScore === 0) && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Badge 
                          className="bg-green-600 text-white px-1 py-0.5 h-auto min-w-0 flex-shrink-0 border border-green-500 rounded-[5px] inline-flex items-center cursor-pointer hover:bg-green-700 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Leaf className="w-2.5 h-2.5 fill-green-200" />
                        </Badge>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto px-1.5 py-0.5 text-[10px] h-auto rounded-[5px]" side="top">
                        ECO FRIENDLY
                      </PopoverContent>
                    </Popover>
                  )}
                  
                  {/* Premium Badge */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Badge 
                        className="bg-yellow-600 text-white px-1 py-0.5 h-auto min-w-0 flex-shrink-0 border border-yellow-500 rounded-[5px] inline-flex items-center cursor-pointer hover:bg-yellow-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Crown className="w-2.5 h-2.5 fill-yellow-200" />
                      </Badge>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto px-1.5 py-0.5 text-[10px] h-auto rounded-[5px]" side="top">
                      PREMIUM
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Followers Section - Below badges */}
                <div className="flex items-center gap-0.5">
                  <Button
                    variant="outline"
                    className="bg-muted/50 text-muted-foreground hover:bg-muted/70 h-4 px-1 py-0 text-[8px] border border-muted-foreground/20 flex items-center gap-0.5 min-w-0 flex-1" 
                    style={{ borderRadius: '5px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollowClick();
                    }}
                  >
                    <Users className="w-2 h-2 flex-shrink-0" />
                    <span className="text-[8px] leading-none">
                      {business.followers && business.followers > 999 
                        ? `${Math.floor(business.followers / 1000)}k` 
                        : `${business.followers || 0}`}
                    </span>
                    <span className="text-[8px] leading-none ml-0.5">Followers</span>
                  </Button>
                  <Button
                    variant="outline"
                    className={`h-4 w-3.5 p-0 flex items-center justify-center border flex-shrink-0 ${
                      business.isFollowing 
                        ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20' 
                        : 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    }`}
                    style={{ borderRadius: '5px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollowClick();
                    }}
                  >
                    {business.isFollowing ? (
                      <Check className="w-2 h-2" strokeWidth={3} />
                    ) : (
                      <Plus className="w-2 h-2" strokeWidth={3} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons - Visit, Contact, Website, Likes */}
        <div className="flex gap-0.5 px-1.5 pb-1.5 min-w-0 flex-shrink-0">
          {/* Visit Button - Icon with Metric */}
          <Button 
            size="sm" 
            className="h-5 px-1 bg-emerald-600 hover:bg-emerald-700 text-white border-0 flex-1"
            style={{ borderRadius: '5px' }}
            onClick={() => onVisit(business)}
            title="Visit Hub"
          >
            <div className="flex items-center gap-0.5 min-w-0 overflow-hidden">
              <Eye className="w-3 h-3 flex-shrink-0" />
              {business.clickMetrics && (
                <span className="text-[8px] leading-none truncate">
                  {business.clickMetrics.visits > 999 ? `${Math.floor(business.clickMetrics.visits / 1000)}k` : business.clickMetrics.visits}
                </span>
              )}
            </div>
          </Button>
          
          {/* Contact Button - Icon with Metric */}
          <Button 
            size="sm" 
            className="h-5 px-1 bg-blue-600 hover:bg-blue-700 text-white border-0 flex-1"
            style={{ borderRadius: '5px' }}
            onClick={handleContactClick}
            title={`Call ${business.phone}`}
          >
            <div className="flex items-center gap-0.5 min-w-0 overflow-hidden">
              <Phone className="w-3 h-3 flex-shrink-0" />
              {business.clickMetrics && (
                <span className="text-[8px] leading-none truncate">
                  {business.clickMetrics.calls > 999 ? `${Math.floor(business.clickMetrics.calls / 1000)}k` : business.clickMetrics.calls}
                </span>
              )}
            </div>
          </Button>
          
          {/* Website Button - Icon with Metric */}
          <Button 
            size="sm" 
            className="h-5 px-1 bg-purple-600 hover:bg-purple-700 text-white border-0 flex-1"
            style={{ borderRadius: '5px' }}
            onClick={handleWebsiteClick}
            title="Visit Website"
          >
            <div className="flex items-center gap-0.5 min-w-0 overflow-hidden">
              <Globe className="w-3 h-3 flex-shrink-0" />
              {business.clickMetrics && (
                <span className="text-[8px] leading-none truncate">
                  {business.clickMetrics.websites > 999 ? `${Math.floor(business.clickMetrics.websites / 1000)}k` : business.clickMetrics.websites}
                </span>
              )}
            </div>
          </Button>
          
          {/* Likes Button - Icon with Metric */}
          <Button 
            size="sm" 
            className="h-5 px-1 bg-pink-600 hover:bg-pink-700 text-white border-0 flex-1"
            style={{ borderRadius: '5px' }}
            onClick={handleLikeClick}
            title="Like Business"
          >
            <div className="flex items-center gap-0.5 min-w-0 overflow-hidden">
              <Heart className="w-3 h-3 flex-shrink-0" />
              {business.clickMetrics && (
                <span className="text-[8px] leading-none truncate">
                  {business.clickMetrics.likes > 999 ? `${Math.floor(business.clickMetrics.likes / 1000)}k` : business.clickMetrics.likes}
                </span>
              )}
            </div>
          </Button>

        </div>
      </CardContent>
    </Card>
  );
}
