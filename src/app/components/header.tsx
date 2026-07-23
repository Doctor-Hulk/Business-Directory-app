import { Search, Menu, Bell, User, Filter, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  selectedLocations: string[];
  onLocationsChange: (locations: string[]) => void;
  selectedSortOptions: string[];
  onSortOptionsChange: (options: string[]) => void;
}

export function Header({
  onMenuClick,
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  selectedLocations,
  onLocationsChange,
  selectedSortOptions,
  onSortOptionsChange,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempCategories, setTempCategories] = useState<string[]>(selectedCategories);
  const [tempLocations, setTempLocations] = useState<string[]>(selectedLocations);
  const [tempSortOptions, setTempSortOptions] = useState<string[]>(selectedSortOptions);
  const headerRef = useRef<HTMLElement>(null);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    setIsSearchOpen(false);
    setIsFilterOpen(false);
  };

  return (
    <header ref={headerRef} className="bg-gradient-to-r from-white via-green-50/30 to-emerald-50/30 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-30 border-b border-primary/20 shadow-sm">
      {/* Main Header Row */}
      <div className="flex items-center justify-between px-3 py-2">
        {/* Left side - Menu */}
        <button
          onClick={onMenuClick}
          className="p-1.5 hover:bg-accent rounded-md transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Center - Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-primary to-green-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-primary-foreground text-xs font-bold">NH</span>
          </div>
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">NOBOX HUB</span>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-1">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1.5 hover:bg-accent"
          >
            <Search className="w-5 h-5" />
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="p-1.5 hover:bg-accent">
            <Bell className="w-5 h-5" />
          </Button>
          
          {/* Profile */}
          <Button variant="ghost" size="sm" className="p-1.5 hover:bg-accent">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className="px-3 py-3 bg-card border-t border-primary/10">
          {/* Search Bar and Filter Button Row */}
          <div className="flex gap-2 mb-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search businesses, services, or categories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 bg-input-background border border-primary/20 focus:ring-0 focus:ring-offset-0 focus:shadow-none focus:outline-none"
              />
            </div>

            {/* Filter Dropdown Button */}
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="outline"
              className="border-primary/20 hover:bg-primary/5"
            >
              <Filter className="w-4 h-4 mr-2" />
              <span>Filters</span>
              {(selectedCategories.length > 0 || selectedLocations.length > 0 || selectedSortOptions.length > 0) && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full ml-2">
                  {selectedCategories.length + selectedLocations.length + selectedSortOptions.length}
                </span>
              )}
              {isFilterOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {/* Filter Options - Collapsible */}
          {isFilterOpen && (
            <div className="mb-3 p-3 bg-muted/30 border rounded-lg">
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
            </div>
          )}

          {/* Search & Apply Filters Button - Always Visible */}
          <div>
            <Button 
              onClick={handleApplyFilters} 
              className="w-full h-8 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-xs py-1"
            >
              Search & Apply Filters
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}