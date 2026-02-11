import React from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader, ProfileCard } from '../components/Cards';
import { InfluButton } from '../components/InfluButton';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';

export function BrandDashboard() {
  const navigate = useNavigate();

  const mockInfluencers = [
    {
      name: 'Sara_Lifestyle',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      platform: 'Instagram' as const,
      followers: '50k',
      category: 'Lifestyle',
      verified: true,
    },
    {
      name: 'DanTechGeek',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      platform: 'Youtube' as const,
      followers: '120k',
      category: 'Technology',
      verified: true,
    },
    {
      name: 'FitWithMaya',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      platform: 'Instagram' as const,
      followers: '75k',
      category: 'Fitness',
      verified: true,
    },
  ];

  const stats = [
    {
      icon: FileText,
      label: 'Total Requests',
      value: '24',
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[#eff6ff]',
    },
    {
      icon: CheckCircle,
      label: 'Active Campaigns',
      value: '8',
      color: 'text-[#10b981]',
      bgColor: 'bg-[#d1fae5]',
    },
    {
      icon: Clock,
      label: 'Pending Approvals',
      value: '3',
      color: 'text-[#f59e0b]',
      bgColor: 'bg-[#fef3c7]',
    },
    {
      icon: Users,
      label: 'Influencers Found',
      value: '156',
      color: 'text-[#6b7280]',
      bgColor: 'bg-[#f3f4f6]',
    },
  ];

  return (
    <DashboardLayout
      userRole="brand"
      userName="BravoTech"
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Welcome, BravoTech!</h2>
          <p className="text-[#6b7280]">Here's what's happening with your campaigns today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-[#6b7280]">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recommended Influencers */}
        <Card>
          <CardHeader
            title="Recommended Influencers"
            action={
              <InfluButton variant="outline" size="sm" onClick={() => navigate('/search')}>
                View All
              </InfluButton>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockInfluencers.map((influencer) => (
              <ProfileCard
                key={influencer.name}
                {...influencer}
                onViewProfile={() => console.log('View profile:', influencer.name)}
              />
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader title="Recent Activity" />
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-[#e5e7eb]">
              <div className="w-2 h-2 bg-[#10b981] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-[#111827]">
                  <span className="font-semibold">EllaStyle</span> accepted your collaboration request
                </p>
                <p className="text-xs text-[#6b7280]">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-[#e5e7eb]">
              <div className="w-2 h-2 bg-[#3b82f6] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-[#111827]">
                  New influencer match found for your campaign
                </p>
                <p className="text-xs text-[#6b7280]">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-[#f59e0b] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-[#111827]">
                  <span className="font-semibold">TechGuruMike</span> is reviewing your request
                </p>
                <p className="text-xs text-[#6b7280]">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
