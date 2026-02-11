import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Cards';
import { Input, Select } from '../components/FormComponents';
import { InfluButton } from '../components/InfluButton';
import { StatusBadge } from '../components/StatusBadge';
import { Search, UserPlus, MoreVertical, Ban, CheckCircle, Trash2, Mail } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'brand' | 'influencer';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
  campaigns?: number;
  followers?: number;
}

export function AdminUsers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const users: User[] = [
    {
      id: '1',
      name: 'BravoTech',
      email: 'contact@bravotech.com',
      role: 'brand',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      campaigns: 8,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      role: 'influencer',
      status: 'active',
      joinDate: '2024-02-10',
      lastActive: '1 day ago',
      followers: 125000,
    },
    {
      id: '3',
      name: 'TechCorp',
      email: 'hello@techcorp.com',
      role: 'brand',
      status: 'pending',
      joinDate: '2024-02-08',
      lastActive: '3 hours ago',
      campaigns: 0,
    },
    {
      id: '4',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      role: 'influencer',
      status: 'active',
      joinDate: '2024-01-20',
      lastActive: '5 hours ago',
      followers: 89000,
    },
    {
      id: '5',
      name: 'FashionHub',
      email: 'team@fashionhub.com',
      role: 'brand',
      status: 'suspended',
      joinDate: '2023-12-05',
      lastActive: '2 weeks ago',
      campaigns: 3,
    },
    {
      id: '6',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      role: 'influencer',
      status: 'pending',
      joinDate: '2024-02-09',
      lastActive: '1 hour ago',
      followers: 45000,
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSuspendUser = (userId: string) => {
    console.log('Suspending user:', userId);
    setActiveMenu(null);
  };

  const handleActivateUser = (userId: string) => {
    console.log('Activating user:', userId);
    setActiveMenu(null);
  };

  const handleDeleteUser = (userId: string) => {
    console.log('Deleting user:', userId);
    setActiveMenu(null);
  };

  const handleSendEmail = (userId: string) => {
    console.log('Sending email to user:', userId);
    setActiveMenu(null);
  };

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
            <h2 className="text-2xl font-bold text-[#111827]">User Management</h2>
            <p className="text-[#6b7280]">Manage all users on the platform</p>
          </div>
          <InfluButton variant="primary">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </InfluButton>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              />
            </div>
            <Select
              label=""
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'brand', label: 'Brands' },
                { value: 'influencer', label: 'Influencers' },
              ]}
            />
            <Select
              label=""
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'pending', label: 'Pending' },
                { value: 'suspended', label: 'Suspended' },
              ]}
            />
          </div>
        </Card>

        {/* Users Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Stats</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Join Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Last Active</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#111827]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-[#111827]">{user.name}</div>
                        <div className="text-sm text-[#6b7280]">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-[#111827]">{user.role}</span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge
                        status={
                          user.status === 'active'
                            ? 'accepted'
                            : user.status === 'pending'
                            ? 'pending'
                            : 'rejected'
                        }
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-[#6b7280]">
                        {user.role === 'brand'
                          ? `${user.campaigns} campaigns`
                          : `${(user.followers || 0).toLocaleString()} followers`}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#6b7280]">{user.joinDate}</td>
                    <td className="py-3 px-4 text-[#6b7280]">{user.lastActive}</td>
                    <td className="py-3 px-4">
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                          className="p-1 hover:bg-[#f3f4f6] rounded"
                        >
                          <MoreVertical className="w-5 h-5 text-[#6b7280]" />
                        </button>
                        {activeMenu === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#e5e7eb] z-10">
                            <button
                              onClick={() => handleSendEmail(user.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#111827] hover:bg-[#f3f4f6]"
                            >
                              <Mail className="w-4 h-4" />
                              Send Email
                            </button>
                            {user.status === 'suspended' ? (
                              <button
                                onClick={() => handleActivateUser(user.id)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#10b981] hover:bg-[#f3f4f6]"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Activate User
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSuspendUser(user.id)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#f59e0b] hover:bg-[#f3f4f6]"
                              >
                                <Ban className="w-4 h-4" />
                                Suspend User
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#ef4444] hover:bg-[#f3f4f6]"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete User
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
            <p className="text-sm text-[#6b7280]">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex gap-2">
              <InfluButton variant="outline" size="sm">
                Previous
              </InfluButton>
              <InfluButton variant="outline" size="sm">
                Next
              </InfluButton>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
