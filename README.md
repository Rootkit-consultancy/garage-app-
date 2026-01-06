# Garage App (React Native – non‑Expo)

Customer-side **mechanic booking** app (Uber/Ola style, but for car/bike mechanics).

## Stack
- **React Native** (latest stable)
- **TypeScript**
- **React Navigation** (stack + bottom tabs)
- **Redux Toolkit**
- **Axios** (service layer)
- **react-native-maps** (map + markers)
- **react-native-permissions** + **react-native-geolocation-service** (location permissions + GPS)

## Setup

```bash
npm install
```

### iOS

```bash
cd ios
pod install
cd ..
```

Then:

```bash
npx react-native run-ios
```

### Android

```bash
npx react-native run-android
```

## Notes

### Map API key (Android)
`react-native-maps` on Android typically requires a Google Maps API key to display tiles.
Add this inside `<application>` in `android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_GOOGLE_MAPS_API_KEY" />
```

The app will still **build and run** without it, but the map may render blank.

### Demo login
- **Email**: `user@garage.app`
- **Password**: `Password123!`

## App Structure
`src/`
- `screens/` (`auth`, `home`, `booking`, `chat`, `profile`)
- `navigation/`
- `store/` (Redux slices + typed hooks)
- `services/` (axios + mocked auth)
- `types/`, `utils/`, `theme/`

