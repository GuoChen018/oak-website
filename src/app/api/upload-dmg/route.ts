import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check for authentication token (you can add your own auth logic)
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.UPLOAD_TOKEN || 'your-secret-token';
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const version = formData.get('version') as string;

    if (!file || !version) {
      return NextResponse.json(
        { error: 'Missing file or version' },
        { status: 400 }
      );
    }

    const blobPath = `releases/Oak-${version}.dmg`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const blob = await put(blobPath, buffer, {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      path: blobPath,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
