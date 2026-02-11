import { createBrowserRouter } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { BrandDashboard } from './pages/BrandDashboard';
import { SearchInfluencers } from './pages/SearchInfluencers';
import { MyRequests } from './pages/MyRequests';
import { AdminPanel } from './pages/AdminPanel';
import { ProfileSettings } from './pages/ProfileSettings';
import { AdminUsers } from './pages/AdminUsers';
import { AdminReports } from './pages/AdminReports';
import { AdminSettings } from './pages/AdminSettings';
import { InfluencerDashboard } from './pages/InfluencerDashboard';
import { CreateCampaign } from './pages/CreateCampaign';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignupPage,
  },
  {
    path: '/dashboard',
    Component: BrandDashboard,
  },
  {
    path: '/influencer/dashboard',
    Component: InfluencerDashboard,
  },
  {
    path: '/search',
    Component: SearchInfluencers,
  },
  {
    path: '/requests',
    Component: MyRequests,
  },
  {
    path: '/create-campaign',
    Component: CreateCampaign,
  },
  {
    path: '/settings',
    Component: ProfileSettings,
  },
  {
    path: '/profile',
    Component: ProfileSettings,
  },
  {
    path: '/admin',
    Component: AdminPanel,
  },
  {
    path: '/admin/users',
    Component: AdminUsers,
  },
  {
    path: '/admin/reports',
    Component: AdminReports,
  },
  {
    path: '/admin/settings',
    Component: AdminSettings,
  },
  {
    path: '*',
    Component: () => (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#111827] mb-4">404</h1>
          <p className="text-[#6b7280] mb-4">Page not found</p>
          <a href="/" className="text-[#3b82f6] hover:underline">
            Go to Home
          </a>
        </div>
      </div>
    ),
  },
]);