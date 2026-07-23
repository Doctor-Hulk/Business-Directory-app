import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Tag, 
  Image as ImageIcon, 
  Plus, 
  X,
  Check,
  Star,
  CreditCard,
  AlertCircle
} from "lucide-react";

interface BusinessFormData {
  name: string;
  description: string;
  fullDescription: string;
  category: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website: string;
  email: string;
  mondayHours: string;
  tuesdayHours: string;
  wednesdayHours: string;
  thursdayHours: string;
  fridayHours: string;
  saturdayHours: string;
  sundayHours: string;
  services: string[];
  imageUrl: string;
  plan: "Free" | "Basic" | "Advanced" | "Premium";
  acceptsReservations: boolean;
  acceptsWalkIns: boolean;
  hasParking: boolean;
  hasWifi: boolean;
  isWheelchairAccessible: boolean;
}

const initialFormData: BusinessFormData = {
  name: "",
  description: "",
  fullDescription: "",
  category: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  website: "",
  email: "",
  mondayHours: "",
  tuesdayHours: "",
  wednesdayHours: "",
  thursdayHours: "",
  fridayHours: "",
  saturdayHours: "",
  sundayHours: "",
  services: [],
  imageUrl: "",
  plan: "Free",
  acceptsReservations: false,
  acceptsWalkIns: true,
  hasParking: false,
  hasWifi: false,
  isWheelchairAccessible: false,
};

const categories = [
  "Restaurant",
  "Coffee Shop",
  "Fitness",
  "Beauty & Spa",
  "Professional Services",
  "Retail",
  "Healthcare",
  "Automotive",
  "Education",
  "Entertainment",
  "Real Estate",
  "Legal Services",
  "Financial Services",
  "Home Services",
  "Technology",
  "Other"
];

const popularServices = [
  "Delivery", "Takeout", "Dine-in", "Catering", "WiFi", "Parking",
  "Personal Training", "Group Classes", "Equipment Rental",
  "Massage", "Facials", "Hair Services", "Nail Services",
  "Consultation", "Emergency Services", "24/7 Support",
  "Online Shopping", "Gift Cards", "Returns & Exchanges",
  "Free Estimates", "Installation", "Repair Services"
];

const plans = [
  {
    id: "Free",
    name: "Free",
    price: "$0",
    features: ["Basic listing", "Contact information", "5 photos"],
    color: "bg-gray-500"
  },
  {
    id: "Basic",
    name: "Basic",
    price: "$29",
    features: ["Everything in Free", "Business hours", "Services list", "Customer reviews"],
    color: "bg-gradient-to-r from-green-500 to-green-600"
  },
  {
    id: "Advanced",
    name: "Advanced", 
    price: "$59",
    features: ["Everything in Basic", "Photo gallery", "Social media links", "Promotions"],
    color: "bg-gradient-to-r from-blue-500 to-blue-600"
  },
  {
    id: "Premium",
    name: "Premium",
    price: "$99",
    features: ["Everything in Advanced", "Priority placement", "Analytics", "Swap Ads network"],
    color: "bg-gradient-to-r from-purple-500 to-purple-600"
  }
];

interface AddListingPageProps {
  selectedPlan?: string | null;
}

