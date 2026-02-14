import React from "react";
import { cn } from "./ui/utils";
function Input({ label, error, className, ...props }) {
  return /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, label && /* @__PURE__ */ React.createElement("label", { className: "block mb-2 text-[#374151]" }, label, props.required && /* @__PURE__ */ React.createElement("span", { className: "text-[#ef4444] ml-1" }, "*")), /* @__PURE__ */ React.createElement(
    "input",
    {
      className: cn(
        "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent",
        error ? "border-[#ef4444]" : "border-[#d1d5db]",
        className
      ),
      ...props
    }
  ), error && /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-sm text-[#ef4444]" }, error));
}
function Select({ label, error, options, className, ...props }) {
  return /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, label && /* @__PURE__ */ React.createElement("label", { className: "block mb-2 text-[#374151]" }, label, props.required && /* @__PURE__ */ React.createElement("span", { className: "text-[#ef4444] ml-1" }, "*")), /* @__PURE__ */ React.createElement(
    "select",
    {
      className: cn(
        "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent bg-white",
        error ? "border-[#ef4444]" : "border-[#d1d5db]",
        className
      ),
      ...props
    },
    options.map((option) => /* @__PURE__ */ React.createElement("option", { key: option.value, value: option.value }, option.label))
  ), error && /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-sm text-[#ef4444]" }, error));
}
function Textarea({ label, error, className, ...props }) {
  return /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, label && /* @__PURE__ */ React.createElement("label", { className: "block mb-2 text-[#374151]" }, label, props.required && /* @__PURE__ */ React.createElement("span", { className: "text-[#ef4444] ml-1" }, "*")), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      className: cn(
        "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent",
        error ? "border-[#ef4444]" : "border-[#d1d5db]",
        className
      ),
      rows: 4,
      ...props
    }
  ), error && /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-sm text-[#ef4444]" }, error));
}
export {
  Input,
  Select,
  Textarea
};
