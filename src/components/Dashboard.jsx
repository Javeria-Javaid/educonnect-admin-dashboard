import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { School, Store, Users, Briefcase, TrendingUp, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const kpiData = [
  { title: 'Total Schools', value: '1,247', icon: School, trend: '+12%', color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  { title: 'Active Admissions', value: '856', icon: TrendingUp, trend: '+8%', color: 'text-[#16A34A]', bg: 'bg-green-50' },
  { title: 'Verified Vendors', value: '432', icon: Store, trend: '+15%', color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Job Posts', value: '2,341', icon: Briefcase, trend: '+23%', color: 'text-orange-600', bg: 'bg-orange-50' },
];

const admissionsData = [
  { month: 'Jan', admissions: 65 },
  { month: 'Feb', admissions: 78 },
  { month: 'Mar', admissions: 92 },
  { month: 'Apr', admissions: 88 },
  { month: 'May', admissions: 105 },
  { month: 'Jun', admissions: 125 },
];

const jobsByRegion = [
  { region: 'North', jobs: 450 },
  { region: 'South', jobs: 380 },
  { region: 'East', jobs: 520 },
  { region: 'West', jobs: 410 },
  { region: 'Central', jobs: 581 },
];

const userDistribution = [
  { name: 'Students', value: 12450, color: '#2563EB' },
  { name: 'Parents', value: 8920, color: '#9333EA' },
  { name: 'Teachers', value: 3450, color: '#16A34A' },
];

const recentActivities = [
  { id: 1, type: 'school', message: 'Springfield Academy updated admission status', time: '5 min ago' },
  { id: 2, type: 'vendor', message: 'ABC Uniforms added 12 new items', time: '15 min ago' },
  { id: 3, type: 'user', message: 'New teacher registration from Delhi', time: '1 hour ago' },
  { id: 4, type: 'job', message: 'Mathematics Teacher position posted', time: '2 hours ago' },
  { id: 5, type: 'school', message: 'Green Valley School verified', time: '3 hours ago' },
];

const pendingApprovals = [
  { id: 1, type: 'School Registration', count: 8, priority: 'high' },
  { id: 2, type: 'Vendor Verification', count: 5, priority: 'medium' },
  { id: 3, type: 'Reported Issues', count: 3, priority: 'high' },
  { id: 4, type: 'Content Review', count: 12, priority: 'low' },
];

export function Dashboard() {
  return (
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-[#111827]">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with EduConnect today.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi) => (
              <Card key={kpi.title}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{kpi.title}</p>
                      <p className="text-[#111827] mt-2">{kpi.value}</p>
                      <Badge variant="secondary" className="mt-2 bg-green-50 text-green-700 hover:bg-green-50">
                        {kpi.trend}
                      </Badge>
                    </div>
                    <div className={`${kpi.bg} p-3 rounded-lg`}>
                      <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Admissions Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Admissions Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={admissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="admissions" stroke="#2563EB" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Job Postings by Region */}
          <Card>
            <CardHeader>
              <CardTitle>Job Postings by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={jobsByRegion}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="region" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Bar dataKey="jobs" fill="#16A34A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Active User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                      data={userDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                  >
                    {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertCircle className={`w-4 h-4 ${item.priority === 'high' ? 'text-red-600' : item.priority === 'medium' ? 'text-orange-600' : 'text-gray-600'}`} />
                        <div>
                          <p className="text-sm text-gray-900">{item.type}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {item.count} pending
                          </Badge>
                        </div>
                      </div>
                      <button className="text-[#2563EB] text-sm hover:underline">
                        View
                      </button>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}