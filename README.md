# Garage App

A comprehensive React Native/Expo application for connecting vehicle owners with mechanics. Features real-time tracking, in-app chat, booking management, and earnings tracking.

## Features

### User App
- **Splash & Onboarding**: 3-step carousel introduction
- **Authentication**: Phone/Email OTP-based login with role selection
- **Find Mechanics**: Search and filter nearby mechanics with ratings and pricing
- **Mechanic Profiles**: Detailed profiles with skills, reviews, and gallery
- **Booking Flow**: Multi-step booking with vehicle selection, service details, and scheduling
- **Live Tracking**: Real-time mechanic location tracking with ETA (Uber-like interface)
- **Live Vehicle Status**: Progress tracking during repair with photo updates
- **In-App Chat**: WhatsApp-style messaging with quick replies
- **Booking History**: View ongoing and past bookings with rebooking options
- **Profile Management**: Manage vehicles, addresses, and settings

### Mechanic App
- **Dashboard**: Online/offline toggle, earnings summary, incoming job requests
- **Job Requests**: Accept/reject jobs with countdown timer
- **Navigation**: Map view with route to customer location
- **Status Updates**: Update job status (Reached, Started repair, Completed)
- **Job Details**: Document parts used, capture before/after photos, generate invoices
- **Earnings**: Track daily/weekly/monthly earnings with simple bar graph
- **Chat**: Communicate with customers

## Tech Stack

- **React Native** with **Expo** (~50.0.0)
- **React Navigation** (Stack & Bottom Tabs)
- **React Native Maps** for location tracking
- **Expo Location** for geolocation
- **React Native Paper** for UI components
- **Expo Vector Icons** for icons

## Project Structure

```
garage-app/
├── App.js                      # Root component
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── src/
│   ├── constants/
│   │   └── theme.js            # Colors, typography, spacing
│   ├── components/
│   │   ├── Button.js           # Reusable button component
│   │   ├── Card.js             # Card container component
│   │   └── Chip.js             # Chip/tag component
│   ├── navigation/
│   │   └── AppNavigator.js     # Main navigation setup
│   ├── screens/
│   │   ├── auth/               # Authentication screens
│   │   │   ├── SplashScreen.js
│   │   │   ├── OnboardingScreen.js
│   │   │   ├── AuthScreen.js
│   │   │   └── RoleSelectionScreen.js
│   │   ├── user/               # User app screens
│   │   │   ├── UserHomeScreen.js
│   │   │   ├── MechanicProfileScreen.js
│   │   │   ├── ServiceDetailsScreen.js
│   │   │   ├── BookingSummaryScreen.js
│   │   │   ├── LiveJobScreen.js
│   │   │   ├── LiveVehicleStatusScreen.js
│   │   │   ├── BookingsHistoryScreen.js
│   │   │   └── UserProfileScreen.js
│   │   ├── mechanic/           # Mechanic app screens
│   │   │   ├── MechanicHomeScreen.js
│   │   │   ├── JobRequestScreen.js
│   │   │   ├── NavigateScreen.js
│   │   │   ├── JobDetailsScreen.js
│   │   │   ├── MechanicChatScreen.js
│   │   │   ├── EarningsScreen.js
│   │   │   └── MechanicProfileEditScreen.js
│   │   └── shared/             # Shared screens
│   │       └── ChatScreen.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

3. **Run on device**
   - Scan the QR code with Expo Go (iOS) or Camera app (Android)
   - Or press `i` for iOS simulator, `a` for Android emulator

## Design System

### Colors
- **Primary**: `#2563EB` (Blue accent)
- **Background**: `#F7F8FC` (Light grey)
- **Card Background**: `#FFFFFF` (White)
- **Text**: `#1F2937` (Dark grey)
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Orange)
- **Error**: `#EF4444` (Red)

### Typography
- **H1**: 28px, Bold
- **H2**: 24px, Semi-bold
- **H3**: 20px, Semi-bold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular
- **Small**: 12px, Regular

### Spacing
- Consistent spacing scale: 4, 8, 12, 16, 20, 24, 32px

### Border Radius
- Cards: 12-16px
- Buttons: 12px
- Chips: Full (pill shape)

## Key Features Implementation

### Navigation Flow
- **Auth Flow**: Splash → Onboarding → Auth → Role Selection
- **User Flow**: Home → Mechanic Profile → Service Details → Booking Summary → Live Job → Chat/History
- **Mechanic Flow**: Dashboard → Job Request → Navigate → Job Details → Earnings

### State Management
Currently using React hooks (useState). For production, consider:
- Redux or Zustand for global state
- React Query for API data fetching
- AsyncStorage for local persistence

### Maps Integration
- Uses `react-native-maps` for map views
- Requires Google Maps API key for production (configure in `app.json`)

### Location Services
- Uses `expo-location` for geolocation
- Requires location permissions (configured in `app.json`)

## Next Steps

1. **Backend Integration**
   - Set up API endpoints for authentication, bookings, chat
   - Implement real-time updates using WebSockets or Firebase
   - Add push notifications

2. **Payment Integration**
   - Integrate payment gateway (Razorpay, Stripe, etc.)
   - Add payment method management

3. **Image Handling**
   - Implement image upload for vehicle photos, before/after repair photos
   - Add image compression and optimization

4. **Real-time Features**
   - WebSocket connection for live tracking
   - Real-time chat messages
   - Push notifications for job requests

5. **Testing**
   - Unit tests for components
   - Integration tests for navigation flows
   - E2E tests for critical user journeys

6. **Performance Optimization**
   - Image lazy loading
   - Code splitting
   - Memoization for expensive operations

## Development Notes

- All screens are functional components using React Hooks
- Navigation is handled by React Navigation v6
- Styling follows a consistent design system
- Components are reusable and modular
- Mock data is used for demonstration; replace with API calls

## License

MIT
