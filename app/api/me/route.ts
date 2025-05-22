import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Mock protected profile endpoint
export async function GET(request: Request) {
  try {
    // Get authorization header
    const headersList = headers();
    const authorization = headersList.get('authorization');
    
    // Check if token exists and has correct format
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, we would validate the token and fetch user data from a database
    
    // Mock user profile data
    const profile = {
      email: 'user@example.com',
      registrationDate: '2023-01-15T12:00:00Z',
      subscriptions: ['Basic Plan', 'Premium Features'],
    };
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}