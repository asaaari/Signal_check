import { UserInfo, BackendResponse } from './types';

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
