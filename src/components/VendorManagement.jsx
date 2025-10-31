import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Store, Package, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';

const vendors = [
  { id: 1, name: 'ABC Uniforms', category: 'Uniform', products: 145, schools: 32, rating: 4.8, status: 'Verified', revenue: 125000 },
  { id: 2, name: 'Book World', category: 'Books', products: 892, schools: 78, rating: 4.6, status: 'Verified', revenue: 458000 },
  { id: 3, name: 'Smart Stationery', category: 'Stationery', products: 234, schools: 45, rating: 4.7, status: 'Verified', revenue: 89000 },
  { id: 4, name: 'Tech Learning', category: 'Electronics', products: 67, schools: 23, rating: 4.9, status: 'Pending', revenue: 234000 },
  { id: 5, name: 'Sports Pro', category: 'Sports', products: 178, schools: 56, rating: 4.5, status: 'Verified', revenue: 156000 },
  { id: 6, name: 'Art Supplies Co', category: 'Art', products: 312, schools: 41, rating: 4.4, status: 'Pending', revenue: 72000 },
  { id: 7, name: 'Uniform Express', category: 'Uniform', products: 98, schools: 28, rating: 4.3, status: 'Suspended', revenue: 45000 },
  { id: 8, name: 'Digital Books Hub', category: 'Books', products: 1234, schools: 92, rating: 4.8, status: 'Verified', revenue: 567000 },
];

const categories = ['All Categories', 'Uniform', 'Books', 'Stationery', 'Electronics', 'Sports', 'Art'];

export function VendorManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || vendor.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || vendor.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleApprove = (vendor) => {
    toast.success(`${vendor.name} has been approved`);
  };

  const handleReject = (vendor) => {
    toast.error(`${vendor.name} has been rejected`);
  };

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-[#111827]">Vendor Management</h1>
          <p className="text-gray-600 mt-1">Manage vendors, products, and pricing across the platform.</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Search vendors by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
              <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Store className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{vendor.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {vendor.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge
                        variant="secondary"
                        className={
                          vendor.status === 'Verified'
                              ? 'bg-green-50 text-green-700'
                              : vendor.status === 'Pending'
                                  ? 'bg-orange-50 text-orange-700'
                                  : 'bg-red-50 text-red-700'
                        }
                    >
                      {vendor.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Products
                  </span>
                      <span className="text-gray-900">{vendor.products}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Store className="w-4 h-4" />
                    Linked Schools
                  </span>
                      <span className="text-gray-900">{vendor.schools}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Rating
                  </span>
                      <span className="text-gray-900 flex items-center gap-1">
                    {vendor.rating}
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </span>
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-600">Monthly Revenue</div>
                      <div className="text-gray-900 mt-1">₹{vendor.revenue.toLocaleString()}</div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      {vendor.status === 'Pending' ? (
                          <>
                            <Button
                                size="sm"
                                className="flex-1 bg-[#16A34A] hover:bg-green-700"
                                onClick={() => handleApprove(vendor)}
                            >
                              Approve
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleReject(vendor)}
                            >
                              Reject
                            </Button>
                          </>
                      ) : (
                          <>
                            <Button size="sm" className="flex-1 bg-[#2563EB] hover:bg-[#1e40af]">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              Products
                            </Button>
                          </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
  );
}