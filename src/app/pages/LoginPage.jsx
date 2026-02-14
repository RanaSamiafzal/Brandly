import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield } from "lucide-react";
import { Input } from "../components/FormComponents";
import { InfluButton } from "../components/InfluButton";
function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl shadow-xl p-8" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 bg-[#3b82f6] rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-10 h-10 text-white" }))), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-[#111827] mb-2" }, "InfluConnect"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Sign in to your account")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React.createElement(
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
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "rounded border-[#d1d5db]" }), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-[#6b7280]" }, "Remember me")), /* @__PURE__ */ React.createElement(Link, { to: "/forgot-password", className: "text-sm text-[#3b82f6] hover:underline" }, "Forgot password?")), /* @__PURE__ */ React.createElement(InfluButton, { type: "submit", variant: "primary", className: "w-full mb-4" }, "Sign In")), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Don't have an account?", " ", /* @__PURE__ */ React.createElement(Link, { to: "/signup", className: "text-[#3b82f6] hover:underline font-medium" }, "Sign up"))))));
}
export {
  LoginPage
};
