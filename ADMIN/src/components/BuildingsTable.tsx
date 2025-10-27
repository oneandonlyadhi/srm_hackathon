import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { MoreVertical, MapPin, Edit, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Building {
  id: number;
  name: string;
  location: string;
  totalSpots: number;
  occupiedSpots: number;
  revenue: number;
  status: "active" | "maintenance";
}

const initialBuildings: Building[] = [
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
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [formData, setFormData] = useState<Omit<Building, "id">>({
    name: "",
    location: "",
    totalSpots: 0,
    occupiedSpots: 0,
    revenue: 0,
    status: "active",
  });

  const getOccupancyRate = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100);
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return "destructive";
    if (rate >= 70) return "default";
    return "secondary";
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      totalSpots: 0,
      occupiedSpots: 0,
      revenue: 0,
      status: "active",
    });
  };

  // Add building
  const handleAddBuilding = () => {
    const newBuilding: Building = {
      id: Math.max(...buildings.map((b) => b.id)) + 1,
      ...formData,
    };
    setBuildings([...buildings, newBuilding]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  // Edit building
  const handleEditClick = (building: Building) => {
    setSelectedBuilding(building);
    setFormData({
      name: building.name,
      location: building.location,
      totalSpots: building.totalSpots,
      occupiedSpots: building.occupiedSpots,
      revenue: building.revenue,
      status: building.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateBuilding = () => {
    if (selectedBuilding) {
      setBuildings(
        buildings.map((b) =>
          b.id === selectedBuilding.id ? { ...b, ...formData } : b
        )
      );
      setIsEditDialogOpen(false);
      setSelectedBuilding(null);
      resetForm();
    }
  };

  // Delete building
  const handleDeleteClick = (building: Building) => {
    setSelectedBuilding(building);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteBuilding = () => {
    if (selectedBuilding) {
      setBuildings(buildings.filter((b) => b.id !== selectedBuilding.id));
      setIsDeleteDialogOpen(false);
      setSelectedBuilding(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Parking Buildings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage all parking facilities
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Building
          </Button>
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
                const occupancyRate = getOccupancyRate(
                  building.occupiedSpots,
                  building.totalSpots
                );
                return (
                  <TableRow key={building.id}>
                    <TableCell>{building.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{building.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {building.totalSpots}
                    </TableCell>
                    <TableCell className="text-right">
                      {building.occupiedSpots}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getOccupancyColor(occupancyRate)}>
                        {occupancyRate}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${building.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          building.status === "active" ? "secondary" : "outline"
                        }
                      >
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
                          <DropdownMenuItem
                            onClick={() => handleEditClick(building)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteClick(building)}
                          >
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

      {/* Add Building Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Building</DialogTitle>
            <DialogDescription>
              Add a new parking building to your management system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Building Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Downtown Plaza Parking"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="123 Main Street, Downtown"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="totalSpots">Total Spots</Label>
                <Input
                  id="totalSpots"
                  type="number"
                  value={formData.totalSpots}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalSpots: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="450"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="occupiedSpots">Occupied Spots</Label>
                <Input
                  id="occupiedSpots"
                  type="number"
                  value={formData.occupiedSpots}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      occupiedSpots: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="428"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="revenue">Monthly Revenue ($)</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    revenue: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="18500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "maintenance") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddBuilding}>Add Building</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Building Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Building</DialogTitle>
            <DialogDescription>
              Update the building information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Building Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Downtown Plaza Parking"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="123 Main Street, Downtown"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-totalSpots">Total Spots</Label>
                <Input
                  id="edit-totalSpots"
                  type="number"
                  value={formData.totalSpots}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalSpots: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="450"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-occupiedSpots">Occupied Spots</Label>
                <Input
                  id="edit-occupiedSpots"
                  type="number"
                  value={formData.occupiedSpots}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      occupiedSpots: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="428"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-revenue">Monthly Revenue ($)</Label>
              <Input
                id="edit-revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    revenue: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="18500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "maintenance") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedBuilding(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateBuilding}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{selectedBuilding?.name}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedBuilding(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBuilding}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
