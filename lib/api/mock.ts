// Mock API client
import { useAuthStore } from '../store/auth-store';

// Mock API base URL - in a real app, this would be an environment variable
const API_BASE_URL = '/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

// Helper for making authenticated requests
export const fetcher = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = useAuthStore.getState().token;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login - in a real app, this would call the actual API
    if (credentials.email && credentials.password) {
      return {
        token: 'mock-jwt-token',
        email: credentials.email,
        registrationDate: new Date().toISOString(),
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  register: async (credentials: RegisterCredentials) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration - in a real app, this would call the actual API
    if (credentials.email && credentials.password) {
      return {
        success: true,
      };
    }
    
    throw new Error('Registration failed');
  },
  
  getProfile: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = useAuthStore.getState().user;
    if (user) return user;
    return {
      email: 'user@example.com',
      registrationDate: '2023-01-15T12:00:00Z',
      subscriptions: ['Basic Plan', 'Premium Features'],
    };
  },
};