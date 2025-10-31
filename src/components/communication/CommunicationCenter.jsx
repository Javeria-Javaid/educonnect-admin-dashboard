import { useState } from 'react';
import { Search, Filter, Send, MessageSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
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

export default function CommunicationCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketDialog, setShowTicketDialog] = useState(false);

  const tickets = [
    {
      id: 'TKT-1001',
      subject: 'Unable to approve school registration',
      category: 'Technical',
      priority: 'high',
      status: 'open',
      submittedBy: 'John Doe',
      email: 'john.doe@school.com',
      createdDate: '2025-10-30 09:00 AM',
      lastUpdate: '2025-10-30 09:30 AM',
      messages: 3,
    },
    {
      id: 'TKT-1002',
      subject: 'Payment verification issue',
      category: 'Billing',
      priority: 'medium',
      status: 'in-progress',
      submittedBy: 'Sarah Johnson',
      email: 'sarah.j@vendor.com',
      createdDate: '2025-10-29 02:15 PM',
      lastUpdate: '2025-10-30 08:00 AM',
      messages: 5,
    },
    {
      id: 'TKT-1003',
      subject: 'Request for feature: Bulk upload',
      category: 'Feature Request',
      priority: 'low',
      status: 'open',
      submittedBy: 'Michael Chen',
      email: 'michael.c@school.com',
      createdDate: '2025-10-28 11:30 AM',
      lastUpdate: '2025-10-29 03:45 PM',
      messages: 2,
    },
    {
      id: 'TKT-1004',
      subject: 'Data export not working',
      category: 'Technical',
      priority: 'high',
      status: 'in-progress',
      submittedBy: 'Emily Brown',
      email: 'emily.b@school.com',
      createdDate: '2025-10-30 10:20 AM',
      lastUpdate: '2025-10-30 10:45 AM',
      messages: 4,
    },
    {
      id: 'TKT-1005',
      subject: 'Account access issue',
      category: 'Access',
      priority: 'medium',
      status: 'resolved',
      submittedBy: 'David Wilson',
      email: 'david.w@vendor.com',
      createdDate: '2025-10-27 01:00 PM',
      lastUpdate: '2025-10-28 09:00 AM',
      messages: 6,
    },
  ];

  const getPriorityBadge = (priority) => {
    const variants = {
      high: { variant: 'destructive', text: 'High' },
      medium: { variant: 'secondary', text: 'Medium', className: 'bg-yellow-100 text-yellow-700' },
      low: { variant: 'outline', text: 'Low' },
    };
    const config = variants[priority];
    return <Badge variant={config.variant} className={config.className}>{config.text}</Badge>;
  };

  const getStatusBadge = (status) => {
    const variants = {
      open: { variant: 'secondary', text: 'Open', icon: AlertCircle },
      'in-progress': { variant: 'default', text: 'In Progress', className: 'bg-[#2563EB]', icon: Clock },
      resolved: { variant: 'default', text: 'Resolved', className: 'bg-[#16A34A]', icon: CheckCircle },
    };
    const config = variants[status];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon size={12} className="mr-1" />
        {config.text}
      </Badge>
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Communication Center</h1>
          <p className="text-gray-600 mt-1">Manage support tickets and communications</p>
        </div>
        <Button className="bg-[#2563EB] hover:bg-blue-700">
          <Send size={20} className="mr-2" />
          New Broadcast
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tickets</p>
                <h2 className="mt-2">1,247</h2>
              </div>
              <MessageSquare size={24} className="text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open</p>
                <h2 className="mt-2 text-yellow-600">156</h2>
              </div>
              <AlertCircle size={24} className="text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <h2 className="mt-2 text-[#2563EB]">89</h2>
              </div>
              <Clock size={24} className="text-[#2563EB]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <h2 className="mt-2 text-[#16A34A]">1,002</h2>
              </div>
              <CheckCircle size={24} className="text-[#16A34A]" />
            </div>
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
                placeholder="Search tickets by ID or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Ticket ID</th>
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Submitted By</th>
                  <th className="text-left py-3 px-4">Priority</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Last Update</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-mono text-sm">{ticket.id}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p>{ticket.subject}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MessageSquare size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{ticket.messages} messages</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{ticket.category}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <p>{ticket.submittedBy}</p>
                      <p className="text-sm text-gray-500">{ticket.email}</p>
                    </td>
                    <td className="py-4 px-4">{getPriorityBadge(ticket.priority)}</td>
                    <td className="py-4 px-4">{getStatusBadge(ticket.status)}</td>
                    <td className="py-4 px-4 text-sm">{ticket.lastUpdate}</td>
                    <td className="py-4 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Details Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
            <DialogDescription>View and respond to support ticket</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-6 mt-4">
              {/* Ticket Info */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-500">Ticket ID</p>
                  <p className="mt-1 font-mono">{selectedTicket.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedTicket.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <div className="mt-1">{getPriorityBadge(selectedTicket.priority)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="mt-1">{selectedTicket.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted By</p>
                  <p className="mt-1">{selectedTicket.submittedBy}</p>
                  <p className="text-sm text-gray-500">{selectedTicket.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="mt-1">{selectedTicket.createdDate}</p>
                </div>
              </div>

              {/* Subject */}
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="mt-1">{selectedTicket.subject}</p>
              </div>

              {/* Message Thread */}
              <div>
                <p className="text-sm text-gray-500 mb-3">Conversation</p>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm">
                        {selectedTicket.submittedBy.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p>{selectedTicket.submittedBy}</p>
                          <p className="text-xs text-gray-500">{selectedTicket.createdDate}</p>
                        </div>
                        <p className="text-sm text-gray-700">
                          I'm having trouble approving a new school registration. When I click the approve button, nothing happens and the status doesn't change. This is blocking our onboarding process.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm">
                        SA
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p>Support Admin</p>
                          <p className="text-xs text-gray-500">2025-10-30 09:15 AM</p>
                        </div>
                        <p className="text-sm text-gray-700">
                          Thank you for reporting this issue. Our team is investigating the problem. Could you please provide the school ID that you're trying to approve?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm">
                        {selectedTicket.submittedBy.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p>{selectedTicket.submittedBy}</p>
                          <p className="text-xs text-gray-500">2025-10-30 09:30 AM</p>
                        </div>
                        <p className="text-sm text-gray-700">
                          Sure, the school ID is SCH-2453. Thanks for looking into this!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply Form */}
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">Reply</p>
                <Textarea
                  placeholder="Type your response here..."
                  rows={4}
                  className="mb-3"
                />
                <div className="flex gap-3">
                  <Button className="bg-[#2563EB] hover:bg-blue-700">
                    <Send size={16} className="mr-2" />
                    Send Reply
                  </Button>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Mark as Open</SelectItem>
                      <SelectItem value="in-progress">Mark as In Progress</SelectItem>
                      <SelectItem value="resolved">Mark as Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
