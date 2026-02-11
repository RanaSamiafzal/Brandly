import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader } from '../components/Cards';
import { Select } from '../components/FormComponents';
import { InfluButton } from '../components/InfluButton';
import { Download, TrendingUp, Users, DollarSign, Target, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AdminReports() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('month');

  const userGrowthData = [
    { month: 'Jan', brands: 45, influencers: 89 },
    { month: 'Feb', brands: 52, influencers: 112 },
    { month: 'Mar', brands: 61, influencers: 145 },
    { month: 'Apr', brands: 78, influencers: 178 },
    { month: 'May', brands: 95, influencers: 210 },
    { month: 'Jun', brands: 115, influencers: 256 },
  ];

  const campaignData = [
    { month: 'Jan', completed: 34, active: 12, pending: 8 },
    { month: 'Feb', completed: 41, active: 15, pending: 6 },
    { month: 'Mar', completed: 52, active: 18, pending: 10 },
    { month: 'Apr', completed: 68, active: 22, pending: 7 },
    { month: 'May', completed: 79, active: 25, pending: 9 },
    { month: 'Jun', completed: 91, active: 28, pending: 11 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15800 },
    { month: 'Mar', revenue: 18200 },
    { month: 'Apr', revenue: 22400 },
    { month: 'May', revenue: 26700 },
    { month: 'Jun', revenue: 31200 },
  ];

  const categoryDistribution = [
    { name: 'Fashion', value: 35 },
    { name: 'Technology', value: 28 },
    { name: 'Beauty', value: 18 },
    { name: 'Fitness', value: 12 },
    { name: 'Other', value: 7 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$126,800',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-[#10b981]',
    },
    {
      title: 'Total Users',
      value: '1,245',
      change: '+18.2%',
      icon: Users,
      color: 'bg-[#3b82f6]',
    },
    {
      title: 'Active Campaigns',
      value: '89',
      change: '+8.3%',
      icon: Target,
      color: 'bg-[#f59e0b]',
    },
    {
      title: 'Completion Rate',
      value: '87.5%',
      change: '+5.1%',
      icon: TrendingUp,
      color: 'bg-[#8b5cf6]',
    },
  ];

  return (
    <DashboardLayout
      userRole="admin"
      userName="Admin"
      notificationCount={5}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">Analytics & Reports</h2>
            <p className="text-[#6b7280]">Platform performance and insights</p>
          </div>
          <div className="flex gap-3">
            <Select
              label=""
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              options={[
                { value: 'week', label: 'Last Week' },
                { value: 'month', label: 'Last Month' },
                { value: 'quarter', label: 'Last Quarter' },
                { value: 'year', label: 'Last Year' },
              ]}
            />
            <InfluButton variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </InfluButton>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-[#111827] mb-1">{stat.value}</h3>
                  <p className="text-sm text-[#10b981]">{stat.change} from last period</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* User Growth Chart */}
        <Card>
          <CardHeader title="User Growth" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="brands" fill="#3b82f6" name="Brands" />
              <Bar dataKey="influencers" fill="#10b981" name="Influencers" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Status */}
          <Card>
            <CardHeader title="Campaign Status Overview" />
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#10b981" name="Completed" />
                <Line type="monotone" dataKey="active" stroke="#3b82f6" name="Active" />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" name="Pending" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader title="Category Distribution" />
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Revenue Trends */}
        <Card>
          <CardHeader title="Revenue Trends" />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity Table */}
        <Card>
          <CardHeader title="Recent Platform Activity" />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Event</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    date: '2024-02-10',
                    event: 'Campaign Completed',
                    user: 'BravoTech',
                    category: 'Technology',
                    value: '$2,500',
                  },
                  {
                    date: '2024-02-10',
                    event: 'New User Signup',
                    user: 'Emma Davis',
                    category: 'Fashion',
                    value: '-',
                  },
                  {
                    date: '2024-02-09',
                    event: 'Campaign Started',
                    user: 'FashionHub',
                    category: 'Fashion',
                    value: '$1,800',
                  },
                  {
                    date: '2024-02-09',
                    event: 'Verification Approved',
                    user: 'Mike Chen',
                    category: 'Fitness',
                    value: '-',
                  },
                  {
                    date: '2024-02-08',
                    event: 'Campaign Completed',
                    user: 'TechCorp',
                    category: 'Technology',
                    value: '$3,200',
                  },
                ].map((activity, index) => (
                  <tr key={index} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                    <td className="py-3 px-4 text-[#6b7280]">{activity.date}</td>
                    <td className="py-3 px-4 text-[#111827]">{activity.event}</td>
                    <td className="py-3 px-4 text-[#111827]">{activity.user}</td>
                    <td className="py-3 px-4 text-[#6b7280]">{activity.category}</td>
                    <td className="py-3 px-4 font-medium text-[#111827]">{activity.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
