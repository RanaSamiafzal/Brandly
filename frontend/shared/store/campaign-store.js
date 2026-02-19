import { create } from 'zustand';

export const useCampaignStore = create((set) => ({
    campaigns: [],
    setCampaigns: (campaigns) => set({ campaigns }),
    addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
}));
