import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Filter, MoreVertical, Flag } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner';

const users = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@email.com', type: 'Parent', status: 'Active', joined: '2024-01-15', loginCount: 145, flagged: false },
  { id: 2, name: 'Priya Singh', email: 'priya@email.com', type: 'Teacher', status: 'Active', joined: '2024-02-10', loginCount: 289, flagged: false },
  { id: 3, name: 'Amit Patel', email: 'amit@email.com', type: 'Student', status: 'Active', joined: '2024-03-05', loginCount: 67, flagged: false },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', type: 'Parent', status: 'Active', joined: '2024-01-20', loginCount: 234, flagged: true },
  { id: 5, name: 'Vikram Sharma', email: 'vikram@email.com', type: 'Teacher', status: 'Inactive', joined: '2023-11-12', loginCount: 45, flagged: false },
  { id: 6, name: 'Ananya Roy', email: 'ananya@email.com', type: 'Student', status: 'Active', joined: '2024-04-01', loginCount: 123, flagged: false },
  { id: 7, name: 'Rahul Verma', email: 'rahul@email.com', type: 'Parent', status: 'Active', joined: '2024-02-28', loginCount: 178, flagged: false },
  { id: 8, name: 'Kavya Reddy', email: 'kavya@email.com', type: 'Teacher', status: 'Active', joined: '2024-03-15', loginCount: 201, flagged: true },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || user.type.toLowerCase() === typeFilter;
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDeactivate = (user) => {
    toast.success(`${user.name}'s account has been deactivated`);
  };

  const handleResetPassword = (user) => {
    toast.success(`Password reset email sent to ${user.email}`);
  };

  const getUserTypeColor = (type) => {
    switch (type) {
      case 'Student': return 'bg-blue-50 text-blue-700';
      case 'Parent': return 'bg-purple-50 text-purple-700';
      case 'Teacher': return 'bg-green-50 text-green-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-[#111827]">User Management</h1>
          <p className="text-gray-600 mt-1">Manage parents, students, and teachers across the platform.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Total Users</div>
              <div className="text-[#111827] mt-2">24,820</div>
              <Badge variant="secondary" className="mt-2 bg-blue-50 text-blue-700">
                +12% this month
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Students</div>
              <div className="text-[#111827] mt-2">12,450</div>
              <Badge variant="secondary" className="mt-2 bg-blue-50 text-blue-700">
                Active
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Parents</div>
              <div className="text-[#111827] mt-2">8,920</div>
              <Badge variant="secondary" className="mt-2 bg-purple-50 text-purple-700">
                Active
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Teachers</div>
              <div className="text-[#111827] mt-2">3,450</div>
              <Badge variant="secondary" className="mt-2 bg-green-50 text-green-700">
                Verified
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="User type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Logins</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className={getUserTypeColor(user.type)}>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-gray-900 flex items-center gap-2">
                              {user.name}
                              {user.flagged && <Flag className="w-3 h-3 text-red-600" />}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getUserTypeColor(user.type)}>
                          {user.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                            variant="secondary"
                            className={
                              user.status === 'Active'
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-gray-50 text-gray-700'
                            }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{user.joined}</TableCell>
                      <TableCell className="text-sm text-gray-600">{user.loginCount}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Activity</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeactivate(user)}>
                              Deactivate
                            </DropdownMenuItem>
                            {user.flagged && (
                                <DropdownMenuItem className="text-red-600">
                                  Review Flagged Account
                                </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
}