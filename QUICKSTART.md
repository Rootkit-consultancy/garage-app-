# Quick Start Guide

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the Expo development server**
   ```bash
   npm start
   ```

3. **Run on your device**
   - Install Expo Go app on your phone
   - Scan the QR code shown in terminal/browser
   - The app will load on your device

## Testing the App

### User Flow
1. Launch app → Splash screen
2. Complete onboarding (3 steps)
3. Login with phone/email + OTP
4. Select "I am a Vehicle Owner"
5. Browse mechanics on home screen
6. Tap "View Profile" or "Book" on any mechanic
7. Complete booking flow (Details → Schedule → Confirm)
8. View live tracking screen
9. Check chat, bookings history, and profile

### Mechanic Flow
1. Launch app → Splash screen
2. Complete onboarding
3. Login
4. Select "I am a Mechanic"
5. Toggle "Online" to receive job requests
6. Accept incoming job request
7. Navigate to customer location
8. Update job status (Reached → Started repair → Completed)
9. Add parts, photos, generate invoice
10. View earnings dashboard

## Current State

- ✅ All screens implemented
- ✅ Navigation structure complete
- ✅ Design system in place
- ⚠️ Mock data used (replace with API calls)
- ⚠️ Maps require API key for production
- ⚠️ Assets (icons, splash) need to be added

## Next Steps for Production

1. Set up backend API
2. Replace mock data with API calls
3. Add Google Maps API key
4. Implement real-time features (WebSockets)
5. Add image upload functionality
6. Integrate payment gateway
7. Add push notifications
8. Add proper error handling
9. Implement authentication persistence
10. Add loading states and error boundaries

## Notes

- The app uses mock data for demonstration
- Navigation flow is complete but some screens may need backend integration
- Location services require proper permissions
- Maps will work in development but need API key for production builds
