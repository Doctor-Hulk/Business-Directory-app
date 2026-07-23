import { Star, MapPin, Clock, Phone, Globe, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

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
  gallery?: string[];
}

interface BusinessModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BusinessModal({ business, isOpen, onClose }: BusinessModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  if (!business) return null;

  const handleVisitWebsite = () => {
    // In a real app, this would open the website in the in-app browser
    window.open(business.website, '_blank');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const mockReviews = [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent service and great atmosphere. Highly recommended!"
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      date: "1 week ago",
      comment: "Good quality products and friendly staff. Will visit again."
    },
    {
      id: 3,
      author: "Mike R.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Outstanding experience! The team went above and beyond."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl">{business.name}</DialogTitle>
              <DialogDescription className="sr-only">
                Business details for {business.name}, a {business.category} business located at {business.address}
              </DialogDescription>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{business.category}</Badge>
                <Badge variant={business.isOpen ? "default" : "secondary"}>
                  {business.isOpen ? "Open" : "Closed"}
                </Badge>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleBookmark}
              className="ml-4"
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Hero Image */}
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={business.image}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Rating and Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(business.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg">{business.rating}</span>
                  <span className="text-muted-foreground">
                    ({business.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>{business.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>{business.hours}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span>{business.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <span className="text-blue-600 cursor-pointer hover:underline">
                      {business.website}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full" onClick={handleVisitWebsite}>
                  <Globe className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
            
            <Separator />
            
            {/* Tabs for different sections */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4">
                <div>
                  <h4 className="mb-2">About {business.name}</h4>
                  <p className="text-muted-foreground">
                    {business.fullDescription || business.description}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="services" className="space-y-4">
                <div>
                  <h4 className="mb-3">Services Offered</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(business.services || ["General Services", "Customer Support", "Consultation"]).map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <div>
                  <h4 className="mb-3">Customer Reviews</h4>
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span>{review.author}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}