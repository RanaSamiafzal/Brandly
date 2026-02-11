import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Shield, Briefcase, Users } from 'lucide-react';
import { Input } from '../components/FormComponents';
import { InfluButton } from '../components/InfluButton';

type UserType = 'brand' | 'influencer' | null;

export function SignupPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - in real app, this would call an API
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#3b82f6] rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-[#111827] mb-2">Join InfluConnect</h1>
              <p className="text-[#6b7280]">Choose your account type to get started</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setUserType('brand')}
                className="p-8 border-2 border-[#e5e7eb] rounded-xl hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[#eff6ff] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3b82f6] transition-colors">
                    <Briefcase className="w-10 h-10 text-[#3b82f6] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2">I'm a Brand</h3>
                  <p className="text-[#6b7280]">
                    Find and collaborate with influencers to boost your brand
                  </p>
                </div>
              </button>

              <button
                onClick={() => setUserType('influencer')}
                className="p-8 border-2 border-[#e5e7eb] rounded-xl hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[#eff6ff] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3b82f6] transition-colors">
                    <Users className="w-10 h-10 text-[#3b82f6] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2">I'm an Influencer</h3>
                  <p className="text-[#6b7280]">
                    Get discovered and work with amazing brands
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#6b7280]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#3b82f6] hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#3b82f6] rounded-full flex items-center justify-center">
                {userType === 'brand' ? (
                  <Briefcase className="w-10 h-10 text-white" />
                ) : (
                  <Users className="w-10 h-10 text-white" />
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#111827] mb-2">
              Sign up as {userType === 'brand' ? 'Brand' : 'Influencer'}
            </h1>
            <button
              onClick={() => setUserType(null)}
              className="text-sm text-[#3b82f6] hover:underline"
            >
              Change account type
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              label={userType === 'brand' ? 'Brand Name' : 'Full Name'}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={userType === 'brand' ? 'Your Company' : 'John Doe'}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <InfluButton type="submit" variant="primary" className="w-full mb-4">
              Create Account
            </InfluButton>
          </form>

          <div className="text-center">
            <p className="text-sm text-[#6b7280]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#3b82f6] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
