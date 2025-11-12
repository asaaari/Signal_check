'use client';

import { useEffect, useState } from 'react';
import { fetchNotifications } from '@/lib/api';
import { Notification } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, RefreshCw, Trash2 } from 'lucide-react';

interface NotificationCenterProps {
  isVisible: boolean;
}

export function NotificationCenter({ isVisible }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await fetchNotifications();
      const processedData = data.map((item: any) => ({
        ...item,
        timestamp: item.timestamp ? new Date(item.timestamp) : new Date(),
      }));
      setNotifications(processedData);
      setLastRefresh(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 5000);

    setIsPolling(true);

    return () => {
      clearInterval(interval);
      setIsPolling(false);
    };
  }, [isVisible]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Messages from backend</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={loadNotifications}
              disabled={isLoading}
              size="sm"
              variant="outline"
              className="gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            {notifications.length > 0 && (
              <Button
                onClick={clearNotifications}
                size="sm"
                variant="outline"
                className="gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
        {lastRefresh && (
          <p className="mt-2 text-xs text-muted-foreground">
            Last updated: {lastRefresh.toLocaleTimeString()}
            {isPolling && ' (auto-polling every 5s)'}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <MessageCircle className="mb-2 h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start justify-between rounded-lg border border-border bg-card p-3"
              >
                <div className="flex-1 pr-3">
                  <p className="text-sm text-foreground">{notification.text}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <Button
                  onClick={() => deleteNotification(notification.id)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
