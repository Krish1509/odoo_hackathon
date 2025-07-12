import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { available: false, error: 'Username must be at least 3 characters long' },
        { status: 200 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ username: username.toLowerCase() });

    return NextResponse.json(
      { 
        available: !existingUser,
        username: username.toLowerCase()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Username check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 