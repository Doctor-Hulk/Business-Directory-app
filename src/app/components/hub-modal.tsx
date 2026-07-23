import { useState, useRef } from "react";
import { X, Star, MapPin, Phone, Globe, ExternalLink, Heart, MessageCircle, UserPlus, Wrench, GraduationCap, Sparkles, Coffee, Utensils, Dumbbell, Shirt, Clock, Leaf, Play, ShoppingBag, ShieldCheck, Crown } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
  clickMetrics?: {
    visits: number;
    calls: number;
    websites: number;
    likes: number;
  };
}

interface HubModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
  onCallClick?: (businessId: string) => void;
  onWebsiteClick?: (businessId: string) => void;
  onLikeClick?: (businessId: string) => void;
}

export function HubModal({ business, isOpen, onClose, onCallClick, onWebsiteClick, onLikeClick }: HubModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const contactSectionRef = useRef<HTMLElement>(null);
  const reviewsSectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  if (!business) return null;

  const handleExternalWebsite = () => {
    onWebsiteClick?.(business.id);
    window.open(business.website, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    onCallClick?.(business.id);
    // Scroll to contact section instead of opening phone
    contactSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLikeClick?.(business.id);
  };

  const handleContact = () => {
    // Scroll to contact section
    contactSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleRate = () => {
    // Scroll to reviews section for rating
    reviewsSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleVisitWebsite = () => {
    onWebsiteClick?.(business.id);
    window.open(business.website, '_blank', 'noopener,noreferrer');
  };

  const getCategoryIcon = () => {
    switch (business.category.toLowerCase()) {
      case 'automotive': return <Wrench className="w-5 h-5" />;
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'beauty & spa': return <Sparkles className="w-5 h-5" />;
      case 'coffee shop': return <Coffee className="w-5 h-5" />;
      case 'restaurant': return <Utensils className="w-5 h-5" />;
      case 'fitness': return <Dumbbell className="w-5 h-5" />;
      case 'retail': return <Shirt className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  // Dynamic products based on business category
  const getProducts = () => {
    switch (business.category.toLowerCase()) {
      case 'coffee shop':
        return [
          { 
            name: "Signature Blend Coffee", 
            price: "$12.99", 
            image: "https://images.unsplash.com/photo-1753791913923-c57ad5ff9c4c?w=400", 
            description: "Our house blend with notes of chocolate and caramel",
            badge: "Best Seller"
          },
          { 
            name: "Artisan Pastries", 
            price: "$4.99", 
            image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400", 
            description: "Fresh baked daily by our skilled bakers",
            badge: "Fresh Daily"
          },
          { 
            name: "Cold Brew Kit", 
            price: "$24.99", 
            image: "https://images.unsplash.com/photo-1462919863911-6d8de5418353?w=400", 
            description: "Make perfect cold brew at home",
            badge: "Take Home"
          }
        ];
      case 'restaurant':
        return [
          { 
            name: "Chef's Special Pasta", 
            price: "$18.99", 
            image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?w=400", 
            description: "House-made pasta with seasonal ingredients",
            badge: "Chef's Choice"
          },
          { 
            name: "Wood-Fired Pizza", 
            price: "$16.99", 
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400", 
            description: "Traditional Italian pizza with fresh mozzarella",
            badge: "Popular"
          },
          { 
            name: "Tiramisu", 
            price: "$8.99", 
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400", 
            description: "Classic Italian dessert made fresh daily",
            badge: "Dessert"
          }
        ];
      case 'fitness':
        return [
          { 
            name: "Premium Membership", 
            price: "$49.99/mo", 
            image: "https://images.unsplash.com/photo-1632077804406-188472f1a810?w=400", 
            description: "Full access to all equipment and classes",
            badge: "Most Popular"
          },
          { 
            name: "Personal Training", 
            price: "$75/session", 
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400", 
            description: "One-on-one coaching with certified trainers",
            badge: "1-on-1"
          },
          { 
            name: "Group Classes", 
            price: "$25/class", 
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400", 
            description: "Fun fitness classes for all levels",
            badge: "Group Fun"
          }
        ];
      case 'retail':
        return [
          { 
            name: "Designer Collection", 
            price: "$89.99", 
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", 
            description: "Premium designer pieces with modern style",
            badge: "New Arrival"
          },
          { 
            name: "Casual Wear", 
            price: "$49.99", 
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", 
            description: "Comfortable and stylish for any occasion",
            badge: "Trending"
          },
          { 
            name: "Accessories", 
            price: "$19.99", 
            image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400", 
            description: "Complete your look with our curated selection",
            badge: "Must Have"
          }
        ];
      default:
        return [
          { 
            name: "Premium Service", 
            price: "$99.99", 
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400", 
            description: "Our top-tier service offering",
            badge: "Premium"
          },
          { 
            name: "Standard Package", 
            price: "$59.99", 
            image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400", 
            description: "Great value for essential needs",
            badge: "Value"
          },
          { 
            name: "Basic Option", 
            price: "$29.99", 
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400", 
            description: "Affordable starter solution",
            badge: "Starter"
          }
        ];
    }
  };

  const galleryImages = [
    business.image,
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
    "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400"
  ];

  const reviews = [
    { id: 1, author: "John D.", rating: 5, date: "2 days ago", comment: "Exceptional service!" },
    { id: 2, author: "Sarah M.", rating: 5, date: "1 week ago", comment: "Professional team!" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogContent 
        className="max-w-5xl max-h-[85vh] w-[90vw] p-0 overflow-hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <DialogTitle>{business.name} - Business Hub</DialogTitle>
          <DialogDescription>
            Business hub for {business.name}, showcasing services, contact information, and customer reviews.
          </DialogDescription>
        </VisuallyHidden>
        
        <div className="flex flex-col h-[85vh] bg-background">
          {/* Hub Header - Matching NOBOX HUB Style */}
          <header className="bg-gradient-to-r from-white via-green-50/30 to-emerald-50/30 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 border-b border-primary/20 shadow-sm flex-shrink-0">
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-7 h-7 bg-gradient-to-br from-primary to-green-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                  {getCategoryIcon()}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm font-medium truncate">{business.name}</h1>
                  <p className="text-xs text-muted-foreground">Powered by NOBOX HUB</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1.5 hover:bg-accent"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </header>

          {/* Scrollable Content */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
            {/* Hero Section with Image Background and Metadata Overlay */}
            <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={business.image}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
              </div>
              
              {/* Category and Status Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                <Badge 
                  variant="secondary" 
                  className="bg-white/95 backdrop-blur-sm text-primary shadow-lg truncate max-w-[140px] text-xs"
                >
                  {business.category}
                </Badge>
                <Badge 
                  variant={business.isOpen ? "default" : "secondary"} 
                  className={`shadow-lg text-xs ${
                    business.isOpen 
                      ? "bg-green-600 text-white" 
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {business.isOpen ? "Open Now" : "Closed"}
                </Badge>
              </div>

              {/* Compact Metadata Overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl text-white">
                  {/* Business Name - Top Center */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {business.name}
                    </h2>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    
                    {/* Left Column - Ratings & Social */}
                    <div className="bg-black/30 backdrop-blur-sm border border-white/20 p-4 rounded-lg">
                      <h4 className="font-medium text-xs text-white/80 uppercase tracking-wide mb-3">Reviews & Social</h4>
                      <div className="space-y-3">
                        {/* Rating & Eco Score on same line */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(business.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-white/40"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium text-white text-sm">{business.rating}</span>
                          </div>

                        </div>
                        <div className="text-xs text-white/70">({business.reviewCount} reviews)</div>
                        
                        {/* All Badges Row - Full text on modal */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className="bg-blue-600/20 border border-blue-400/30 text-blue-300 px-1.5 py-0.5 text-xs backdrop-blur-sm rounded-[5px] inline-flex items-center">
                            <ShieldCheck className="w-2.5 h-2.5 mr-1 fill-blue-400" />
                            VERIFIED
                          </Badge>
                          {business.ecoScore && (
                            <Badge className="bg-green-600/20 border border-green-400/30 text-green-300 px-1.5 py-0.5 text-xs backdrop-blur-sm rounded-[5px] inline-flex items-center">
                              <Leaf className="w-2.5 h-2.5 mr-1 fill-green-400" />
                              ECO FRIENDLY
                            </Badge>
                          )}
                          <Badge className="bg-yellow-600/20 border border-yellow-400/30 text-yellow-300 px-1.5 py-0.5 text-xs backdrop-blur-sm rounded-[5px] inline-flex items-center">
                            <Crown className="w-2.5 h-2.5 mr-1 fill-yellow-400" />
                            PREMIUM
                          </Badge>
                        </div>
                        
                        {/* Social Stats */}
                        <div className="flex items-center gap-2">
                          <Heart className={`w-4 h-4 ${isLiked ? 'text-red-400 fill-red-400' : 'text-white/70'}`} />
                          <span className="text-xs text-white/90">{business.clickMetrics?.likes || 0} likes</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Column - Contact Info */}
                    <div className="bg-black/30 backdrop-blur-sm border border-white/20 p-4 rounded-lg">
                      <h4 className="font-medium text-xs text-white/80 uppercase tracking-wide mb-3">Contact Info</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-white/90 leading-relaxed line-clamp-2">{business.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-xs text-white/90 truncate">{business.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-blue-300 hover:text-blue-200 cursor-pointer text-xs truncate" onClick={handleVisitWebsite}>
                            Visit Website
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-xs text-white/90 truncate">{business.hours}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Performance Stats */}
                    <div className="bg-black/30 backdrop-blur-sm border border-white/20 p-4 rounded-lg">
                      <h4 className="font-medium text-xs text-white/80 uppercase tracking-wide mb-3">Performance Stats</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <div className="font-bold text-sm text-green-400">{business.clickMetrics?.visits || 0}</div>
                          <div className="text-xs text-white/70">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-sm text-blue-400">{business.clickMetrics?.calls || 0}</div>
                          <div className="text-xs text-white/70">Calls</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-sm text-purple-400">{business.clickMetrics?.websites || 0}</div>
                          <div className="text-xs text-white/70">Sites</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-sm text-yellow-400">{business.clickMetrics?.likes || 0}</div>
                          <div className="text-xs text-white/70">Likes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section - Enhanced Grid Design */}
            {business.services && business.services.length > 0 && (
              <section className="py-12 bg-background">
                <div className="container mx-auto px-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-3">Our Professional Services</h3>
                    <p className="text-muted-foreground">
                      Expert services tailored to meet your specific needs with professional quality and care.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {business.services.map((service, index) => (
                      <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-gradient-to-br from-white to-secondary/20">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            {/* Service Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              {getCategoryIcon()}
                            </div>
                            
                            {/* Service Title */}
                            <h4 className="font-bold text-lg mb-3 text-foreground">{service}</h4>
                            

                            
                            {/* Pricing & Features */}
                            <div className="w-full space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">Starting from</span>
                                <span className="font-bold text-lg text-primary">$49</span>
                              </div>
                              
                              {/* Service Features */}
                              <div className="text-xs text-muted-foreground space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                  <span>Expert consultation included</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                  <span>Quality guarantee</span>
                                </div>
                              </div>
                              
                              {/* Action Button */}
                              <Button size="sm" className="w-full mt-4 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90">
                                Learn More
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Products Section - E-commerce Style Grid */}
            <section className="py-12 bg-secondary/30">
              <div className="container mx-auto px-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-3">Some of Our Popular Products</h3>
                  <p className="text-muted-foreground">
                    Discover our most loved offerings that keep customers coming back for more.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getProducts().map((product, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-md">
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Product Badge */}
                        <Badge className="absolute top-3 right-3 bg-primary text-white shadow-md">
                          {product.badge}
                        </Badge>
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Product Details */}
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Product Name */}
                          <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                            {product.name}
                          </h4>
                          
                          {/* Product Description */}
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {product.description}
                          </p>
                          
                          {/* Rating Stars */}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
                          </div>
                          
                          {/* Price and Order Section */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex flex-col">
                              <span className="font-bold text-xl text-primary">{product.price}</span>
                              <span className="text-xs text-muted-foreground line-through">
                                {business.category.toLowerCase() === 'coffee shop' ? '$15.99' : 
                                 business.category.toLowerCase() === 'restaurant' ? '$22.99' : 
                                 business.category.toLowerCase() === 'fitness' ? '$79.99' : '$129.99'}
                              </span>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90">
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Order Now
                            </Button>
                          </div>
                          
                          {/* Quick Features */}
                          <div className="border-t pt-3">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                In Stock
                              </span>
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                Fast Delivery
                              </span>
                              {business.ecoScore && business.ecoScore > 4 && (
                                <span className="flex items-center gap-1">
                                  <Leaf className="w-3 h-3 text-green-600" />
                                  Eco-Friendly
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* View All Products Button */}
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                    View All Products
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </section>

            {/* Gallery Section - Enhanced Visual Tour */}
            <section className="py-12 bg-background">
              <div className="container mx-auto px-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-3">Gallery</h3>
                  <p className="text-muted-foreground">
                    Take a visual tour of our space and see what makes us special.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                      <ImageWithFallback
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay with View Icon */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                          <span className="text-sm font-medium">View Full Size</span>
                        </div>
                      </div>
                      {/* Image Counter */}
                      <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                        {index + 1} / {galleryImages.length}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Gallery Stats */}
                <div className="flex items-center justify-center gap-8 mt-8 text-center">
                  <div>
                    <div className="font-bold text-2xl text-primary">{galleryImages.length}</div>
                    <div className="text-sm text-muted-foreground">Photos</div>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div>
                    <div className="font-bold text-2xl text-primary">4.8</div>
                    <div className="text-sm text-muted-foreground">Photo Rating</div>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div>
                    <div className="font-bold text-2xl text-primary">2.5K</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                </div>
              </div>
            </section>

            {/* NOBOX HUB Feature Video Section */}
            <section className="py-12 bg-primary/5">
              <div className="container mx-auto px-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-3">NOBOX HUB Feature</h3>
                  <p className="text-muted-foreground">
                    Watch our exclusive documentary about {business.name} and discover their unique story.
                  </p>
                </div>
                <div className="max-w-4xl mx-auto">
                  <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-green-600/10 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-medium text-primary">Feature Video Coming Soon</p>
                      <p className="text-sm text-muted-foreground">Exclusive NOBOX HUB documentary</p>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      <Play className="w-4 h-4 mr-2" />
                      NOBOX HUB Exclusive
                    </Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section ref={reviewsSectionRef} className="py-12 bg-secondary/30">
              <div className="container mx-auto px-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-3">What Our Customers Say</h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">{business.rating} out of 5</span>
                    <span className="text-muted-foreground">({business.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
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
                        <p className="text-muted-foreground mb-3 text-sm">"{review.comment}"</p>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{review.author}</span>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact CTA Section */}
            <section ref={contactSectionRef} className="py-12 bg-primary text-white">
              <div className="container mx-auto px-6 text-center">
                <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Contact us today to experience the difference quality service makes.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => window.open(`tel:${business.phone}`, '_self')}
                    className="w-full sm:w-auto"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call {business.phone.split(' ')[0]}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                    onClick={handleVisitWebsite}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </div>
            </section>

            {/* Bottom spacing for sticky footer */}
            <div className="h-16"></div>
          </div>

          {/* Hub Sticky Footer Menu - Matching NOBOX HUB Style */}
          <footer className="bg-gradient-to-r from-white via-green-50/50 to-emerald-50/50 border-t border-primary/20 z-50 backdrop-blur-sm shadow-lg sticky bottom-0 flex-shrink-0">
            <div className="flex items-center justify-around px-1 py-1 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleContact}
                className="flex flex-col items-center gap-0.5 h-auto py-1 px-1 sm:px-2 min-w-0 flex-1 max-w-none"
              >
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs truncate">Contact</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFollow}
                className="flex flex-col items-center gap-0.5 h-auto py-1 px-1 sm:px-2 min-w-0 flex-1 max-w-none"
              >
                <UserPlus className={`w-5 h-5 ${isFollowing ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-xs truncate">Follow</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="flex flex-col items-center gap-0.5 h-auto py-1 px-1 sm:px-2 min-w-0 flex-1 max-w-none"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} />
                <span className="text-xs truncate">Like</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRate}
                className="flex flex-col items-center gap-0.5 h-auto py-1 px-1 sm:px-2 min-w-0 flex-1 max-w-none"
              >
                <Star className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs truncate">Rate</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVisitWebsite}
                className="flex flex-col items-center gap-0.5 h-auto py-1 px-1 sm:px-2 min-w-0 flex-1 max-w-none"
              >
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs truncate">Visit</span>
              </Button>
            </div>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}