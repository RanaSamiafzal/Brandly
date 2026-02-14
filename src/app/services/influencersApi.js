import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { influencersData } from "../data/influencers";
function matchesFollowersRange(followers, selectedRange) {
  if (!selectedRange) return true;
  const numericFollowers = Number.parseInt(followers, 10);
  if (selectedRange === "10k-50k") {
    return numericFollowers >= 10 && numericFollowers <= 50;
  }
  if (selectedRange === "50k-100k") {
    return numericFollowers >= 50 && numericFollowers <= 100;
  }
  if (selectedRange === "100k+") {
    return numericFollowers >= 100;
  }
  return true;
}
const influencersApi = createApi({
  reducerPath: "influencersApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getInfluencers: builder.query({
      queryFn: async ({ category, platform, followers }) => {
        await new Promise((resolve) => setTimeout(resolve, 250));
        const filtered = influencersData.filter((influencer) => {
          const matchesCategory = !category || influencer.category.toLowerCase() === category.toLowerCase();
          const matchesPlatform = !platform || influencer.platform.toLowerCase() === platform.toLowerCase();
          const matchesFollowers = matchesFollowersRange(influencer.followers, followers);
          return matchesCategory && matchesPlatform && matchesFollowers;
        });
        return { data: filtered };
      }
    })
  })
});
const { useGetInfluencersQuery } = influencersApi;
export {
  influencersApi,
  useGetInfluencersQuery
};
