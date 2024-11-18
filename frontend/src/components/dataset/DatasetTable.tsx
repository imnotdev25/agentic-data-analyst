import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Flight {
  airline_id: string;
  flight_number: string;
  departure_dt: string;
  arrival_dt: string;
  dep_time: string;
  arrivl_time: string;
  booking_cd: string;
  passngr_nm: string;
  seat_no: string;
  class: string;
  fare: number;
  extras: string;
  loyalty_pts: number;
  status: string;
  gate: string;
  terminal: string;
  baggage_claim: string;
  duration_hrs: number;
  layovers: number;
  layover_locations: string;
  aircraft_type: string;
  pilot: string;
  cabin_crew: string;
  inflight_ent: string;
  meal_option: string;
  wifi: string;
  window_seat: string;
  aisle_seat: string;
  emergency_exit_row: string;
  number_of_stops: number;
  reward_program_member: string;
}

interface DatasetTableProps {
  data: Flight[];
}

export const DatasetTable = ({ data }: DatasetTableProps) => {
  return (
    <ScrollArea className="h-[600px]">
      <div className="w-[1800px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-white z-20">Airline ID</TableHead>
              <TableHead>Flight #</TableHead>
              <TableHead>Departure Date</TableHead>
              <TableHead>Arrival Date</TableHead>
              <TableHead>Departure Time</TableHead>
              <TableHead>Arrival Time</TableHead>
              <TableHead>Booking Code</TableHead>
              <TableHead>Passenger</TableHead>
              <TableHead>Seat</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead>Extras</TableHead>
              <TableHead>Loyalty Points</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Gate</TableHead>
              <TableHead>Terminal</TableHead>
              <TableHead>Baggage Claim</TableHead>
              <TableHead>Duration (hrs)</TableHead>
              <TableHead>Layovers</TableHead>
              <TableHead>Layover Locations</TableHead>
              <TableHead>Aircraft Type</TableHead>
              <TableHead>Pilot</TableHead>
              <TableHead>Cabin Crew</TableHead>
              <TableHead>Entertainment</TableHead>
              <TableHead>Meal Option</TableHead>
              <TableHead>WiFi</TableHead>
              <TableHead>Window Seat</TableHead>
              <TableHead>Aisle Seat</TableHead>
              <TableHead>Emergency Exit</TableHead>
              <TableHead>Stops</TableHead>
              <TableHead>Reward Member</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Table body will be populated when data is received */}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};
