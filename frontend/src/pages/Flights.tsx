import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Flights = () => {
  const [airlineFilter, setAirlineFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchTerm, setSearchTerm] = useState("");

  const dummyData = [
    { id: 1, flightNumber: "AA123", airline: "American Airlines", departure: "New York", arrival: "Los Angeles", price: 350, status: "On Time" },
    { id: 2, flightNumber: "UA456", airline: "United Airlines", departure: "Chicago", arrival: "Miami", price: 280, status: "Delayed" },
    { id: 3, flightNumber: "DL789", airline: "Delta Airlines", departure: "Seattle", arrival: "Boston", price: 420, status: "On Time" },
    { id: 4, flightNumber: "SW012", airline: "Southwest", departure: "Dallas", arrival: "Las Vegas", price: 195, status: "On Time" },
    { id: 5, flightNumber: "JB345", airline: "JetBlue", departure: "Boston", arrival: "Orlando", price: 165, status: "Cancelled" },
  ];

  const filteredAndSortedData = useMemo(() => {
    let result = [...dummyData];

    if (airlineFilter !== "all") {
      result = result.filter(item => item.airline === airlineFilter);
    }

    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortBy !== "default") {
      result.sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "flight-asc":
            return a.flightNumber.localeCompare(b.flightNumber);
          case "flight-desc":
            return b.flightNumber.localeCompare(a.flightNumber);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [dummyData, airlineFilter, sortBy, searchTerm]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Flight Dataset</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Airline</label>
              <Select onValueChange={setAirlineFilter} value={airlineFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select airline" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Airlines</SelectItem>
                  <SelectItem value="American Airlines">American Airlines</SelectItem>
                  <SelectItem value="United Airlines">United Airlines</SelectItem>
                  <SelectItem value="Delta Airlines">Delta Airlines</SelectItem>
                  <SelectItem value="Southwest">Southwest</SelectItem>
                  <SelectItem value="JetBlue">JetBlue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select onValueChange={setSortBy} value={sortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="default">Default Order</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="flight-asc">Flight Number (A-Z)</SelectItem>
                  <SelectItem value="flight-desc">Flight Number (Z-A)</SelectItem>
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
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-6">
            <h2 className="text-xl font-semibold mb-4">Filtered Flights</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Flight Number</TableHead>
                  <TableHead>Airline</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Arrival</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>{flight.flightNumber}</TableCell>
                    <TableCell>{flight.airline}</TableCell>
                    <TableCell>{flight.departure}</TableCell>
                    <TableCell>{flight.arrival}</TableCell>
                    <TableCell>${flight.price}</TableCell>
                    <TableCell>{flight.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Flights;