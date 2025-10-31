import { School, Store, Users, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const kpiData = [
    {
      title: 'Total Schools',
      value: '1,284',
      change: '+12.5%',
      trend: 'up',
      icon: School,
      color: '#2563EB',
    },
    {
      title: 'Active Vendors',
      value: '456',
      change: '+8.2%',
      trend: 'up',
      icon: Store,
      color: '#16A34A',
    },
    {
      title: 'Total Users',
      value: '28,492',
      change: '+23.1%',
      trend: 'up',
      icon: Users,
      color: '#9333EA',
    },
    {
      title: 'Revenue',
      value: '$1.2M',
      change: '-3.2%',
      trend: 'down',
      icon: TrendingUp,
      color: '#EA580C',
    },
  ];

  const monthlyData = [
    { month: 'Jan', schools: 65, vendors: 28, users: 2400 },
    { month: 'Feb', schools: 72, vendors: 32, users: 2800 },
    { month: 'Mar', schools: 85, vendors: 38, users: 3200 },
    { month: 'Apr', schools: 91, vendors: 42, users: 3600 },
    { month: 'May', schools: 103, vendors: 48, users: 4100 },
    { month: 'Jun', schools: 118, vendors: 54, users: 4600 },
  ];

  const categoryData = [
    { name: 'Books & Stationery', value: 145 },
    { name: 'Technology', value: 98 },
    { name: 'Food Services', value: 76 },
    { name: 'Transportation', value: 64 },
    { name: 'Uniforms', value: 73 },
  ];

  const recentActivities = [
    { id: 1, type: 'school', action: 'New school registered', name: 'Springfield High School', time: '10 minutes ago' },
    { id: 2, type: 'vendor', action: 'Vendor approved', name: 'TechBooks Inc', time: '25 minutes ago' },
    { id: 3, type: 'user', action: 'User role updated', name: 'John Doe', time: '1 hour ago' },
    { id: 4, type: 'school', action: 'School verification completed', name: 'Riverside Academy', time: '2 hours ago' },
    { id: 5, type: 'vendor', action: 'New vendor pending', name: 'Smart Uniforms Ltd', time: '3 hours ago' },
  ];

  const COLORS = ['#2563EB', '#16A34A', '#9333EA', '#EA580C', '#EAB308'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with EduConnect today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{kpi.title}</p>
                    <h2 className="mt-2">{kpi.value}</h2>
                    <div className="flex items-center gap-1 mt-2">
                      {kpi.trend === 'up' ? (
                        <ArrowUp size={16} className="text-[#16A34A]" />
                      ) : (
                        <ArrowDown size={16} className="text-red-500" />
                      )}
                      <span className={`text-sm ${kpi.trend === 'up' ? 'text-[#16A34A]' : 'text-red-500'}`}>
                        {kpi.change}
                      </span>
                      <span className="text-sm text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${kpi.color}20` }}
                  >
                    <Icon size={24} style={{ color: kpi.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="schools" stroke="#2563EB" strokeWidth={2} />
                <Line type="monotone" dataKey="vendors" stroke="#16A34A" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Registrations Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly User Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#9333EA" />
            </BarChart>
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
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'school' ? 'bg-blue-100 text-[#2563EB]' :
                  activity.type === 'vendor' ? 'bg-green-100 text-[#16A34A]' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'school' ? <School size={20} /> :
                   activity.type === 'vendor' ? <Store size={20} /> :
                   <Users size={20} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-gray-600">{activity.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
