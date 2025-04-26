
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from 'lucide-react';

interface EventFiltersProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    date: string;
    location: string;
    isPaid: boolean | null;
  }) => void;
}

const EventFilters = ({ onFilterChange }: EventFiltersProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search,
      category,
      date,
      location,
      isPaid
    });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setDate("");
    setLocation("");
    setIsPaid(null);
    onFilterChange({
      search: "",
      category: "",
      date: "",
      location: "",
      isPaid: null
    });
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm border p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search for events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 input-primary"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto w-full flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          
          <Button 
            type="submit" 
            className="bg-eventPrimary hover:bg-eventSecondary md:w-auto w-full"
          >
            Search
          </Button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger className="input-primary">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Live">Live</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Select
                value={date}
                onValueChange={setDate}
              >
                <SelectTrigger className="input-primary">
                  <SelectValue placeholder="Any Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Date</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="next-month">Next Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select
                value={location}
                onValueChange={setLocation}
              >
                <SelectTrigger className="input-primary">
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Location</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="in-person">In-person</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Event Type</label>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  variant={isPaid === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPaid(isPaid === true ? null : true)}
                >
                  Paid
                </Button>
                <Button 
                  type="button"
                  variant={isPaid === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPaid(isPaid === false ? null : false)}
                >
                  Free
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-3 flex justify-end">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleReset}
                className="text-gray-500"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EventFilters;
