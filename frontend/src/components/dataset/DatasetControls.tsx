import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface DatasetControlsProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const DatasetControls = ({
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
}: DatasetControlsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Sort By</label>
        <Select onValueChange={setSortBy} value={sortBy}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="default">Default Order</SelectItem>
            <SelectItem value="fare-asc">Fare (Low to High)</SelectItem>
            <SelectItem value="fare-desc">Fare (High to Low)</SelectItem>
            <SelectItem value="name-asc">Passenger Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Passenger Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white"
        />
      </div>
    </div>
  );
};