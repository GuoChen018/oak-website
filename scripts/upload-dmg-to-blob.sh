#!/bin/bash

# Upload DMG to Vercel Blob Storage via API
# Usage: ./scripts/upload-dmg-to-blob.sh <path-to-dmg> <version> [upload-token]
# Example: ./scripts/upload-dmg-to-blob.sh ../NotchTest/build/Oak-1.0.0.dmg 1.0.0

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

DMG_PATH="$1"
VERSION="$2"
UPLOAD_TOKEN="${3:-${UPLOAD_TOKEN}}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ -z "$DMG_PATH" ] || [ -z "$VERSION" ]; then
  echo -e "${RED}Error: Missing arguments${NC}"
  echo ""
  echo "Usage: $0 <path-to-dmg> <version> [upload-token]"
  echo ""
  echo "Example:"
  echo "  $0 ../NotchTest/build/Oak-1.0.0.dmg 1.0.0"
  echo ""
  echo "Or set UPLOAD_TOKEN environment variable:"
  echo "  export UPLOAD_TOKEN=your_token_here"
  echo "  $0 ../NotchTest/build/Oak-1.0.0.dmg 1.0.0"
  exit 1
fi

if [ ! -f "$DMG_PATH" ]; then
  echo -e "${RED}Error: DMG file not found: ${DMG_PATH}${NC}"
  exit 1
fi

if [ -z "$UPLOAD_TOKEN" ]; then
  echo -e "${YELLOW}Warning: UPLOAD_TOKEN not set${NC}"
  echo ""
  echo "Set it with: export UPLOAD_TOKEN=your_token_here"
  echo "Or pass as third argument: $0 $DMG_PATH $VERSION your_token"
  exit 1
fi

# Check if we need to start the dev server
if [ -z "$VERCEL_URL" ] && [ -z "$NEXT_PUBLIC_VERCEL_URL" ]; then
  echo -e "${YELLOW}Note: This script uploads via API route${NC}"
  echo "Make sure your site is deployed on Vercel, or use the direct blob upload script:"
  echo "  node scripts/upload-dmg.js $DMG_PATH $VERSION"
  exit 1
fi

API_URL="${VERCEL_URL:-${NEXT_PUBLIC_VERCEL_URL}}"
if [[ ! "$API_URL" =~ ^https?:// ]]; then
  API_URL="https://${API_URL}"
fi

echo -e "${GREEN}Uploading DMG to Vercel Blob Storage...${NC}"
echo "  File: ${DMG_PATH}"
echo "  Version: ${VERSION}"
echo "  API: ${API_URL}/api/upload-dmg"
echo ""

# Upload via API
RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer ${UPLOAD_TOKEN}" \
  -F "file=@${DMG_PATH}" \
  -F "version=${VERSION}" \
  "${API_URL}/api/upload-dmg")

# Check if upload was successful
if echo "$RESPONSE" | grep -q '"success":true'; then
  BLOB_URL=$(echo "$RESPONSE" | grep -o '"url":"[^"]*' | cut -d'"' -f4)
  echo -e "${GREEN}✅ Upload successful!${NC}"
  echo ""
  echo "Blob URL: ${BLOB_URL}"
  echo ""
  echo "Update your download links to use this URL."
else
  echo -e "${RED}❌ Upload failed${NC}"
  echo "$RESPONSE"
  exit 1
fi
