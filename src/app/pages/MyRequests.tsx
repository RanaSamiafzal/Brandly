import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, RequestCard } from '../components/Cards';
import { BadgeStatus } from '../components/StatusBadge';

export function MyRequests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const mockRequests = [
    {
      influencerName: 'MayaFitness',
      influencerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      campaignTitle: 'Summer Fitness Challenge',
      budget: '$750 - $1250',
      timeline: '2 weeks',
      status: 'pending' as BadgeStatus,
    },
    {
      influencerName: 'TechGuruMike',
      influencerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      campaignTitle: 'Product Launch Campaign',
      budget: '$1500 - $2000',
      timeline: '1 month',
      status: 'accepted' as BadgeStatus,
    },
    {
      influencerName: 'EllaStyle',
      influencerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      campaignTitle: 'Brand Awareness',
      budget: '$800 - $1200',
      timeline: '3 weeks',
      status: 'rejected' as BadgeStatus,
    },
    {
      influencerName: 'JohnTravel',
      influencerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      campaignTitle: 'Travel Destination Promo',
      budget: '$1000 - $1500',
      timeline: '2 weeks',
      status: 'accepted' as BadgeStatus,
    },
  ];

  const filteredRequests =
    activeTab === 'all'
      ? mockRequests
      : mockRequests.filter((req) => req.status === activeTab);

  const tabs = [
    { id: 'all', label: 'All', count: mockRequests.length },
    { id: 'pending', label: 'Pending', count: mockRequests.filter((r) => r.status === 'pending').length },
    { id: 'accepted', label: 'Accepted', count: mockRequests.filter((r) => r.status === 'accepted').length },
    { id: 'rejected', label: 'Rejected', count: mockRequests.filter((r) => r.status === 'rejected').length },
  ];

  return (
    <DashboardLayout
      userRole="brand"
      userName="BravoTech"
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827] mb-2">My Requests</h2>
          <p className="text-[#6b7280]">Manage and track all your collaboration requests.</p>
        </div>

        {/* Tabs */}
        <Card>
          <div className="flex gap-2 border-b border-[#e5e7eb]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#3b82f6]'
                    : 'text-[#6b7280] hover:text-[#111827]'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-0.5 bg-[#f3f4f6] rounded-full text-xs">
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]"></div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <p className="text-[#6b7280]">No requests found.</p>
              </div>
            </Card>
          ) : (
            filteredRequests.map((request, index) => (
              <RequestCard
                key={index}
                {...request}
                onViewDetails={() => console.log('View details:', request.influencerName)}
              />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
