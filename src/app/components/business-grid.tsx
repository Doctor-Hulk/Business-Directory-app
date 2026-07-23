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

interface BusinessGridProps {
  businesses: Business[];
  onBusinessSelect: (business: Business) => void;
  onCallClick?: (businessId: string) => void;
  onWebsiteClick?: (businessId: string) => void;
  onLikeClick?: (businessId: string) => void;
  onFollowClick?: (businessId: string) => void;
}

export function BusinessGrid({ businesses, onBusinessSelect, onCallClick, onWebsiteClick, onLikeClick, onFollowClick }: BusinessGridProps) {
  if (businesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-4">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="mb-2">No businesses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters to find more businesses.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1.5 p-1.5">
      {businesses.map((business) => (
        <BusinessCard
          key={business.id}
          business={business}
          onVisit={onBusinessSelect}
          onCallClick={onCallClick}
          onWebsiteClick={onWebsiteClick}
          onLikeClick={onLikeClick}
          onFollowClick={onFollowClick}
        />
      ))}
    </div>
  );
}