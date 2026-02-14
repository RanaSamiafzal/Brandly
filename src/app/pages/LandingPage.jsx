import React from "react";
import { useNavigate } from "react-router";
import { InfluButton } from "../components/InfluButton";
import { Shield, Target, TrendingUp, Search, Star, Zap, ArrowRight } from "lucide-react";
function LandingPage() {
  const navigate = useNavigate();
  const features = [
    {
      icon: Search,
      title: "Find Perfect Matches",
      description: "Advanced search filters to discover influencers that align with your brand values and target audience.",
      color: "bg-[#3b82f6]"
    },
    {
      icon: Target,
      title: "Campaign Management",
      description: "Streamlined tools to create, manage, and track your influencer campaigns all in one place.",
      color: "bg-[#10b981]"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Monitor campaign performance with comprehensive analytics and detailed reporting dashboards.",
      color: "bg-[#f59e0b]"
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "Work with confidence knowing all influencers are verified and authenticated by our team.",
      color: "bg-[#8b5cf6]"
    }
  ];
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up as a brand or influencer and complete your profile with your details and preferences."
    },
    {
      number: "02",
      title: "Connect & Discover",
      description: "Use powerful search tools to find the perfect collaboration partners for your goals."
    },
    {
      number: "03",
      title: "Collaborate & Grow",
      description: "Launch campaigns, track progress, and build lasting partnerships that drive results."
    }
  ];
  const stats = [
    { value: "10K+", label: "Active Influencers" },
    { value: "5K+", label: "Trusted Brands" },
    { value: "50K+", label: "Successful Campaigns" },
    { value: "98%", label: "Satisfaction Rate" }
  ];
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Influencer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      quote: "InfluConnect has transformed how I collaborate with brands. The platform is intuitive and the opportunities are endless!"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director at TechCorp",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      quote: "Finding the right influencers has never been easier. InfluConnect saved us countless hours and delivered amazing results."
    },
    {
      name: "Emma Davis",
      role: "Lifestyle Creator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      quote: "The best platform for managing collaborations. Professional, efficient, and genuinely cares about creators."
    }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-white" }, /* @__PURE__ */ React.createElement("nav", { className: "fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#e5e7eb] z-50" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-8 h-8 text-[#3b82f6]" }), /* @__PURE__ */ React.createElement("span", { className: "text-xl font-bold text-[#111827]" }, "InfluConnect")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/login"),
      className: "text-[#6b7280] hover:text-[#111827] font-medium transition-colors"
    },
    "Login"
  ), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", onClick: () => navigate("/signup") }, "Get Started")))), /* @__PURE__ */ React.createElement("section", { className: "pt-32 pb-20 px-6 bg-gradient-to-br from-[#eff6ff] via-white to-[#f0fdf4]" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 bg-[#dbeafe] text-[#3b82f6] px-4 py-2 rounded-full text-sm font-medium mb-6" }, /* @__PURE__ */ React.createElement(Zap, { className: "w-4 h-4" }), "Trusted by 10,000+ Creators & Brands"), /* @__PURE__ */ React.createElement("h1", { className: "text-5xl lg:text-6xl font-bold text-[#111827] mb-6 leading-tight" }, "Connect Brands with Influencers", /* @__PURE__ */ React.createElement("span", { className: "text-[#3b82f6]" }, " Seamlessly")), /* @__PURE__ */ React.createElement("p", { className: "text-xl text-[#6b7280] mb-8" }, "The ultimate platform for authentic brand-influencer collaborations. Discover, connect, and grow your business with powerful tools and insights."), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-4" }, /* @__PURE__ */ React.createElement(
    InfluButton,
    {
      variant: "primary",
      size: "lg",
      onClick: () => navigate("/signup")
    },
    "Start Free Today",
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-5 h-5 ml-2" })
  ), /* @__PURE__ */ React.createElement(
    InfluButton,
    {
      variant: "outline",
      size: "lg",
      onClick: () => navigate("/login")
    },
    "Sign In"
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-6 mt-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex -space-x-2" }, [1, 2, 3, 4].map((i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: i,
      className: "w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] border-2 border-white"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 mb-1" }, [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ React.createElement(Star, { key: i, className: "w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" }))), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Rated 4.9/5 by users")))), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      alt: "Team collaboration",
      className: "rounded-2xl shadow-2xl"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "absolute -bottom-4 -right-4 w-64 h-64 bg-[#3b82f6] rounded-2xl opacity-20 blur-3xl" }), /* @__PURE__ */ React.createElement("div", { className: "absolute -top-4 -left-4 w-64 h-64 bg-[#10b981] rounded-2xl opacity-20 blur-3xl" }))))), /* @__PURE__ */ React.createElement("section", { className: "py-16 bg-[#111827]" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8" }, stats.map((stat, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-4xl lg:text-5xl font-bold text-white mb-2" }, stat.value), /* @__PURE__ */ React.createElement("div", { className: "text-[#9ca3af]" }, stat.label)))))), /* @__PURE__ */ React.createElement("section", { className: "py-20 px-6" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-16" }, /* @__PURE__ */ React.createElement("h2", { className: "text-4xl font-bold text-[#111827] mb-4" }, "Everything You Need to Succeed"), /* @__PURE__ */ React.createElement("p", { className: "text-xl text-[#6b7280] max-w-2xl mx-auto" }, "Powerful features designed to make influencer marketing simple, effective, and measurable.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" }, features.map((feature, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: index,
      className: "p-6 rounded-2xl border border-[#e5e7eb] hover:border-[#3b82f6] hover:shadow-lg transition-all"
    },
    /* @__PURE__ */ React.createElement("div", { className: `${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4` }, /* @__PURE__ */ React.createElement(feature.icon, { className: "w-6 h-6 text-white" })),
    /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold text-[#111827] mb-2" }, feature.title),
    /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, feature.description)
  ))))), /* @__PURE__ */ React.createElement("section", { className: "py-20 px-6 bg-[#f9fafb]" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-16" }, /* @__PURE__ */ React.createElement("h2", { className: "text-4xl font-bold text-[#111827] mb-4" }, "How It Works"), /* @__PURE__ */ React.createElement("p", { className: "text-xl text-[#6b7280] max-w-2xl mx-auto" }, "Get started in minutes and launch your first campaign today.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" }, steps.map((step, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-8 rounded-2xl shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "text-6xl font-bold text-[#eff6ff] mb-4" }, step.number), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-semibold text-[#111827] mb-3" }, step.title), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, step.description)), index < steps.length - 1 && /* @__PURE__ */ React.createElement("div", { className: "hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#e5e7eb]" })))))), /* @__PURE__ */ React.createElement("section", { className: "py-20 px-6" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-16" }, /* @__PURE__ */ React.createElement("h2", { className: "text-4xl font-bold text-[#111827] mb-4" }, "Loved by Creators & Brands"), /* @__PURE__ */ React.createElement("p", { className: "text-xl text-[#6b7280] max-w-2xl mx-auto" }, "Join thousands of satisfied users who are growing their business with InfluConnect.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" }, testimonials.map((testimonial, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "bg-white p-8 rounded-2xl border border-[#e5e7eb] shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 mb-4" }, [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ React.createElement(Star, { key: i, className: "w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" }))), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280] mb-6 italic" }, '"', testimonial.quote, '"'), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: testimonial.image,
      alt: testimonial.name,
      className: "w-12 h-12 rounded-full object-cover"
    }
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-[#111827]" }, testimonial.name), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-[#6b7280]" }, testimonial.role)))))))), /* @__PURE__ */ React.createElement("section", { className: "py-20 px-6 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl mx-auto text-center" }, /* @__PURE__ */ React.createElement("h2", { className: "text-4xl lg:text-5xl font-bold text-white mb-6" }, "Ready to Transform Your Collaborations?"), /* @__PURE__ */ React.createElement("p", { className: "text-xl text-white/90 mb-8" }, "Join InfluConnect today and start building meaningful partnerships that drive real results."), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-4 justify-center" }, /* @__PURE__ */ React.createElement(
    InfluButton,
    {
      variant: "outline",
      size: "lg",
      onClick: () => navigate("/signup"),
      className: "bg-white text-[#3b82f6] hover:bg-[#f9fafb] border-white"
    },
    "Get Started Free",
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-5 h-5 ml-2" })
  ), /* @__PURE__ */ React.createElement(
    InfluButton,
    {
      variant: "outline",
      size: "lg",
      onClick: () => navigate("/login"),
      className: "text-white border-white hover:bg-white/10"
    },
    "Sign In"
  )))), /* @__PURE__ */ React.createElement("footer", { className: "bg-[#111827] text-white py-12 px-6" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8 mb-8" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-6 h-6 text-[#3b82f6]" }), /* @__PURE__ */ React.createElement("span", { className: "text-lg font-bold" }, "InfluConnect")), /* @__PURE__ */ React.createElement("p", { className: "text-[#9ca3af]" }, "Connecting brands with influencers for authentic collaborations.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold mb-4" }, "Product"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2 text-[#9ca3af]" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Features")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Pricing")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Case Studies")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold mb-4" }, "Company"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2 text-[#9ca3af]" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "About Us")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Blog")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Careers")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold mb-4" }, "Support"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2 text-[#9ca3af]" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Help Center")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Contact Us")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Privacy Policy"))))), /* @__PURE__ */ React.createElement("div", { className: "border-t border-[#374151] pt-8 text-center text-[#9ca3af]" }, /* @__PURE__ */ React.createElement("p", null, "\xA9 2024 InfluConnect. All rights reserved.")))));
}
export {
  LandingPage
};
