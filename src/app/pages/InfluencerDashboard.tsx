import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader, InfluencerCard } from '../components/Cards';
import { InfluButton } from '../components/InfluButton';
import { StatusBadge } from '../components/StatusBadge';
import { Users, TrendingUp, DollarSign, Target, Calendar, Clock, ExternalLink } from 'lucide-react';

export function InfluencerDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Active Campaigns', value: '5', icon: Target, color: 'bg-[#3b82f6]' },
    { title: 'Total Earnings', value: '$12,450', icon: DollarSign, color: 'bg-[#10b981]' },
    { title: 'Pending Requests', value: '8', icon: Clock, color: 'bg-[#f59e0b]' },
    { title: 'Completed', value: '23', icon: TrendingUp, color: 'bg-[#8b5cf6]' },
  ];

  const activeCampaigns = [
    {
      id: '1',
      brand: 'BravoTech',
      title: 'Summer Product Launch',
      category: 'Technology',
      deadline: '2024-03-15',
      payment: '$2,500',
      status: 'in-progress' as const,
      progress: 65,
    },
    {
      id: '2',
      brand: 'FashionHub',
      title: 'Spring Collection 2024',
      category: 'Fashion',
      deadline: '2024-03-20',
      payment: '$1,800',
      status: 'in-progress' as const,
      progress: 40,
    },
    {
      id: '3',
      brand: 'FitLife',
      title: 'Fitness Challenge Campaign',
      category: 'Fitness',
      deadline: '2024-03-25',
      payment: '$1,500',
      status: 'in-progress' as const,
      progress: 80,
    },
  ];

  const pendingRequests = [
    {
      id: '1',
      brand: 'TechCorp',
      title: 'AI Product Review',
      category: 'Technology',
      payment: '$3,000',
      date: '2024-02-08',
    },
    {
      id: '2',
      brand: 'BeautyBrand',
      title: 'Skincare Routine Video',
      category: 'Beauty',
      payment: '$2,200',
      date: '2024-02-09',
    },
    {
      id: '3',
      brand: 'TravelCo',
      title: 'Destination Review',
      category: 'Travel',
      payment: '$4,500',
      date: '2024-02-10',
    },
  ];

  const recentEarnings = [
    { campaign: 'Winter Fashion Campaign', brand: 'StyleHub', amount: '$2,800', date: '2024-02-05' },
    { campaign: 'Tech Review Series', brand: 'GadgetWorld', amount: '$3,200', date: '2024-01-28' },
    { campaign: 'Fitness Product Launch', brand: 'FitLife', amount: '$1,900', date: '2024-01-15' },
  ];

  return (
    <DashboardLayout
      userRole="influencer"
      userName="Sarah Johnson"
      notificationCount={8}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Welcome back, Sarah! 👋</h2>
          <p className="text-[#6b7280]">Here's what's happening with your collaborations today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-[#111827]">{stat.value}</h3>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Active Campaigns */}
        <Card>
          <CardHeader 
            title="Active Campaigns" 
            action={
              <InfluButton variant="outline" size="sm" onClick={() => navigate('/requests')}>
                View All
              </InfluButton>
            }
          />
          <div className="space-y-4">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="border border-[#e5e7eb] rounded-lg p-4 hover:border-[#3b82f6] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#111827]">{campaign.title}</h3>
                      <StatusBadge status="accepted" />
                    </div>
                    <p className="text-sm text-[#6b7280] mb-2">{campaign.brand} • {campaign.category}</p>
                    <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Due: {campaign.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {campaign.payment}
                      </span>
                    </div>
                  </div>
                  <InfluButton variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </InfluButton>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-[#6b7280]">Progress</span>
                    <span className="font-medium text-[#111827]">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                    <div
                      className="bg-[#3b82f6] h-2 rounded-full transition-all"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <Card>
            <CardHeader 
              title="Pending Requests" 
              action={
                <InfluButton variant="outline" size="sm" onClick={() => navigate('/requests')}>
                  View All
                </InfluButton>
              }
            />
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border border-[#e5e7eb] rounded-lg p-4 hover:border-[#3b82f6] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-[#111827] mb-1">{request.title}</h4>
                      <p className="text-sm text-[#6b7280]">{request.brand}</p>
                    </div>
                    <StatusBadge status="pending" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6b7280]">{request.category}</span>
                    <span className="font-medium text-[#10b981]">{request.payment}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <InfluButton variant="primary" size="sm" className="flex-1">
                      Accept
                    </InfluButton>
                    <InfluButton variant="outline" size="sm" className="flex-1">
                      Decline
                    </InfluButton>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Earnings */}
          <Card>
            <CardHeader title="Recent Earnings" />
            <div className="space-y-3">
              {recentEarnings.map((earning, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-[#f3f4f6] last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-[#111827] mb-1">{earning.campaign}</p>
                    <p className="text-sm text-[#6b7280]">{earning.brand} • {earning.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#10b981]">{earning.amount}</p>
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-[#e5e7eb]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#111827]">Total This Month</span>
                  <span className="font-bold text-[#10b981] text-lg">$7,900</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card>
          <CardHeader title="Performance Overview" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#eff6ff] rounded-lg">
              <div className="text-3xl font-bold text-[#3b82f6] mb-1">4.8</div>
              <div className="text-sm text-[#6b7280]">Average Rating</div>
            </div>
            <div className="text-center p-4 bg-[#f0fdf4] rounded-lg">
              <div className="text-3xl font-bold text-[#10b981] mb-1">96%</div>
              <div className="text-sm text-[#6b7280]">Completion Rate</div>
            </div>
            <div className="text-center p-4 bg-[#fef3c7] rounded-lg">
              <div className="text-3xl font-bold text-[#f59e0b] mb-1">3.2 days</div>
              <div className="text-sm text-[#6b7280]">Avg Response Time</div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
