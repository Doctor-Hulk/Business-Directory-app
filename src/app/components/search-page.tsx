import { Search, Filter, MapPin, ChevronDown, ChevronUp, Menu, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useState, useEffect } from "react";
import { BusinessGrid } from "./business-grid";

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

interface SearchPageProps {
  businesses: Business[];
  onBusinessSelect: (business: Business) => void;
  onCallClick: (businessId: string) => void;
  onWebsiteClick: (businessId: string) => void;
  onLikeClick: (businessId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  selectedLocations: string[];
  onLocationsChange: (locations: string[]) => void;
  selectedSortOptions: string[];
  onSortOptionsChange: (options: string[]) => void;
  onMenuClick: () => void;
  onBackClick: () => void;
}

export function SearchPage({
  businesses,
  onBusinessSelect,
  onCallClick,
  onWebsiteClick,
  onLikeClick,
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  selectedLocations,
  onLocationsChange,
  selectedSortOptions,
  onSortOptionsChange,
  onMenuClick,
  onBackClick,
}: SearchPageProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempCategories, setTempCategories] = useState<string[]>(selectedCategories);
  const [tempLocations, setTempLocations] = useState<string[]>(selectedLocations);
  const [tempSortOptions, setTempSortOptions] = useState<string[]>(selectedSortOptions);

  const categories = [
    "Restaurant",
    "Coffee Shop", 
    "Retail",
    "Fitness",
    "Beauty & Spa",
    "Professional Services",
    "Healthcare",
    "Education",
    "Entertainment",
    "Automotive"
  ];

  const locations = [
    "Downtown",
    "North Side",
    "South Side",
    "East Side",
    "West Side",
    "Midtown",
    "Suburbs",
    "Waterfront",
    "Arts District",
    "Business District"
  ];

  const sortOptions = [
    "Eco Pay",
    "Most Ecoscore",
    "Most Liked",
    "Most Called",
    "Most Visited",
    "Most Web Visits"
  ];

  // Update temp states when props change
  useEffect(() => {
    setTempCategories(selectedCategories);
    setTempLocations(selectedLocations);
    setTempSortOptions(selectedSortOptions);
  }, [selectedCategories, selectedLocations, selectedSortOptions]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setTempCategories(prev => [...prev, category]);
    } else {
      setTempCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setTempLocations(prev => [...prev, location]);
    } else {
      setTempLocations(prev => prev.filter(l => l !== location));
    }
  };

  const handleSortOptionChange = (option: string, checked: boolean) => {
    if (checked) {
      setTempSortOptions(prev => [...prev, option]);
    } else {
      setTempSortOptions(prev => prev.filter(o => o !== option));
    }
  };

  const handleApplyFilters = () => {
    onCategoriesChange(tempCategories);
    onLocationsChange(tempLocations);
    onSortOptionsChange(tempSortOptions);
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Section */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="px-3 py-3">
          {/* Header with navigation */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBackClick}
              className="p-1.5 hover:bg-accent rounded-md transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onMenuClick}
              className="p-1.5 hover:bg-accent rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-medium">Search & Filter</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search businesses, services, or categories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 bg-input-background"
            />
          </div>

          {/* Filters Dropdown Button */}
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="outline"
            className="w-full justify-between border-primary/20 hover:bg-primary/5"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {(selectedCategories.length > 0 || selectedLocations.length > 0 || selectedSortOptions.length > 0) && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {selectedCategories.length + selectedLocations.length + selectedSortOptions.length}
                </span>
              )}
            </div>
            {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          {/* Filter Options - Collapsible */}
          {isFilterOpen && (
            <div className="mt-3 p-3 bg-card border rounded-lg shadow-sm">
              <div className="grid grid-cols-3 gap-4">
                {/* Categories */}
                <div>
                  <h4 className="text-xs mb-2 text-primary font-medium">Category</h4>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={tempCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                          className="scale-75"
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-[10px] cursor-pointer leading-tight"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div>
                  <h4 className="text-xs mb-2 flex items-center gap-1 text-primary font-medium">
                    <MapPin className="w-3 h-3" />
                    Location
                  </h4>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-${location}`}
                          checked={tempLocations.includes(location)}
                          onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                          className="scale-75"
                        />
                        <label
                          htmlFor={`location-${location}`}
                          className="text-[10px] cursor-pointer leading-tight"
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Others - Sort Options */}
                <div>
                  <h4 className="text-xs mb-2 text-primary font-medium">Others</h4>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {sortOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sort-${option}`}
                          checked={tempSortOptions.includes(option)}
                          onCheckedChange={(checked) => handleSortOptionChange(option, checked as boolean)}
                          className="scale-75"
                        />
                        <label
                          htmlFor={`sort-${option}`}
                          className="text-[10px] cursor-pointer leading-tight"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-3">
                <Button 
                  onClick={handleApplyFilters} 
                  className="w-full h-8 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-xs py-1"
                >
                  Search & Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="px-3 py-4">
        <BusinessGrid
          businesses={businesses}
          onBusinessSelect={onBusinessSelect}
          onCallClick={onCallClick}
          onWebsiteClick={onWebsiteClick}
          onLikeClick={onLikeClick}
        />
      </div>
    </div>
  );
}