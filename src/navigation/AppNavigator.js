import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Colors } from '../constants/theme';

// Auth
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';

// User tabs + stacks
import UserHomeScreen from '../screens/user/UserHomeScreen';
import MechanicProfileScreen from '../screens/user/MechanicProfileScreen';
import ServiceDetailsScreen from '../screens/user/ServiceDetailsScreen';
import BookingSummaryScreen from '../screens/user/BookingSummaryScreen';
import LiveJobScreen from '../screens/user/LiveJobScreen';
import LiveVehicleStatusScreen from '../screens/user/LiveVehicleStatusScreen';
import BookingsHistoryScreen from '../screens/user/BookingsHistoryScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';

// Mechanic tabs + stacks
import MechanicHomeScreen from '../screens/mechanic/MechanicHomeScreen';
import JobRequestScreen from '../screens/mechanic/JobRequestScreen';
import JobDetailsScreen from '../screens/mechanic/JobDetailsScreen';
import NavigateScreen from '../screens/mechanic/NavigateScreen';
import EarningsScreen from '../screens/mechanic/EarningsScreen';
import MechanicProfileEditScreen from '../screens/mechanic/MechanicProfileEditScreen';

// Shared chat
import ChatScreen from '../screens/shared/ChatScreen';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const UserStack = createNativeStackNavigator();
const MechanicStack = createNativeStackNavigator();

function AuthFlow() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Auth" component={AuthScreen} />
      <AuthStack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    </AuthStack.Navigator>
  );
}

function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.muted,
        tabBarIcon: ({ color, size }) => {
          const name =
            route.name === 'Home'
              ? 'map-outline'
              : route.name === 'Bookings'
                ? 'receipt-outline'
                : route.name === 'Chat'
                  ? 'chatbubbles-outline'
                  : 'person-outline';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={UserHomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsHistoryScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

function MechanicTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.muted,
        tabBarIcon: ({ color, size }) => {
          const name =
            route.name === 'Home'
              ? 'home-outline'
              : route.name === 'Earnings'
                ? 'wallet-outline'
                : route.name === 'Chat'
                  ? 'chatbubbles-outline'
                  : 'person-outline';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={MechanicHomeScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={MechanicProfileEditScreen} />
    </Tab.Navigator>
  );
}

function UserAppStack() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="UserTabs" component={UserTabs} options={{ headerShown: false }} />
      <UserStack.Screen name="MechanicProfile" component={MechanicProfileScreen} options={{ title: 'Mechanic' }} />
      <UserStack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={{ title: 'Service details' }} />
      <UserStack.Screen name="BookingSummary" component={BookingSummaryScreen} options={{ title: 'Confirm booking' }} />
      <UserStack.Screen name="LiveJob" component={LiveJobScreen} options={{ title: 'Live tracking' }} />
      <UserStack.Screen
        name="LiveVehicleStatus"
        component={LiveVehicleStatusScreen}
        options={{ title: 'Vehicle status' }}
      />
      <UserStack.Screen name="ChatThread" component={ChatScreen} options={{ title: 'Chat' }} />
    </UserStack.Navigator>
  );
}

function MechanicAppStack() {
  return (
    <MechanicStack.Navigator>
      <MechanicStack.Screen name="MechanicTabs" component={MechanicTabs} options={{ headerShown: false }} />
      <MechanicStack.Screen name="JobRequest" component={JobRequestScreen} options={{ title: 'New request' }} />
      <MechanicStack.Screen name="JobDetails" component={JobDetailsScreen} options={{ title: 'Job details' }} />
      <MechanicStack.Screen name="Navigate" component={NavigateScreen} options={{ title: 'Navigate' }} />
      <MechanicStack.Screen name="ChatThread" component={ChatScreen} options={{ title: 'Chat' }} />
    </MechanicStack.Navigator>
  );
}

export default function AppNavigator() {
  const { isOnboarded, isAuthed, role } = useSelector((s) => s.auth);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboarded || !isAuthed || !role ? (
        <RootStack.Screen name="AuthFlow" component={AuthFlow} />
      ) : role === 'mechanic' ? (
        <RootStack.Screen name="MechanicApp" component={MechanicAppStack} />
      ) : (
        <RootStack.Screen name="UserApp" component={UserAppStack} />
      )}
    </RootStack.Navigator>
  );
}

