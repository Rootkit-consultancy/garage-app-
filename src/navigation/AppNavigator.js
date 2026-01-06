import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';

// User Screens
import UserHomeScreen from '../screens/user/UserHomeScreen';
import MechanicProfileScreen from '../screens/user/MechanicProfileScreen';
import ServiceDetailsScreen from '../screens/user/ServiceDetailsScreen';
import BookingSummaryScreen from '../screens/user/BookingSummaryScreen';
import LiveJobScreen from '../screens/user/LiveJobScreen';
import LiveVehicleStatusScreen from '../screens/user/LiveVehicleStatusScreen';
import ChatScreen from '../screens/shared/ChatScreen';
import BookingsHistoryScreen from '../screens/user/BookingsHistoryScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';

// Mechanic Screens
import MechanicHomeScreen from '../screens/mechanic/MechanicHomeScreen';
import JobRequestScreen from '../screens/mechanic/JobRequestScreen';
import NavigateScreen from '../screens/mechanic/NavigateScreen';
import JobDetailsScreen from '../screens/mechanic/JobDetailsScreen';
import MechanicChatScreen from '../screens/mechanic/MechanicChatScreen';
import EarningsScreen from '../screens/mechanic/EarningsScreen';
import MechanicProfileEditScreen from '../screens/mechanic/MechanicProfileEditScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// User Tab Navigator
const UserTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Bookings') iconName = focused ? 'calendar' : 'calendar-outline';
        else if (route.name === 'Chat') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textLight,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: Colors.white,
        borderTopColor: Colors.border,
      },
    })}
  >
    <Tab.Screen name="Home" component={UserHomeScreen} />
    <Tab.Screen name="Bookings" component={BookingsHistoryScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Profile" component={UserProfileScreen} />
  </Tab.Navigator>
);

// Mechanic Tab Navigator
const MechanicTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Jobs') iconName = focused ? 'briefcase' : 'briefcase-outline';
        else if (route.name === 'Chat') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        else if (route.name === 'Earnings') iconName = focused ? 'wallet' : 'wallet-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textLight,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: Colors.white,
        borderTopColor: Colors.border,
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={MechanicHomeScreen} />
    <Tab.Screen name="Jobs" component={JobDetailsScreen} />
    <Tab.Screen name="Chat" component={MechanicChatScreen} />
    <Tab.Screen name="Earnings" component={EarningsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'user' or 'mechanic'

  useEffect(() => {
    // Simulate splash screen
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Check actual onboarding/auth state from storage
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={!isOnboarded ? "Onboarding" : !isAuthenticated ? "Auth" : userRole === 'user' ? "UserTabs" : "MechanicTabs"}
    >
      {/* Auth Flow */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      
      {/* User Flow */}
      <Stack.Screen name="UserTabs" component={UserTabs} />
      <Stack.Screen name="MechanicProfile" component={MechanicProfileScreen} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
      <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
      <Stack.Screen name="LiveJob" component={LiveJobScreen} />
      <Stack.Screen name="LiveVehicleStatus" component={LiveVehicleStatusScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      
      {/* Mechanic Flow */}
      <Stack.Screen name="MechanicTabs" component={MechanicTabs} />
      <Stack.Screen name="JobRequest" component={JobRequestScreen} />
      <Stack.Screen name="Navigate" component={NavigateScreen} />
      <Stack.Screen name="MechanicChat" component={MechanicChatScreen} />
      <Stack.Screen name="MechanicProfileEdit" component={MechanicProfileEditScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
