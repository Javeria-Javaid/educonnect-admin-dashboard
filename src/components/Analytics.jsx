import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';

const admissionsWeekly = [
  { week: 'Week 1', opened: 45, closed: 32 },
  { week: 'Week 2', opened: 52, closed: 38 },
  { week: 'Week 3', opened: 48, closed: 41 },
  { week: 'Week 4', opened: 61, closed: 45 },
  { week: 'Week 5', opened: 58, closed: 52 },
  { week: 'Week 6', opened: 67, closed: 48 },
];

const jobsByRegion = [
  { region: 'North Delhi', jobs: 245, applications: 1230 },
  { region: 'South Delhi', jobs: 198, applications: 980 },
  { region: 'East Delhi', jobs: 312, applications: 1560 },
  { region: 'West Delhi', jobs: 267, applications: 1340 },
  { region: 'Central Delhi', jobs: 289, applications: 1445 },
  { region: 'NCR', jobs: 421, applications: 2105 },
];

const engagementData = [
  { month: 'Jan', schools: 120, vendors: 85, users: 2340 },
  { month: 'Feb', schools: 145, vendors: 102, users: 3120 },
  { month: 'Mar', schools: 178, vendors: 125, users: 4250 },
  { month: 'Apr', schools: 201, vendors: 145, users: 5380 },
  { month: 'May', schools: 234, vendors: 167, users: 6520 },
  { month: 'Jun', schools: 267, vendors: 189, users: 7840 },
];

const schoolLeaderboard = [
  { rank: 1, school: 'Springfield Academy', admissions: 245, engagement: 98 },
  { rank: 2, school: 'Green Valley School', admissions: 234, engagement: 96 },
  { rank: 3, school: 'Cedar Grove Institute', admissions: 221, engagement: 94 },
  { rank: 4, school: 'Sunset International', admissions: 198, engagement: 91 },
  { rank: 5, school: 'Blue Ridge School', admissions: 187, engagement: 88 },
];

export function Analytics() {
  const handleExport = (format) => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`);
  };

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#111827]">Analytics & Reports</h1>
            <p className="text-gray-600 mt-1">Visualize ecosystem engagement and performance metrics.</p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => handleExport('csv')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => handleExport('pdf')} className="bg-[#16A34A] hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Admissions Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Admissions Opened vs Closed (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={admissionsWeekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="week" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="opened" fill="#2563EB" name="Opened" />
                <Bar dataKey="closed" fill="#16A34A" name="Closed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Postings by Region */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Postings by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobsByRegion} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" stroke="#6B7280" />
                  <YAxis dataKey="region" type="category" stroke="#6B7280" width={100} />
                  <Tooltip />
                  <Bar dataKey="jobs" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobsByRegion} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" stroke="#6B7280" />
                  <YAxis dataKey="region" type="category" stroke="#6B7280" width={100} />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#16A34A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Ecosystem Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Ecosystem Growth Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="schools" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
                <Area type="monotone" dataKey="vendors" stackId="1" stroke="#9333EA" fill="#9333EA" fillOpacity={0.6} />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#16A34A" fill="#16A34A" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* School Engagement Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>School Engagement Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {schoolLeaderboard.map((school) => (
                  <div key={school.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          school.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                              school.rank === 2 ? 'bg-gray-200 text-gray-700' :
                                  school.rank === 3 ? 'bg-orange-100 text-orange-700' :
                                      'bg-blue-50 text-blue-700'
                      }`}>
                        {school.rank}
                      </div>
                      <div>
                        <div className="text-gray-900">{school.school}</div>
                        <div className="text-sm text-gray-500">{school.admissions} admissions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Engagement Score</div>
                        <div className="text-gray-900">{school.engagement}%</div>
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#16A34A]"
                            style={{ width: `${school.engagement}%` }}
                        />
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}