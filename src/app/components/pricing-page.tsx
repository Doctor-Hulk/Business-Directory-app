import { Check, Star, Users, Globe, Smartphone, TrendingUp, BarChart3, Target } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  gradient: string;
  icon: React.ReactNode;
}

interface PricingPageProps {
  onPlanSelect?: (plan: string) => void;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with your business listing",
    features: [
      "Basic business listing",
      "Contact information display",
      "Business hours posting",
      "Customer reviews",
      "Photo gallery (up to 5 images)",
      "Basic analytics dashboard",
      "Community support"
    ],
    buttonText: "Get Started Free",
    gradient: "bg-gradient-to-br from-gray-500 to-slate-600",
    icon: <Star className="w-6 h-6" />
  },
  {
    name: "Basic",
    price: "$29",
    period: "per month",
    description: "Professional one-page website to showcase your business",
    features: [
      "Everything in Free plan",
      "One-page professional website",
      "Portfolio showcase section",
      "About & contact page integration",
      "Custom domain connection",
      "SEO optimization basics",
      "Swap Ads network access",
      "Priority customer support",
      "Social media integration"
    ],
    buttonText: "Start Basic Plan",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    icon: <Globe className="w-6 h-6" />
  },
  {
    name: "Advanced",
    price: "$89",
    period: "per month",
    description: "Full-featured websites for ecommerce, blogs, and more",
    features: [
      "Everything in Basic plan",
      "Multi-page advanced website",
      "E-commerce functionality",
      "Blog & content management",
      "Church/organization templates",
      "Advanced SEO tools",
      "Enhanced Swap Ads features",
      "Email marketing integration",
      "Advanced analytics",
      "Custom forms & lead capture",
      "Payment processing setup"
    ],
    isPopular: true,
    buttonText: "Choose Advanced",
    gradient: "bg-gradient-to-br from-primary to-green-600",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    name: "Premium",
    price: "$199",
    period: "per month",
    description: "Complete digital ecosystem with mobile apps and management",
    features: [
      "Everything in Advanced plan",
      "Custom mobile app development",
      "Cross-platform app deployment",
      "Social media management",
      "Content creation services",
      "Premium Swap Ads placement",
      "Dedicated account manager",
      "White-label solutions",
      "API access & integrations",
      "24/7 priority support",
      "Custom development requests",
      "Marketing automation",
      "Advanced business intelligence"
    ],
    buttonText: "Go Premium",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    icon: <Smartphone className="w-6 h-6" />
  }
];

export function PricingPage({ onPlanSelect }: PricingPageProps = {}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="px-4 pt-8 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-green-600 text-white">
              PRICING PLANS
            </Badge>
            <h1 className="mb-4 bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
              Choose Your Growth Plan
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From basic listings to complete digital ecosystems, we have the perfect plan to accelerate your business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={tier.name} 
                className={`relative overflow-hidden h-full border-2 ${
                  tier.isPopular ? 'ring-2 ring-primary shadow-xl scale-105 border-primary/60' : 'hover:shadow-lg border-border/80 hover:border-primary/40'
                } transition-all duration-200`}
              >
                {tier.isPopular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-gradient-to-r from-primary to-green-600 text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className={`${tier.gradient} text-white ${tier.isPopular ? 'pt-12' : 'pt-6'} pb-6`}>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      {tier.icon}
                    </div>
                    <h3 className="font-medium mb-2">{tier.name}</h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold">{tier.price}</span>
                      <span className="text-white/80 text-sm ml-1">/{tier.period}</span>
                    </div>
                    <p className="text-white/90 text-sm">{tier.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      tier.isPopular 
                        ? 'bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90' 
                        : tier.name === 'Free'
                        ? 'bg-gray-600 hover:bg-gray-700'
                        : `${tier.gradient} hover:opacity-90`
                    }`}
                    onClick={() => onPlanSelect && onPlanSelect(tier.name)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Swap Ads Feature Highlight */}
      <section className="px-4 py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-border/80">
            <CardHeader className="bg-gradient-to-r from-primary to-green-600 text-white text-center py-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="mb-2">Introducing Swap Ads</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Revolutionary cross-promotion network available for Basic to Premium subscribers
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    How It Works
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Match with businesses of similar web traffic and audience
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Automatically cross-promote each other's services
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Expand your reach without additional advertising costs
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Build valuable business partnerships
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Benefits
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Increase brand visibility and customer base
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Cost-effective marketing solution
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Intelligent matching based on audience compatibility
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Premium subscribers get priority placement
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ or Additional Info */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">Need Help Choosing?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is here to help you select the perfect plan for your business needs. 
            Start with our Free plan and upgrade anytime as your business grows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Contact Sales
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}