export function AddListingPage({ selectedPlan }: AddListingPageProps) {
  const [formData, setFormData] = useState<BusinessFormData>({
    ...initialFormData,
    plan: (selectedPlan as "Free" | "Basic" | "Advanced" | "Premium") || "Free"
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [newService, setNewService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 4;

  const updateFormData = (field: keyof BusinessFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addService = (service: string) => {
    if (service && !formData.services.includes(service)) {
      updateFormData("services", [...formData.services, service]);
    }
    setNewService("");
  };

  const removeService = (service: string) => {
    updateFormData("services", formData.services.filter(s => s !== service));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.description && formData.category);
      case 2:
        return !!(formData.address && formData.city && formData.phone);
      case 3:
        return !!(formData.mondayHours || formData.tuesdayHours || formData.wednesdayHours || 
                 formData.thursdayHours || formData.fridayHours || formData.saturdayHours || formData.sundayHours);
      case 4:
        return true; // Plan selection is optional, defaults to Free
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Business listing submitted:", formData);
      
      // Show success message
      setShowSuccess(true);
      
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setFormData(initialFormData);
        setCurrentStep(1);
        setIsSubmitting(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("Error creating listing. Please try again.");
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2" />
          Basic Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              placeholder="Enter your business name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select business category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your business (1-2 sentences)"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              className="mt-1"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="fullDescription">Detailed Description</Label>
            <Textarea
              id="fullDescription"
              placeholder="Provide more details about your business, services, and what makes you unique"
              value={formData.fullDescription}
              onChange={(e) => updateFormData("fullDescription", e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="imageUrl">Business Photo URL</Label>
            <div className="flex gap-2 mt-1">
              <div className="flex-1">
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/business-photo.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => updateFormData("imageUrl", e.target.value)}
                />
              </div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Location & Contact
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={(e) => updateFormData("address", e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="State"
                value={formData.state}
                onChange={(e) => updateFormData("state", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                placeholder="12345"
                value={formData.zipCode}
                onChange={(e) => updateFormData("zipCode", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="business@example.com"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              placeholder="https://yourbusiness.com"
              value={formData.website}
              onChange={(e) => updateFormData("website", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Business Hours & Services
        </h3>
        
        <div className="space-y-6">
          {/* Business Hours */}
          <div>
            <h4 className="mb-3">Business Hours</h4>
            <div className="space-y-2">
              {[
                { day: "Monday", key: "mondayHours" },
                { day: "Tuesday", key: "tuesdayHours" },
                { day: "Wednesday", key: "wednesdayHours" },
                { day: "Thursday", key: "thursdayHours" },
                { day: "Friday", key: "fridayHours" },
                { day: "Saturday", key: "saturdayHours" },
                { day: "Sunday", key: "sundayHours" }
              ].map(({ day, key }) => (
                <div key={day} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                  <Label className="md:text-right">{day}</Label>
                  <Input
                    placeholder="9:00 AM - 5:00 PM or Closed"
                    value={formData[key as keyof BusinessFormData] as string}
                    onChange={(e) => updateFormData(key as keyof BusinessFormData, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Services */}
          <div>
            <h4 className="mb-3 flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              Services Offered
            </h4>
            
            {/* Popular Services */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Popular services:</p>
              <div className="flex flex-wrap gap-2">
                {popularServices.map((service) => (
                  <Badge
                    key={service}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 border-primary/20"
                    onClick={() => addService(service)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Custom Service Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Add custom service"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addService(newService)}
              />
              <Button 
                variant="outline" 
                onClick={() => addService(newService)}
                className="border-primary text-primary hover:bg-primary/5"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Selected Services */}
            {formData.services.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Selected services:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service) => (
                    <Badge key={service} className="bg-primary/10 text-primary border-primary/20">
                      {service}
                      <X 
                        className="w-3 h-3 ml-1 cursor-pointer" 
                        onClick={() => removeService(service)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Business Features */}
          <div>
            <h4 className="mb-3">Business Features</h4>
            <div className="space-y-3">
              {[
                { key: "acceptsReservations", label: "Accepts Reservations" },
                { key: "acceptsWalkIns", label: "Accepts Walk-ins" },
                { key: "hasParking", label: "Has Parking Available" },
                { key: "hasWifi", label: "Offers Free WiFi" },
                { key: "isWheelchairAccessible", label: "Wheelchair Accessible" }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <Label>{label}</Label>
                  <Switch
                    checked={formData[key as keyof BusinessFormData] as boolean}
                    onCheckedChange={(checked) => updateFormData(key as keyof BusinessFormData, checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Choose Your Plan
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`cursor-pointer transition-all ${
                formData.plan === plan.id 
                  ? "border-primary shadow-lg bg-primary/5" 
                  : "hover:shadow-md"
              }`}
              onClick={() => updateFormData("plan", plan.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${plan.color} mr-2`}></div>
                    {plan.name}
                  </CardTitle>
                  {formData.plan === plan.id && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
                <CardDescription className="text-2xl font-semibold text-foreground">
                  {plan.price}
                  {plan.id !== "Free" && <span className="text-sm text-muted-foreground">/month</span>}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-secondary/50 p-4 rounded-lg border border-secondary">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="mb-1">Plan Benefits</h4>
              <p className="text-sm text-muted-foreground">
                You can upgrade or downgrade your plan at any time. Higher plans give you better visibility, 
                more features, and access to our Swap Ads network for cross-promotion with other businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary to-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  // Show success message after submission
  if (showSuccess) {
    const isPaidPlan = formData.plan !== "Free";
    
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <Card className="text-center border-2 border-border/80">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-green-600">Hub Created Successfully!</h2>
            
            {isPaidPlan ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Your hub has been saved as a draft with the <Badge className={plans.find(p => p.id === formData.plan)?.color}>{formData.plan}</Badge> plan.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    <span className="font-medium text-amber-800">Payment Required</span>
                  </div>
                  <p className="text-sm text-amber-700">
                    Your hub will be reviewed and published after payment is completed. 
                    You can complete payment from your dashboard.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Status: <Badge variant="outline" className="text-amber-600 border-amber-300">Pending Payment</Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Your free hub has been created and saved as a draft for review.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Under Review</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your hub is being reviewed by our team and will be published within 24-48 hours.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Status: <Badge variant="outline" className="text-blue-600 border-blue-300">Under Review</Badge>
                </div>
              </div>
            )}
            
            <div className="mt-6 text-sm text-muted-foreground">
              Redirecting to dashboard in a few seconds...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1>Add Your Business to NOBOX HUB</h1>
        <p className="text-muted-foreground">
          Join our community and connect with customers in your area
        </p>
        {selectedPlan && (
          <Badge className={plans.find(p => p.id === selectedPlan)?.color || "bg-gray-500"}>
            Selected Plan: {selectedPlan}
          </Badge>
        )}
      </div>

      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Form Card */}
      <Card>
        <CardContent className="p-6">
          {/* Step Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!validateStep(currentStep)}
                  className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !validateStep(currentStep)}
                  className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Listing...
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4 mr-2" />
                      Create Listing
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Text */}
      <div className="text-center text-sm text-muted-foreground">
        Need help? <Button variant="link" className="p-0 h-auto text-primary">Contact our support team</Button>
      </div>
    </div>
  );
}