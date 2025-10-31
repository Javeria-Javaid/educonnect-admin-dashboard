import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Filter, Eye, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';

const schools = [
  { id: 1, name: 'Springfield Academy', type: 'Primary', region: 'North', status: 'Active', verified: true, admissions: 45, contact: 'principal@springfield.edu' },
  { id: 2, name: 'Green Valley School', type: 'Secondary', region: 'South', status: 'Active', verified: true, admissions: 32, contact: 'admin@greenvalley.edu' },
  { id: 3, name: 'Riverside High', type: 'Higher Secondary', region: 'East', status: 'Pending', verified: false, admissions: 0, contact: 'info@riverside.edu' },
  { id: 4, name: 'Sunset International', type: 'International', region: 'West', status: 'Active', verified: true, admissions: 78, contact: 'contact@sunset.edu' },
  { id: 5, name: 'Oakwood Public School', type: 'Primary', region: 'Central', status: 'Active', verified: true, admissions: 56, contact: 'hello@oakwood.edu' },
  { id: 6, name: 'Maple Leaf Academy', type: 'Secondary', region: 'North', status: 'Suspended', verified: false, admissions: 0, contact: 'support@maple.edu' },
  { id: 7, name: 'Blue Ridge School', type: 'Primary', region: 'South', status: 'Pending', verified: false, admissions: 0, contact: 'admin@blueridge.edu' },
  { id: 8, name: 'Cedar Grove Institute', type: 'Higher Secondary', region: 'East', status: 'Active', verified: true, admissions: 89, contact: 'info@cedar.edu' },
];

export function SchoolManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSchool, setSelectedSchool] = useState(null);

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || school.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (school) => {
    toast.success(`${school.name} has been approved`);
  };

  const handleReject = (school) => {
    toast.error(`${school.name} has been rejected`);
  };

  const handleSuspend = (school) => {
    toast.success(`${school.name} has been suspended`);
  };

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-[#111827]">School Management</h1>
          <p className="text-gray-600 mt-1">Manage all schools, verify registrations, and monitor admissions.</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Search schools by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schools Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Schools ({filteredSchools.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Admissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.map((school) => (
                    <TableRow key={school.id}>
                      <TableCell>{school.name}</TableCell>
                      <TableCell>{school.type}</TableCell>
                      <TableCell>{school.region}</TableCell>
                      <TableCell>
                        <Badge
                            variant="secondary"
                            className={
                              school.status === 'Active'
                                  ? 'bg-green-50 text-green-700'
                                  : school.status === 'Pending'
                                      ? 'bg-orange-50 text-orange-700'
                                      : 'bg-red-50 text-red-700'
                            }
                        >
                          {school.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {school.verified ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                            <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell>{school.admissions}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedSchool(school)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {school.status === 'Pending' && (
                              <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleApprove(school)}
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleReject(school)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedSchool(school)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit Info</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSuspend(school)}>
                                Suspend
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* School Details Dialog */}
        <Dialog open={!!selectedSchool} onOpenChange={() => setSelectedSchool(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedSchool?.name}</DialogTitle>
              <DialogDescription>Detailed school information and analytics</DialogDescription>
            </DialogHeader>
            {selectedSchool && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="text-gray-900 mt-1">{selectedSchool.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Region</p>
                      <p className="text-gray-900 mt-1">{selectedSchool.region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge
                          variant="secondary"
                          className={
                            selectedSchool.status === 'Active'
                                ? 'bg-green-50 text-green-700'
                                : selectedSchool.status === 'Pending'
                                    ? 'bg-orange-50 text-orange-700'
                                    : 'bg-red-50 text-red-700'
                          }
                      >
                        {selectedSchool.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Verified</p>
                      <p className="text-gray-900 mt-1">{selectedSchool.verified ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Admissions</p>
                      <p className="text-gray-900 mt-1">{selectedSchool.admissions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact Email</p>
                      <p className="text-gray-900 mt-1">{selectedSchool.contact}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 bg-[#2563EB] hover:bg-[#1e40af]">
                      Edit School
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Analytics
                    </Button>
                  </div>
                </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
  );
}