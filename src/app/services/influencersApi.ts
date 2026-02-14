import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { influencersData, type Influencer } from '../data/influencers';

interface InfluencerQueryParams {
  category: string;
  platform: string;
  followers: string;
}

function matchesFollowersRange(followers: string, selectedRange: string) {
  if (!selectedRange) return true;

  const numericFollowers = Number.parseInt(followers, 10);

  if (selectedRange === '10k-50k') {
    return numericFollowers >= 10 && numericFollowers <= 50;
  }

  if (selectedRange === '50k-100k') {
    return numericFollowers >= 50 && numericFollowers <= 100;
  }

  if (selectedRange === '100k+') {
    return numericFollowers >= 100;
  }

  return true;
}

export const influencersApi = createApi({
  reducerPath: 'influencersApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getInfluencers: builder.query<Influencer[], InfluencerQueryParams>({
      queryFn: async ({ category, platform, followers }) => {
        await new Promise((resolve) => setTimeout(resolve, 250));

        const filtered = influencersData.filter((influencer) => {
          const matchesCategory = !category || influencer.category.toLowerCase() === category.toLowerCase();
          const matchesPlatform = !platform || influencer.platform.toLowerCase() === platform.toLowerCase();
          const matchesFollowers = matchesFollowersRange(influencer.followers, followers);

          return matchesCategory && matchesPlatform && matchesFollowers;
        });

        return { data: filtered };
      },
    }),
  }),
});

export const { useGetInfluencersQuery } = influencersApi;
