import { useState } from 'react';
import { Search, Filter, Plus, Check, X, Eye, Package, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function VendorManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const vendors = [
    {
      id: 1,
      name: 'TechBooks Inc',
      category: 'Books & Stationery',
      contact: 'John Smith',
      email: 'contact@techbooks.com',
      phone: '+1 555-1234',
      rating: 4.5,
      totalOrders: 234,
      status: 'active',
      joinedDate: '2024-05-15',
      products: 156,
      verified: true,
    },
    {
      id: 2,
      name: 'Smart Uniforms Ltd',
      category: 'Uniforms',
      contact: 'Sarah Johnson',
      email: 'info@smartuniforms.com',
      phone: '+1 555-5678',
      rating: 4.8,
      totalOrders: 189,
      status: 'pending',
      joinedDate: '2025-10-20',
      products: 45,
      verified: false,
    },
    {
      id: 3,
      name: 'Digital Learning Solutions',
      category: 'Technology',
      contact: 'Mike Chen',
      email: 'support@digitallearn.com',
      phone: '+1 555-9012',
      rating: 4.7,
      totalOrders: 312,
      status: 'active',
      joinedDate: '2024-03-10',
      products: 89,
      verified: true,
    },
    {
      id: 4,
      name: 'Fresh Meals Catering',
      category: 'Food Services',
      contact: 'Maria Garcia',
      email: 'orders@freshmeals.com',
      phone: '+1 555-3456',
      rating: 4.3,
      totalOrders: 445,
      status: 'active',
      joinedDate: '2024-01-25',
      products: 23,
      verified: true,
    },
    {
      id: 5,
      name: 'Safe Transport Co',
      category: 'Transportation',
      contact: 'David Wilson',
      email: 'contact@safetransport.com',
      phone: '+1 555-7890',
      rating: 4.6,
      totalOrders: 178,
      status: 'inactive',
      joinedDate: '2023-11-05',
      products: 12,
      verified: true,
    },
  ];

  const categories = [
    'Books & Stationery',
    'Technology',
    'Food Services',
    'Transportation',
    'Uniforms',
  ];

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'default', text: 'Active', className: 'bg-[#16A34A]' },
      pending: { variant: 'secondary', text: 'Pending' },
      inactive: { variant: 'outline', text: 'Inactive' },
    };
    const config = variants[status];
    return <Badge variant={config.variant} className={config.className}>{config.text}</Badge>;
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setShowDetailsDialog(true);
  };

  const handleApprove = (vendorId) => {
    console.log('Approving vendor:', vendorId);
  };

  const handleReject = (vendorId) => {
    console.log('Rejecting vendor:', vendorId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Vendor Management</h1>
          <p className="text-gray-600 mt-1">Manage vendors and service providers</p>
        </div>
        <Button className="bg-[#2563EB] hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Total Vendors</p>
            <h2 className="mt-2">456</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Active</p>
            <h2 className="mt-2 text-[#16A34A]">398</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Pending</p>
            <h2 className="mt-2 text-yellow-600">42</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Inactive</p>
            <h2 className="mt-2 text-gray-600">16</h2>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search vendors by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendors ({filteredVendors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Vendor Name</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Contact</th>
                  <th className="text-left py-3 px-4">Rating</th>
                  <th className="text-left py-3 px-4">Orders</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Package size={20} className="text-[#2563EB]" />
                        </div>
                        <div>
                          <p className="flex items-center gap-2">
                            {vendor.name}
                            {vendor.verified && (
                              <Check size={16} className="text-[#16A34A]" />
                            )}
                          </p>
                          <p className="text-sm text-gray-500">{vendor.products} products</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{vendor.category}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <p>{vendor.contact}</p>
                      <p className="text-sm text-gray-500">{vendor.email}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span>{vendor.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{vendor.totalOrders}</td>
                    <td className="py-4 px-4">{getStatusBadge(vendor.status)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(vendor)}
                        >
                          <Eye size={16} />
                        </Button>
                        {vendor.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#16A34A] hover:text-[#16A34A] hover:bg-green-50"
                              onClick={() => handleApprove(vendor.id)}
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleReject(vendor.id)}
                            >
                              <X size={16} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
            <DialogDescription>Complete information about the vendor</DialogDescription>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Vendor Name</p>
                  <p className="mt-1 flex items-center gap-2">
                    {selectedVendor.name}
                    {selectedVendor.verified && (
                      <Badge variant="default" className="bg-[#16A34A]">Verified</Badge>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedVendor.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="mt-1">{selectedVendor.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="mt-1">{selectedVendor.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="mt-1 text-sm">{selectedVendor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="mt-1">{selectedVendor.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{selectedVendor.rating} / 5.0</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="mt-1">{selectedVendor.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Products Listed</p>
                  <p className="mt-1">{selectedVendor.products}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="mt-1">{new Date(selectedVendor.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedVendor.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-[#16A34A] hover:bg-green-700"
                    onClick={() => {
                      handleApprove(selectedVendor.id);
                      setShowDetailsDialog(false);
                    }}
                  >
                    <Check size={20} className="mr-2" />
                    Approve Vendor
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleReject(selectedVendor.id);
                      setShowDetailsDialog(false);
                    }}
                  >
                    <X size={20} className="mr-2" />
                    Reject Vendor
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
