export interface UserInfo {
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  email: string;
  phone: string;
}

export interface BackendResponse {
  status: 'green' | 'red';
  message?: string;
}
