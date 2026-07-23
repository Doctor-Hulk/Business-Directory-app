import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  TrendingUp, 
  Eye, 
  Users, 
  Phone, 
  CreditCard, 
  Calendar, 
  Star, 
  MapPin, 
  ExternalLink, 
  Settings, 
  Plus,
  Bookmark,
  BarChart3,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  Building2
} from "lucide-react";

interface DashboardBusiness {
  id: string;
  name: string;
  category: string;
  plan: "Free" | "Basic" | "Advanced" | "Premium";
  expiryDate: string;
  status: "Active" | "Expiring Soon" | "Expired";
  views: number;
  rating: number;
  reviews: number;
  image: string;
}

interface BookmarkedBusiness {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
}

const mockUserBusinesses: DashboardBusiness[] = [
  {
    id: "b1",
    name: "Downtown Coffee Co.",
    category: "Coffee Shop",
    plan: "Premium",
    expiryDate: "2024-03-15",
    status: "Active",
    views: 1247,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400"
  },
  {
    id: "b2",
    name: "Tech Solutions Pro",
    category: "Professional Services",
    plan: "Advanced",
    expiryDate: "2024-01-20",
    status: "Expiring Soon",
    views: 892,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"
  },
  {
    id: "b3",
    name: "Green Leaf Spa",
    category: "Beauty & Spa",
    plan: "Basic",
    expiryDate: "2024-02-28",
    status: "Active",
    views: 634,
    rating: 4.5,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
  }
];

const mockBookmarks: BookmarkedBusiness[] = [
  {
    id: "bm1",
    name: "Bella Vista Restaurant",
    category: "Restaurant",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
  },
  {
    id: "bm2",
    name: "FitLife Gym",
    category: "Fitness",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1744551472726-24a3eb12e82a?w=400"
  }
];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "Premium": return "bg-gradient-to-r from-purple-500 to-purple-600 text-white";
      case "Advanced": return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      case "Basic": return "bg-gradient-to-r from-green-500 to-green-600 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Expiring Soon": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Expired": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">
            Manage your businesses and track performance from your dashboard.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add New Business
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-border/80 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Businesses</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/80 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                <p className="text-2xl font-semibold">2,773</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% this month
                </p>
              </div>
              <Eye className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/80 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Credits</p>
                <p className="text-2xl font-semibold">$247</p>
              </div>
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/80 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Rating</p>
                <p className="text-2xl font-semibold">4.7</p>
                <div className="flex items-center mt-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-muted-foreground ml-1">418 reviews</span>
                </div>
              </div>
              <Star className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="businesses">My Businesses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="border-2 border-border/80 hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">New review for Downtown Coffee Co.</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Tech Solutions Pro reached 200 reviews!</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Advanced plan expires in 5 days</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Usage */}
            <Card className="border-2 border-border/80 hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Credit Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Used this month</span>
                    <span>$53 / $300</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Swap Ads</p>
                    <p className="font-medium">$32</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Premium Features</p>
                    <p className="font-medium">$21</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                  Add Credits
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* My Businesses Tab */}
        <TabsContent value="businesses" className="space-y-4">
          {mockUserBusinesses.map((business) => (
            <Card key={business.id} className="border-2 border-border/80 hover:border-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h3 className="font-medium">{business.name}</h3>
                      <div className="flex gap-2">
                        <Badge className={getPlanBadgeColor(business.plan)}>
                          {business.plan}
                        </Badge>
                        <Badge variant="outline" className={getStatusBadgeColor(business.status)}>
                          {business.status === "Active" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {business.status === "Expiring Soon" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {business.status === "Expired" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {business.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Category</p>
                        <p>{business.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {business.views.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rating</p>
                        <p className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                          {business.rating} ({business.reviews})
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expires</p>
                        <p>{new Date(business.expiryDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Public
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Views This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserBusinesses.map((business) => (
                    <div key={business.id} className="flex items-center justify-between">
                      <span className="text-sm">{business.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(business.views / 1500) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{business.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Customer Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <p className="text-2xl font-semibold text-primary">247</p>
                    <p className="text-sm text-muted-foreground">Phone Calls</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <p className="text-2xl font-semibold text-primary">156</p>
                    <p className="text-sm text-muted-foreground">Website Visits</p>
                  </div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <p className="text-2xl font-semibold text-primary">89</p>
                  <p className="text-sm text-muted-foreground">Direction Requests</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks" className="space-y-4">
          {mockBookmarks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockBookmarks.map((business) => (
                <Card key={business.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={business.image} 
                        alt={business.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{business.name}</h4>
                        <p className="text-sm text-muted-foreground">{business.category}</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs ml-1">{business.rating}</span>
                        </div>
                      </div>
                      <Bookmark className="w-4 h-4 text-primary fill-current" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bookmark className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="mb-2">No Bookmarks Yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start bookmarking businesses you're interested in to see them here.
                </p>
                <Button className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90">
                  Explore Businesses
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}