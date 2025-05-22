import { NextResponse } from 'next/server';

// Mock user registration
export async function POST(request: Request) {
  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const body = await request.json();
    
    // Simple validation
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // In a real app, we would save the user to a database here
    
    return NextResponse.json(
      { success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}