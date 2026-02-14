export type Platform = 'Instagram' | 'Youtube' | 'Twitter' | 'TikTok';

export interface Influencer {
  name: string;
  image: string;
  platform: Platform;
  followers: string;
  category: string;
  verified: boolean;
}

export const influencersData: Influencer[] = [
  {
    name: 'HealthMika',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    platform: 'Instagram',
    followers: '50k',
    category: 'Health',
    verified: true,
  },
  {
    name: 'MikeTechGuru',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    platform: 'Youtube',
    followers: '120k',
    category: 'Technology',
    verified: true,
  },
  {
    name: 'TravelWithEmma',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    platform: 'Instagram',
    followers: '85k',
    category: 'Travel',
    verified: true,
  },
  {
    name: 'JamieFoodie',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    platform: 'Instagram',
    followers: '65k',
    category: 'Food',
    verified: false,
  },
  {
    name: 'GlamWithSeeha',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    platform: 'Instagram',
    followers: '95k',
    category: 'Beauty',
    verified: true,
  },
  {
    name: 'FitnessJake',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    platform: 'Youtube',
    followers: '140k',
    category: 'Fitness',
    verified: true,
  },
];
