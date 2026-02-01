#!/usr/bin/env node

/**
 * Upload DMG file to Vercel Blob Storage
 * Usage: node scripts/upload-dmg.js <path-to-dmg> <version>
 * Example: node scripts/upload-dmg.js ../NotchTest/build/Oak-1.0.0.dmg 1.0.0
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadDMG(dmgPath, version) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable is not set');
    console.error('');
    console.error('Get your token from: https://vercel.com/dashboard/stores');
    console.error('  1. Go to Vercel Dashboard > Storage');
    console.error('  2. Create a Blob store (if you don\'t have one)');
    console.error('  3. Copy the BLOB_READ_WRITE_TOKEN');
    console.error('  4. Set it: export BLOB_READ_WRITE_TOKEN=your_token_here');
    console.error('');
    console.error('Or add it to your .env.local file:');
    console.error('  BLOB_READ_WRITE_TOKEN=your_token_here');
    process.exit(1);
  }

  if (!fs.existsSync(dmgPath)) {
    console.error(`❌ Error: DMG file not found at ${dmgPath}`);
    process.exit(1);
  }

  const dmgName = `Oak-${version}.dmg`;
  const blobPath = `releases/${dmgName}`;

  console.log(`📤 Uploading ${dmgName} to Vercel Blob Storage...`);
  console.log(`   Path: ${blobPath}`);
  console.log(`   File: ${dmgPath}`);
  console.log('');

  try {
    const blob = await put(blobPath, fs.readFileSync(dmgPath), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    console.log('✅ Upload successful!');
    console.log('');
    console.log('Blob URL:', blob.url);
    console.log('');
    console.log('Update your download links to use this URL.');
    
    return blob.url;
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

// Get command line arguments
const dmgPath = process.argv[2];
const version = process.argv[3];

if (!dmgPath || !version) {
  console.error('Usage: node scripts/upload-dmg.js <path-to-dmg> <version>');
  console.error('Example: node scripts/upload-dmg.js ../NotchTest/build/Oak-1.0.0.dmg 1.0.0');
  process.exit(1);
}

uploadDMG(dmgPath, version);
