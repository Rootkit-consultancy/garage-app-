export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  BookingFlow: { mechanicId: string };
  BookingStatus: { bookingId: string };
  BookingDetails: { bookingId: string };
  ChatThread: { bookingId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  BookingsTab: undefined;
  ChatTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type BookingsStackParamList = {
  Bookings: undefined;
  BookingDetails: { bookingId: string };
};

export type ChatStackParamList = {
  ChatList: undefined;
  ChatThread: { bookingId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  ManageVehicles: undefined;
};

export type BookingFlowStackParamList = {
  ProblemType: undefined;
  ConfirmLocation: undefined;
  VehicleDetails: undefined;
  Summary: undefined;
};

