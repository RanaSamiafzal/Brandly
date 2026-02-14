import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, Briefcase, Users } from "lucide-react";
import { Input } from "../components/FormComponents";
import { InfluButton } from "../components/InfluButton";
function SignupPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  if (!userType) {
    return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-4xl" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl shadow-xl p-8" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 bg-[#3b82f6] rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-10 h-10 text-white" }))), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-[#111827] mb-2" }, "Join InfluConnect"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Choose your account type to get started")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setUserType("brand"),
        className: "p-8 border-2 border-[#e5e7eb] rounded-xl hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-all group"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center text-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 h-20 bg-[#eff6ff] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3b82f6] transition-colors" }, /* @__PURE__ */ React.createElement(Briefcase, { className: "w-10 h-10 text-[#3b82f6] group-hover:text-white transition-colors" })), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold text-[#111827] mb-2" }, "I'm a Brand"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Find and collaborate with influencers to boost your brand"))
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setUserType("influencer"),
        className: "p-8 border-2 border-[#e5e7eb] rounded-xl hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-all group"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center text-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 h-20 bg-[#eff6ff] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3b82f6] transition-colors" }, /* @__PURE__ */ React.createElement(Users, { className: "w-10 h-10 text-[#3b82f6] group-hover:text-white transition-colors" })), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold text-[#111827] mb-2" }, "I'm an Influencer"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Get discovered and work with amazing brands"))
    )), /* @__PURE__ */ React.createElement("div", { className: "mt-6 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Already have an account?", " ", /* @__PURE__ */ React.createElement(Link, { to: "/login", className: "text-[#3b82f6] hover:underline font-medium" }, "Sign in"))))));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl shadow-xl p-8" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 bg-[#3b82f6] rounded-full flex items-center justify-center" }, userType === "brand" ? /* @__PURE__ */ React.createElement(Briefcase, { className: "w-10 h-10 text-white" }) : /* @__PURE__ */ React.createElement(Users, { className: "w-10 h-10 text-white" }))), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-[#111827] mb-2" }, "Sign up as ", userType === "brand" ? "Brand" : "Influencer"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setUserType(null),
      className: "text-sm text-[#3b82f6] hover:underline"
    },
    "Change account type"
  )), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React.createElement(
    Input,
    {
      label: userType === "brand" ? "Brand Name" : "Full Name",
      type: "text",
      name: "name",
      value: formData.name,
      onChange: handleChange,
      placeholder: userType === "brand" ? "Your Company" : "John Doe",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Email",
      type: "email",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      placeholder: "you@example.com",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Password",
      type: "password",
      name: "password",
      value: formData.password,
      onChange: handleChange,
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: formData.confirmPassword,
      onChange: handleChange,
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(InfluButton, { type: "submit", variant: "primary", className: "w-full mb-4" }, "Create Account")), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Already have an account?", " ", /* @__PURE__ */ React.createElement(Link, { to: "/login", className: "text-[#3b82f6] hover:underline font-medium" }, "Sign in"))))));
}
export {
  SignupPage
};
