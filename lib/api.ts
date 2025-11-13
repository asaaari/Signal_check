import { UserInfo, BackendResponse, Notification } from './types';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'https://freebsd-saturn-managed-initiative.trycloudflare.com';

const NOTIFICATION_URL =
  process.env.NEXT_PUBLIC_NOTIFICATION_URL ||
  'https://freebsd-saturn-managed-initiative.trycloudflare.com';

export async function sendUserInfo(userInfo: UserInfo): Promise<BackendResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error(`Submit failed. HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error sending user info:', error);
    throw error;
  }
}

export async function fetchNotifications(): Promise<Notification[]> {
  try {
    const response = await fetch(`${NOTIFICATION_URL}/notifications`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Notifications failed. HTTP ${response.status}`);
    }

    const data = await response.json();

    // Always return an array
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.notifications)) return data.notifications;

    return [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}
