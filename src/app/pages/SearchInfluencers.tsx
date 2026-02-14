import React from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, ProfileCard } from '../components/Cards';
import { Select } from '../components/FormComponents';
import { Search } from 'lucide-react';
import { setCategory, setFollowers, setPlatform } from '../features/searchFiltersSlice';
import { useGetInfluencersQuery } from '../services/influencersApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function SearchInfluencers() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.searchFilters);

  const { data: influencers = [], isFetching } = useGetInfluencersQuery(filters);

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
                { value: 'health', label: 'Health' },
              ]}
              value={filters.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
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
              onChange={(e) => dispatch(setPlatform(e.target.value))}
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
              onChange={(e) => dispatch(setFollowers(e.target.value))}
            />
            <div className="flex items-end mb-4">
              <button className="w-full px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                {isFetching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </Card>

        <div>
          <h3 className="text-lg font-semibold text-[#111827] mb-4">Found {influencers.length} Influencers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {influencers.map((influencer) => (
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
