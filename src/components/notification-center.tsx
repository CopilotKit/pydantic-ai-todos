"use client";

import { useState } from "react";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  timestamp: Date;
}

interface NotificationCenterProps {
  themeColor: string;
  notifications?: Notification[];
}

export function NotificationCenter({ themeColor, notifications: initialNotifications }: NotificationCenterProps) {
  const defaultNotifications: Notification[] = initialNotifications || [
    {
      id: "1",
      type: "success",
      title: "Task Completed",
      message: "Successfully marked 'Build website' as done",
      timestamp: new Date(Date.now() - 2 * 60000),
    },
    {
      id: "2",
      type: "info",
      title: "Theme Changed",
      message: "Theme color updated to purple",
      timestamp: new Date(Date.now() - 15 * 60000),
    },
    {
      id: "3",
      type: "warning",
      title: "Reminder",
      message: "You have 3 tasks in progress",
      timestamp: new Date(Date.now() - 30 * 60000),
    },
  ];

  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
        );
      case "error":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "error":
        return "bg-red-500/20 text-red-300 border-red-400/30";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
    }
  };

  const formatTime = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div 
      style={{ backgroundColor: themeColor }} 
      className="backdrop-blur-sm rounded-xl p-6 mt-4 mb-4 max-w-md w-full border border-white/20 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">🔔 Notifications</h3>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-white/60 text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${getColor(notification.type)} transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-white/70 mt-1">{notification.message}</p>
                  <p className="text-xs text-white/50 mt-2">{formatTime(notification.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

