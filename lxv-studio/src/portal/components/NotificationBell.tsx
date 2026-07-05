import React, { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import type { NotificationItem } from "../domain/types";
import { getRepository } from "../data";
import { useAuth } from "../auth/AuthContext";
import { EmptyState, formatDateTime } from "./ui";

/** Dashboard notification center — unread badge + dropdown panel. */
export function NotificationBell() {
  const { user } = useAuth();
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const fetchItems = () => {
      getRepository()
        .listNotifications(user.email)
        .then((list) => {
          if (!cancelled) setItems(list);
        })
        .catch(() => undefined);
    };
    fetchItems();
    const interval = window.setInterval(fetchItems, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const unread = items.filter((n) => !n.read).length;

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && unread > 0 && user) {
      void getRepository()
        .markNotificationsRead(user.email)
        .then(() => setItems((list) => list.map((n) => ({ ...n, read: true }))));
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={toggle}
        aria-label={unread > 0 ? `Notifications (${unread} unread)` : "Notifications"}
        aria-expanded={open}
        className="relative rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:border-white/25 hover:text-white"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-neon-pink px-1 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#111014] shadow-2xl">
          <p className="border-b border-white/[0.06] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Notifications
          </p>
          {items.length === 0 ? (
            <EmptyState icon={Bell} title="Nothing yet" hint="Project updates will show up here." />
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {items.slice(0, 20).map((n) => (
                <li key={n.id} className="border-b border-white/[0.04] px-4 py-3 last:border-0">
                  <p className="text-sm font-medium text-white">{n.title}</p>
                  {n.body && <p className="mt-0.5 text-xs text-gray-500">{n.body}</p>}
                  <p className="mt-1 text-[10px] text-gray-600">{formatDateTime(n.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
