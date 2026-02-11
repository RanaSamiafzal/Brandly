import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader } from '../components/Cards';
import { Input, Textarea, Select } from '../components/FormComponents';
import { InfluButton } from '../components/InfluButton';
import { Plus, X, Calendar, DollarSign, Users, Target } from 'lucide-react';
import { toast } from 'sonner';

export function CreateCampaign() {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState({
    title: '',
    category: 'technology',
    description: '',
    budget: '',
    timeline: '',
    deliverables: '',
    targetAudience: '',
    platforms: [] as string[],
    requirements: '',
  });

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCampaignData({
      ...campaignData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleSubmit = () => {
    if (!campaignData.title || !campaignData.description || !campaignData.budget) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Campaign created successfully!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'youtube', name: 'YouTube', icon: '▶️' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦' },
    { id: 'facebook', name: 'Facebook', icon: '👥' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
  ];

  return (
    <DashboardLayout
      userRole="brand"
      userName="BravoTech"
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">Create New Campaign</h2>
            <p className="text-[#6b7280]">Define your campaign requirements and find the perfect influencer</p>
          </div>
          <InfluButton variant="outline" onClick={() => navigate('/dashboard')}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </InfluButton>
        </div>

        <Card>
          <CardHeader title="Campaign Information" />
          <div className="space-y-4">
            <Input
              label="Campaign Title"
              name="title"
              value={campaignData.title}
              onChange={handleInputChange}
              placeholder="e.g., Summer Product Launch 2024"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                name="category"
                value={campaignData.category}
                onChange={handleInputChange}
                options={[
                  { value: 'technology', label: 'Technology' },
                  { value: 'fashion', label: 'Fashion' },
                  { value: 'beauty', label: 'Beauty' },
                  { value: 'fitness', label: 'Fitness' },
                  { value: 'food', label: 'Food & Beverage' },
                  { value: 'travel', label: 'Travel' },
                  { value: 'lifestyle', label: 'Lifestyle' },
                  { value: 'gaming', label: 'Gaming' },
                ]}
              />
              <Input
                label="Budget (USD)"
                name="budget"
                type="number"
                value={campaignData.budget}
                onChange={handleInputChange}
                placeholder="2500"
                required
              />
            </div>

            <Textarea
              label="Campaign Description"
              name="description"
              value={campaignData.description}
              onChange={handleInputChange}
              placeholder="Describe your campaign goals, brand message, and what you're looking for..."
              rows={4}
              required
            />

            <Input
              label="Campaign Timeline"
              name="timeline"
              value={campaignData.timeline}
              onChange={handleInputChange}
              placeholder="e.g., 2 weeks, 1 month"
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Target Platforms" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`flex items-center gap-2 p-4 border-2 rounded-lg transition-all ${
                  selectedPlatforms.includes(platform.id)
                    ? 'border-[#3b82f6] bg-[#eff6ff]'
                    : 'border-[#e5e7eb] hover:border-[#d1d5db]'
                }`}
              >
                <span className="text-2xl">{platform.icon}</span>
                <span className="font-medium text-[#111827]">{platform.name}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Campaign Requirements" />
          <div className="space-y-4">
            <Textarea
              label="Deliverables"
              name="deliverables"
              value={campaignData.deliverables}
              onChange={handleInputChange}
              placeholder="e.g., 3 Instagram posts, 1 YouTube video, 5 Stories..."
              rows={3}
            />

            <Textarea
              label="Target Audience"
              name="targetAudience"
              value={campaignData.targetAudience}
              onChange={handleInputChange}
              placeholder="Describe your ideal audience demographics, interests, and characteristics..."
              rows={3}
            />

            <Textarea
              label="Additional Requirements"
              name="requirements"
              value={campaignData.requirements}
              onChange={handleInputChange}
              placeholder="Any specific requirements, brand guidelines, or preferences..."
              rows={3}
            />
          </div>
        </Card>

        {/* Summary Card */}
        <Card>
          <CardHeader title="Campaign Summary" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg">
              <div className="bg-[#3b82f6] p-2 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Category</p>
                <p className="font-semibold text-[#111827] capitalize">
                  {campaignData.category || 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg">
              <div className="bg-[#10b981] p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Budget</p>
                <p className="font-semibold text-[#111827]">
                  {campaignData.budget ? `$${campaignData.budget}` : 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg">
              <div className="bg-[#f59e0b] p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Timeline</p>
                <p className="font-semibold text-[#111827]">
                  {campaignData.timeline || 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg">
              <div className="bg-[#8b5cf6] p-2 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Platforms</p>
                <p className="font-semibold text-[#111827]">
                  {selectedPlatforms.length || '0'} selected
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <InfluButton variant="outline" onClick={() => navigate('/dashboard')}>
            Save as Draft
          </InfluButton>
          <InfluButton variant="primary" onClick={handleSubmit}>
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </InfluButton>
        </div>
      </div>
    </DashboardLayout>
  );
}
