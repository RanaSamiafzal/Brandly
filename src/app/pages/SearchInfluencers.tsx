import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, ProfileCard } from '../components/Cards';
import { Select } from '../components/FormComponents';
import { Search } from 'lucide-react';

export function SearchInfluencers() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: '',
    platform: '',
    followers: '',
  });

  const mockInfluencers = [
    {
      name: 'HealthMika',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      platform: 'Instagram' as const,
      followers: '50k',
      category: 'Health',
      verified: true,
    },
    {
      name: 'MikeTechGuru',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      platform: 'Youtube' as const,
      followers: '120k',
      category: 'Technology',
      verified: true,
    },
    {
      name: 'TravelWithEmma',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      platform: 'Instagram' as const,
      followers: '85k',
      category: 'Travel',
      verified: true,
    },
    {
      name: 'JamieFoodie',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      platform: 'Instagram' as const,
      followers: '65k',
      category: 'Food',
      verified: false,
    },
    {
      name: 'GlamWithSeeha',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
      platform: 'Instagram' as const,
      followers: '95k',
      category: 'Beauty',
      verified: true,
    },
    {
      name: 'FitnessJake',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
      platform: 'Youtube' as const,
      followers: '140k',
      category: 'Fitness',
      verified: true,
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
        <div>
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Find the Perfect Influencers for Your Brand</h2>
          <p className="text-[#6b7280]">Search and connect with top influencers to boost your campaigns.</p>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Category"
              options={[
                { value: '', label: 'All Categories' },
                { value: 'lifestyle', label: 'Lifestyle' },
                { value: 'technology', label: 'Technology' },
                { value: 'fitness', label: 'Fitness' },
                { value: 'beauty', label: 'Beauty' },
                { value: 'travel', label: 'Travel' },
                { value: 'food', label: 'Food' },
              ]}
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            />
            <Select
              label="Platform"
              options={[
                { value: '', label: 'All Platforms' },
                { value: 'instagram', label: 'Instagram' },
                { value: 'youtube', label: 'YouTube' },
                { value: 'twitter', label: 'Twitter' },
                { value: 'tiktok', label: 'TikTok' },
              ]}
              value={filters.platform}
              onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
            />
            <Select
              label="Followers"
              options={[
                { value: '', label: 'Any' },
                { value: '10k-50k', label: '10k - 50k' },
                { value: '50k-100k', label: '50k - 100k' },
                { value: '100k+', label: '100k+' },
              ]}
              value={filters.followers}
              onChange={(e) => setFilters({ ...filters, followers: e.target.value })}
            />
            <div className="flex items-end mb-4">
              <button className="w-full px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div>
          <h3 className="text-lg font-semibold text-[#111827] mb-4">
            Found {mockInfluencers.length} Influencers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockInfluencers.map((influencer) => (
              <ProfileCard
                key={influencer.name}
                {...influencer}
                onViewProfile={() => console.log('View profile:', influencer.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
