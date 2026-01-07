# Garage App (Expo – JavaScript)

Mechanic booking app with **user + mechanic** flows (onboarding/auth, map + nearby mechanics, booking flow, live tracking/status, chat, profile).

## Run (Expo Go preview)

```bash
npm install
npx expo start --tunnel
```

Then scan the QR code with:
- iOS: Camera app → open in Expo Go
- Android: Expo Go → Scan QR Code

## Tech
- Expo SDK 54 (iOS + Android)
- React Navigation (stack + tabs)
- Redux Toolkit
- Axios
- Expo Location + react-native-maps (native; web shows a placeholder)

## Project structure
- `App.js`: app entry
- `src/navigation/`: navigators (auth flow + role-based tabs)
- `src/screens/`: `auth/`, `user/`, `mechanic/`, `shared/`
- `src/store/`: Redux slices + store
- `src/components/`: Button/Card/Chip/Map
- `src/constants/theme.js`: shared design tokens

