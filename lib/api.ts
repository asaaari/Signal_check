import { UserInfo, BackendResponse, Notification } from './types';

export async function sendUserInfo(userInfo: UserInfo): Promise<BackendResponse> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.example.com/check';

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending user info:', error);
    throw error;
  }
}

export async function fetchNotifications(): Promise<Notification[]> {
  const notificationUrl = process.env.NEXT_PUBLIC_NOTIFICATION_URL || 'https://api.example.com/notifications';

  try {
    const response = await fetch(notificationUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.notifications || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}
