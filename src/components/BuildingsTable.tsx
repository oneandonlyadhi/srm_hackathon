import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { MoreVertical, MapPin, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const buildings = [
  {
    id: 1,
    name: "Downtown Plaza Parking",
    location: "123 Main Street, Downtown",
    totalSpots: 450,
    occupiedSpots: 428,
    revenue: 18500,
    status: "active",
  },
  {
    id: 2,
    name: "Airport Parking A",
    location: "Terminal 1, International Airport",
    totalSpots: 680,
    occupiedSpots: 512,
    revenue: 24300,
    status: "active",
  },
  {
    id: 3,
    name: "Airport Parking B",
    location: "Terminal 2, International Airport",
    totalSpots: 520,
    occupiedSpots: 445,
    revenue: 19800,
    status: "maintenance",
  },
  {
    id: 4,
    name: "Shopping Mall East",
    location: "456 Commerce Blvd",
    totalSpots: 320,
    occupiedSpots: 245,
    revenue: 12100,
    status: "active",
  },
  {
    id: 5,
    name: "Shopping Mall West",
    location: "789 Retail Avenue",
    totalSpots: 280,
    occupiedSpots: 198,
    revenue: 9800,
    status: "active",
  },
  {
    id: 6,
    name: "Central Station",
    location: "Central Railway Station",
    totalSpots: 150,
    occupiedSpots: 142,
    revenue: 8900,
    status: "active",
  },
  {
    id: 7,
    name: "Business District North",
    location: "101 Corporate Drive",
    totalSpots: 95,
    occupiedSpots: 78,
    revenue: 6200,
    status: "active",
  },
  {
    id: 8,
    name: "Stadium Parking",
    location: "Sports Complex, Gate 3",
    totalSpots: 180,
    occupiedSpots: 45,
    revenue: 3400,
    status: "active",
  },
  {
    id: 9,
    name: "Hospital Parking",
    location: "Medical Center Campus",
    totalSpots: 220,
    occupiedSpots: 198,
    revenue: 11200,
    status: "active",
  },
  {
    id: 10,
    name: "University Parking",
    location: "Campus East, Building 12",
    totalSpots: 380,
    occupiedSpots: 312,
    revenue: 14500,
    status: "active",
  },
];

export function BuildingsTable() {
  const getOccupancyRate = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100);
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return "destructive";
    if (rate >= 70) return "default";
    return "secondary";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Parking Buildings</CardTitle>
          <p className="text-sm text-muted-foreground">Manage all parking facilities</p>
        </div>
        <Button>Add New Building</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Building Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Total Spots</TableHead>
              <TableHead className="text-right">Occupied</TableHead>
              <TableHead className="text-right">Occupancy</TableHead>
              <TableHead className="text-right">Revenue/Month</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buildings.map((building) => {
              const occupancyRate = getOccupancyRate(building.occupiedSpots, building.totalSpots);
              return (
                <TableRow key={building.id}>
                  <TableCell>{building.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{building.location}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{building.totalSpots}</TableCell>
                  <TableCell className="text-right">{building.occupiedSpots}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getOccupancyColor(occupancyRate)}>
                      {occupancyRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${building.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={building.status === "active" ? "secondary" : "outline"}>
                      {building.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
