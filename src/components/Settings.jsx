import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { User, Shield, Key, Database, Bell } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

const adminRoles = [
  { id: 1, name: 'John Doe', email: 'john@educonnect.com', role: 'Super Admin', status: 'Active', lastLogin: '2 hours ago' },
  { id: 2, name: 'Jane Smith', email: 'jane@educonnect.com', role: 'Support Admin', status: 'Active', lastLogin: '5 hours ago' },
  { id: 3, name: 'Mike Johnson', email: 'mike@educonnect.com', role: 'Regional Admin', status: 'Active', lastLogin: '1 day ago' },
];

const permissions = [
  { module: 'Schools', view: true, create: true, edit: true, delete: false },
  { module: 'Vendors', view: true, create: true, edit: true, delete: false },
  { module: 'Users', view: true, create: false, edit: true, delete: false },
  { module: 'Jobs', view: true, create: true, edit: true, delete: true },
  { module: 'Analytics', view: true, create: false, edit: false, delete: false },
  { module: 'Settings', view: false, create: false, edit: false, delete: false },
];

export function Settings() {
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-[#111827]">Settings & Access Control</h1>
          <p className="text-gray-600 mt-1">Manage platform configuration and administrative roles.</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="roles">
              <Shield className="w-4 h-4 mr-2" />
              Roles & Access
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Key className="w-4 h-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="system">
              <Database className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Roles & Access Tab */}
          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Admin Users */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Admin Users</CardTitle>
                    <Button size="sm" className="bg-[#2563EB] hover:bg-[#1e40af]">
                      Add Admin
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminRoles.map((admin) => (
                          <TableRow key={admin.id}>
                            <TableCell>
                              <div>
                                <div className="text-sm text-gray-900">{admin.name}</div>
                                <div className="text-xs text-gray-500">{admin.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                {admin.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="bg-green-50 text-green-700">
                                {admin.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Permission Matrix */}
              <Card>
                <CardHeader>
                  <CardTitle>Permission Matrix (Regional Admin)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Module</TableHead>
                        <TableHead className="text-center">View</TableHead>
                        <TableHead className="text-center">Edit</TableHead>
                        <TableHead className="text-center">Delete</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissions.map((perm) => (
                          <TableRow key={perm.module}>
                            <TableCell className="text-sm">{perm.module}</TableCell>
                            <TableCell className="text-center">
                              <Checkbox checked={perm.view} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox checked={perm.edit} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox checked={perm.delete} />
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button className="w-full mt-4 bg-[#16A34A] hover:bg-green-700" onClick={handleSaveSettings}>
                    Save Permissions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Production API Key</Label>
                    <div className="flex gap-2 mt-2">
                      <Input value="sk_live_***********************" readOnly />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                  </div>
                  <div>
                    <Label>Development API Key</Label>
                    <div className="flex gap-2 mt-2">
                      <Input value="sk_test_***********************" readOnly />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateway</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Gateway Provider</Label>
                    <Input value="Razorpay" className="mt-2" />
                  </div>
                  <div>
                    <Label>Merchant ID</Label>
                    <Input value="merchant_***********" className="mt-2" readOnly />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Test Mode</Label>
                    <Switch defaultChecked />
                  </div>
                  <Button className="w-full bg-[#2563EB] hover:bg-[#1e40af]" onClick={handleSaveSettings}>
                    Update Gateway
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>SMTP Host</Label>
                    <Input value="smtp.gmail.com" className="mt-2" />
                  </div>
                  <div>
                    <Label>SMTP Port</Label>
                    <Input value="587" className="mt-2" />
                  </div>
                  <div>
                    <Label>From Email</Label>
                    <Input value="noreply@educonnect.com" className="mt-2" />
                  </div>
                  <Button className="w-full bg-[#2563EB] hover:bg-[#1e40af]" onClick={handleSaveSettings}>
                    Save Email Config
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Storage & CDN</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Storage Provider</Label>
                    <Input value="AWS S3" className="mt-2" />
                  </div>
                  <div>
                    <Label>Bucket Name</Label>
                    <Input value="educonnect-prod" className="mt-2" />
                  </div>
                  <div>
                    <Label>CDN URL</Label>
                    <Input value="https://cdn.educonnect.com" className="mt-2" />
                  </div>
                  <Button className="w-full bg-[#2563EB] hover:bg-[#1e40af]" onClick={handleSaveSettings}>
                    Update Storage
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-500 mt-1">Temporarily disable public access</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>User Registration</Label>
                      <p className="text-sm text-gray-500 mt-1">Allow new user signups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Verification</Label>
                      <p className="text-sm text-gray-500 mt-1">Auto-verify new schools</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-gray-500 mt-1">Enable detailed logging</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Backup & Recovery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Last Backup</Label>
                    <Input value="October 29, 2025 - 03:00 AM" className="mt-2" readOnly />
                  </div>
                  <div>
                    <Label>Backup Frequency</Label>
                    <Input value="Daily at 3:00 AM" className="mt-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Backup</Label>
                      <p className="text-sm text-gray-500 mt-1">Automated daily backups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button className="w-full bg-[#16A34A] hover:bg-green-700">
                    Run Backup Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Backup History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New School Registration</Label>
                    <p className="text-sm text-gray-500 mt-1">Get notified when schools register</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Vendor Verification Requests</Label>
                    <p className="text-sm text-gray-500 mt-1">Alerts for vendor approval needed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>User Reports & Flags</Label>
                    <p className="text-sm text-gray-500 mt-1">Notify about flagged accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Alerts</Label>
                    <p className="text-sm text-gray-500 mt-1">Server and performance alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Daily Analytics Report</Label>
                    <p className="text-sm text-gray-500 mt-1">Receive daily summary via email</p>
                  </div>
                  <Switch />
                </div>
                <Button className="w-full bg-[#2563EB] hover:bg-[#1e40af]" onClick={handleSaveSettings}>
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}