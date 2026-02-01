# Vercel Blob Storage Setup

This guide explains how to set up Vercel Blob Storage for hosting DMG files.

## Why Vercel Blob Storage?

- ✅ Files served from your domain (`oakfocus.co`)
- ✅ Fast global CDN
- ✅ Reliable (Vercel's infrastructure)
- ✅ Free tier: 1GB storage, 100GB bandwidth/month
- ✅ No Git LFS issues

## Setup Steps

### 1. Create Blob Store

1. Go to [Vercel Dashboard > Storage](https://vercel.com/dashboard/stores)
2. Click "Create Database" or "Add Storage"
3. Select "Blob"
4. Name it (e.g., "oak-releases")
5. Create the store

### 2. Get Your Token

After creating the store, you'll see:
- **BLOB_READ_WRITE_TOKEN** - Copy this token

### 3. Add Token to Vercel Environment Variables

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add:
   - Key: `BLOB_READ_WRITE_TOKEN`
   - Value: (paste your token)
   - Environment: Production, Preview, Development (select all)

### 4. Upload DMG File

#### Option A: Direct Upload (Recommended)

```bash
cd oak-website

# Set token (or add to .env.local)
export BLOB_READ_WRITE_TOKEN=your_token_here

# Upload DMG
node scripts/upload-dmg.js ../NotchTest/build/Oak-1.0.0.dmg 1.0.0
```

This will output a URL like:
```
https://[your-blob-store].public.blob.vercel-storage.com/releases/Oak-1.0.0.dmg
```

#### Option B: Via API Route (After deployment)

1. Set `UPLOAD_TOKEN` environment variable in Vercel (for security)
2. Use the API route:
```bash
./scripts/upload-dmg-to-blob.sh ../NotchTest/build/Oak-1.0.0.dmg 1.0.0
```

### 5. Update Download Links

After uploading, update:
- `src/components/Hero.tsx` - Download button
- `src/app/thank-you/page.tsx` - Download button  
- `NotchTest/appcast.xml` - Sparkle update URL

Replace the GitHub Releases URL with the Blob Storage URL.

## For Future Releases

Add blob upload to your release workflow:

```bash
# In NotchTest/release.sh or deploy-release.sh
export BLOB_READ_WRITE_TOKEN=your_token_here
node ../oak-website/scripts/upload-dmg.js build/Oak-${VERSION}.dmg ${VERSION}
```

Then update the download links with the returned URL.

## Troubleshooting

**Error: BLOB_READ_WRITE_TOKEN not set**
- Make sure you've added it to Vercel environment variables
- Or set it locally: `export BLOB_READ_WRITE_TOKEN=your_token`

**Error: Upload failed**
- Check your token is correct
- Verify blob store exists in Vercel dashboard
- Check file size (free tier has limits)

**Files not accessible**
- Make sure `access: 'public'` is set in the upload script
- Check blob store settings in Vercel dashboard
