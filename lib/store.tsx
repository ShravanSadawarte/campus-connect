"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { INITIAL_NOTIFICATIONS } from "./data";
import type { AppNotification } from "./types";

interface AppState {
  registeredIds: string[];
  joinedClubIds: string[];
  notifications: AppNotification[];
  isRegistered: (id: string) => boolean;
  toggleRegister: (id: string) => boolean; // returns now-registered?
  isJoined: (id: string) => boolean;
  toggleJoin: (id: string) => boolean;
  markAllRead: () => void;
  markRead: (id: string) => void;
  unreadCount: number;
}

const AppContext = createContext<AppState | null>(null);

function readLS(key: string, fallback: string[]): string[] {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function readNotifications(): AppNotification[] {
  if (typeof window === "undefined") return INITIAL_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem("cc-notifications");
    if (!raw) return INITIAL_NOTIFICATIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_NOTIFICATIONS;
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [registeredIds, setRegisteredIds] = useState<string[]>(["sunset-acoustic"]);
  const [joinedClubIds, setJoinedClubIds] = useState<string[]>(["photography"]);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setRegisteredIds(readLS("cc-registrations", ["sunset-acoustic"]));
    setJoinedClubIds(readLS("cc-clubs", ["photography"]));
    setNotifications(readNotifications());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("cc-registrations", JSON.stringify(registeredIds));
  }, [registeredIds, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("cc-clubs", JSON.stringify(joinedClubIds));
  }, [joinedClubIds, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("cc-notifications", JSON.stringify(notifications));
  }, [notifications, hydrated]);

  const isRegistered = useCallback((id: string) => registeredIds.includes(id), [registeredIds]);
  const isJoined = useCallback((id: string) => joinedClubIds.includes(id), [joinedClubIds]);

  const toggleRegister = useCallback(
    (id: string) => {
      let nowRegistered = false;
      setRegisteredIds((prev) => {
        if (prev.includes(id)) {
          nowRegistered = false;
          return prev.filter((x) => x !== id);
        }
        nowRegistered = true;
        return [...prev, id];
      });
      return nowRegistered;
    },
    []
  );

  const toggleJoin = useCallback((id: string) => {
    let nowJoined = false;
    setJoinedClubIds((prev) => {
      if (prev.includes(id)) {
        nowJoined = false;
        return prev.filter((x) => x !== id);
      }
      nowJoined = true;
      return [...prev, id];
    });
    return nowJoined;
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }, []);

  const unreadCount = useMemo(() => notifications.filter((n) => n.unread).length, [notifications]);

  const value = useMemo(
    () => ({
      registeredIds,
      joinedClubIds,
      notifications,
      isRegistered,
      toggleRegister,
      isJoined,
      toggleJoin,
      markAllRead,
      markRead,
      unreadCount,
    }),
    [registeredIds, joinedClubIds, notifications, isRegistered, toggleRegister, isJoined, toggleJoin, markAllRead, markRead, unreadCount]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function useLocalToast() {
  const [toast, setToast] = useState<string | null>(null);
  const show = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);
  return { toast, show };
}
