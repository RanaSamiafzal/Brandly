import React from "react";
import { X, CheckCheck, Trash2, Bell, MessageSquare, UserPlus, DollarSign } from "lucide-react";
import { InfluButton } from "./InfluButton";
function NotificationPanel({ isOpen, onClose, notifications = [] }) {
  const defaultNotifications = [
    {
      id: "1",
      type: "request",
      title: "New Campaign Request",
      message: "BravoTech sent you a collaboration request for Summer Product Launch",
      time: "5 min ago",
      read: false
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      message: "Sarah Johnson replied to your campaign proposal",
      time: "1 hour ago",
      read: false
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Received",
      message: "You received $2,500 for Winter Fashion Campaign",
      time: "2 hours ago",
      read: false
    },
    {
      id: "4",
      type: "system",
      title: "Profile Verified",
      message: "Your profile has been successfully verified by admin",
      time: "1 day ago",
      read: true
    },
    {
      id: "5",
      type: "request",
      title: "Campaign Accepted",
      message: "Mike Chen accepted your collaboration request",
      time: "2 days ago",
      read: true
    }
  ];
  const notificationList = notifications.length > 0 ? notifications : defaultNotifications;
  const unreadCount = notificationList.filter((n) => !n.read).length;
  const getIcon = (type) => {
    switch (type) {
      case "message":
        return /* @__PURE__ */ React.createElement(MessageSquare, { className: "w-5 h-5 text-[#3b82f6]" });
      case "request":
        return /* @__PURE__ */ React.createElement(UserPlus, { className: "w-5 h-5 text-[#f59e0b]" });
      case "payment":
        return /* @__PURE__ */ React.createElement(DollarSign, { className: "w-5 h-5 text-[#10b981]" });
      case "system":
        return /* @__PURE__ */ React.createElement(Bell, { className: "w-5 h-5 text-[#8b5cf6]" });
      default:
        return /* @__PURE__ */ React.createElement(Bell, { className: "w-5 h-5 text-[#6b7280]" });
    }
  };
  const handleMarkAllRead = () => {
    console.log("Marking all as read");
  };
  const handleClearAll = () => {
    console.log("Clearing all notifications");
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity",
      onClick: onClose
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 border-b border-[#e5e7eb] flex items-center justify-between bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Bell, { className: "w-5 h-5 text-[#3b82f6]" }), /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-semibold text-[#111827]" }, "Notifications"), unreadCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "bg-[#ef4444] text-white text-xs font-medium px-2 py-0.5 rounded-full" }, unreadCount)), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "p-1 hover:bg-[#f3f4f6] rounded-lg transition-colors"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5 text-[#6b7280]" })
  )), /* @__PURE__ */ React.createElement("div", { className: "p-3 border-b border-[#e5e7eb] flex gap-2" }, /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm", onClick: handleMarkAllRead, className: "flex-1" }, /* @__PURE__ */ React.createElement(CheckCheck, { className: "w-4 h-4 mr-1" }), "Mark all read"), /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm", onClick: handleClearAll }, /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto" }, notificationList.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center justify-center h-full text-center p-8" }, /* @__PURE__ */ React.createElement(Bell, { className: "w-16 h-16 text-[#d1d5db] mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280] font-medium mb-1" }, "No notifications"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#9ca3af]" }, "You're all caught up!")) : /* @__PURE__ */ React.createElement("div", { className: "divide-y divide-[#f3f4f6]" }, notificationList.map((notification) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: notification.id,
      className: `p-4 hover:bg-[#f9fafb] transition-colors cursor-pointer ${!notification.read ? "bg-[#eff6ff]" : ""}`
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex-shrink-0 mt-1" }, /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-lg ${notification.type === "message" ? "bg-[#dbeafe]" : notification.type === "request" ? "bg-[#fef3c7]" : notification.type === "payment" ? "bg-[#d1fae5]" : "bg-[#ede9fe]"}` }, getIcon(notification.type))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between mb-1" }, /* @__PURE__ */ React.createElement("h3", { className: "font-medium text-[#111827] text-sm" }, notification.title), !notification.read && /* @__PURE__ */ React.createElement("span", { className: "flex-shrink-0 w-2 h-2 bg-[#3b82f6] rounded-full ml-2 mt-1" })), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280] mb-2 line-clamp-2" }, notification.message), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-[#9ca3af]" }, notification.time), /* @__PURE__ */ React.createElement("button", { className: "text-xs text-[#3b82f6] hover:underline" }, "View"))))
  )))), notificationList.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "p-4 border-t border-[#e5e7eb] bg-[#f9fafb]" }, /* @__PURE__ */ React.createElement("button", { className: "w-full text-center text-sm text-[#3b82f6] font-medium hover:underline" }, "View All Notifications"))));
}
export {
  NotificationPanel
};
