# SignalCheck PWA - Setup Instructions

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Configure backend URL**:
   - Copy `.env.local.example` to `.env.local`
   - Update `NEXT_PUBLIC_BACKEND_URL` with your actual backend endpoint
   ```bash
   cp .env.local.example .env.local
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Backend Integration

The app sends POST requests to your backend with this payload:
```json
{
  "name": "John Doe",
  "gender": "male",
  "age": 30,
  "email": "john@example.com",
  "phone": "+1 234 567 8900"
}
```

Expected response format:
```json
{
  "status": "green",
  "message": "Optional status message"
}
```

Status can be either `"green"` or `"red"`.

## PWA Features

- **Installable**: Users can install the app on their device
- **Offline shell**: Basic caching via service worker
- **Mobile-first**: Optimized for mobile viewports
- **Manifest**: Configured in `/public/manifest.webmanifest`

## Icon Customization

Replace the placeholder icons in `/public/`:
- `icon-192.png` - 192x192px PNG
- `icon-512.png` - 512x512px PNG

## Testing

1. Open in Chrome/Edge on mobile or desktop
2. Fill out the form with valid data
3. Click "Check Status"
4. Backend response will display as green/red status light

## Production Deployment

The app is configured for static export (`output: 'export'` in `next.config.js`), making it easy to deploy to any static hosting service (Vercel, Netlify, S3, etc.).
