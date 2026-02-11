import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader } from '../components/Cards';
import { InfluButton } from '../components/InfluButton';
import { StatusBadge } from '../components/StatusBadge';

export function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'users' | 'reports' | 'settings'>('users');

  const pendingVerifications = [
    {
      name: 'EcoBeauty Co',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      type: 'Brand',
      industry: 'Beauty',
      email: 'contact@ecobeauty.com',
    },
    {
      name: 'BravoTech',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      type: 'Brand',
      industry: 'Technology',
      email: 'info@bravotech.com',
    },
    {
      name: 'FakeFashion123',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      type: 'Influencer',
      industry: 'Fashion',
      email: 'fake@fashion.com',
    },
  ];

  const stats = [
    { label: 'Total Users', value: '1,234' },
    { label: 'Pending Verifications', value: '23' },
    { label: 'Active Campaigns', value: '156' },
    { label: 'Reported Accounts', value: '8' },
  ];

  const handleVerify = (name: string) => {
    console.log('Verify:', name);
  };

  const handleReject = (name: string) => {
    console.log('Reject:', name);
  };

  return (
    <DashboardLayout
      userRole="admin"
      userName="Admin"
      notificationCount={5}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Admin Panel</h2>
          <p className="text-[#6b7280]">Manage users, verifications, and platform settings.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#111827] mb-1">{stat.value}</p>
                <p className="text-sm text-[#6b7280]">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Card>
          <div className="flex gap-2 border-b border-[#e5e7eb]">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'users'
                  ? 'text-[#3b82f6]'
                  : 'text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              Users
              {activeTab === 'users' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'reports'
                  ? 'text-[#3b82f6]'
                  : 'text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              Reports
              {activeTab === 'reports' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'settings'
                  ? 'text-[#3b82f6]'
                  : 'text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              Settings
              {activeTab === 'settings' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]"></div>
              )}
            </button>
          </div>
        </Card>

        {/* Pending Brand Verifications */}
        {activeTab === 'users' && (
          <Card>
            <CardHeader title="Pending Brand Verifications" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e5e7eb]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b7280]">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b7280]">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b7280]">Industry</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b7280]">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-[#6b7280]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingVerifications.map((user, index) => (
                    <tr key={index} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-[#111827]">{user.name}</p>
                            <p className="text-sm text-[#6b7280]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#6b7280]">{user.type}</td>
                      <td className="py-4 px-4 text-[#6b7280]">{user.industry}</td>
                      <td className="py-4 px-4">
                        <StatusBadge status="pending" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <InfluButton
                            variant="success"
                            size="sm"
                            onClick={() => handleVerify(user.name)}
                          >
                            Verify
                          </InfluButton>
                          <InfluButton
                            variant="danger"
                            size="sm"
                            onClick={() => handleReject(user.name)}
                          >
                            Reject
                          </InfluButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'reports' && (
          <Card>
            <CardHeader title="Reported Accounts" />
            <div className="text-center py-12">
              <p className="text-[#6b7280]">No reports to review at this time.</p>
            </div>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card>
            <CardHeader title="Platform Settings" />
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#e5e7eb]">
                <div>
                  <p className="font-medium text-[#111827]">Email Notifications</p>
                  <p className="text-sm text-[#6b7280]">Send system notifications to users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#e5e7eb]">
                <div>
                  <p className="font-medium text-[#111827]">Auto-Verify Influencers</p>
                  <p className="text-sm text-[#6b7280]">Automatically verify influencers with verified badges on social platforms</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
                </label>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
