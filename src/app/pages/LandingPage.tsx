import React from 'react';
import { useNavigate } from 'react-router';
import { InfluButton } from '../components/InfluButton';
import { Shield, Users, Target, TrendingUp, Search, CheckCircle, Star, Zap, ArrowRight } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: 'Find Perfect Matches',
      description: 'Advanced search filters to discover influencers that align with your brand values and target audience.',
      color: 'bg-[#3b82f6]',
    },
    {
      icon: Target,
      title: 'Campaign Management',
      description: 'Streamlined tools to create, manage, and track your influencer campaigns all in one place.',
      color: 'bg-[#10b981]',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Monitor campaign performance with comprehensive analytics and detailed reporting dashboards.',
      color: 'bg-[#f59e0b]',
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'Work with confidence knowing all influencers are verified and authenticated by our team.',
      color: 'bg-[#8b5cf6]',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up as a brand or influencer and complete your profile with your details and preferences.',
    },
    {
      number: '02',
      title: 'Connect & Discover',
      description: 'Use powerful search tools to find the perfect collaboration partners for your goals.',
    },
    {
      number: '03',
      title: 'Collaborate & Grow',
      description: 'Launch campaigns, track progress, and build lasting partnerships that drive results.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Influencers' },
    { value: '5K+', label: 'Trusted Brands' },
    { value: '50K+', label: 'Successful Campaigns' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fashion Influencer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      quote: 'InfluConnect has transformed how I collaborate with brands. The platform is intuitive and the opportunities are endless!',
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director at TechCorp',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      quote: 'Finding the right influencers has never been easier. InfluConnect saved us countless hours and delivered amazing results.',
    },
    {
      name: 'Emma Davis',
      role: 'Lifestyle Creator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      quote: 'The best platform for managing collaborations. Professional, efficient, and genuinely cares about creators.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#e5e7eb] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#3b82f6]" />
            <span className="text-xl font-bold text-[#111827]">InfluConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-[#6b7280] hover:text-[#111827] font-medium transition-colors"
            >
              Login
            </button>
            <InfluButton variant="primary" onClick={() => navigate('/signup')}>
              Get Started
            </InfluButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-[#eff6ff] via-white to-[#f0fdf4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#3b82f6] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Trusted by 10,000+ Creators & Brands
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#111827] mb-6 leading-tight">
                Connect Brands with Influencers
                <span className="text-[#3b82f6]"> Seamlessly</span>
              </h1>
              <p className="text-xl text-[#6b7280] mb-8">
                The ultimate platform for authentic brand-influencer collaborations. 
                Discover, connect, and grow your business with powerful tools and insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <InfluButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/signup')}
                >
                  Start Free Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </InfluButton>
                <InfluButton 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </InfluButton>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#6b7280]">Rated 4.9/5 by users</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-[#3b82f6] rounded-2xl opacity-20 blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-[#10b981] rounded-2xl opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-[#9ca3af]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#111827] mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
              Powerful features designed to make influencer marketing simple, effective, and measurable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-[#e5e7eb] hover:border-[#3b82f6] hover:shadow-lg transition-all"
              >
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-2">{feature.title}</h3>
                <p className="text-[#6b7280]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#111827] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
              Get started in minutes and launch your first campaign today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="text-6xl font-bold text-[#eff6ff] mb-4">{step.number}</div>
                  <h3 className="text-2xl font-semibold text-[#111827] mb-3">{step.title}</h3>
                  <p className="text-[#6b7280]">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#e5e7eb]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#111827] mb-4">
              Loved by Creators & Brands
            </h2>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
              Join thousands of satisfied users who are growing their business with InfluConnect.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-[#e5e7eb] shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-[#6b7280] mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-[#111827]">{testimonial.name}</div>
                    <div className="text-sm text-[#6b7280]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Collaborations?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join InfluConnect today and start building meaningful partnerships that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <InfluButton 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-white text-[#3b82f6] hover:bg-[#f9fafb] border-white"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </InfluButton>
            <InfluButton 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/login')}
              className="text-white border-white hover:bg-white/10"
            >
              Sign In
            </InfluButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-lg font-bold">InfluConnect</span>
              </div>
              <p className="text-[#9ca3af]">
                Connecting brands with influencers for authentic collaborations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-[#9ca3af]">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-[#9ca3af]">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-[#9ca3af]">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#374151] pt-8 text-center text-[#9ca3af]">
            <p>&copy; 2024 InfluConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
