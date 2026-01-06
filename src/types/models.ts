export type Location = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  vehicles: Vehicle[];
};

export type Vehicle = {
  id: string;
  type: "car" | "bike";
  brand: string;
  model: string;
  number: string;
  fuel?: string;
};

export type Mechanic = {
  id: string;
  name: string;
  rating: number;
  services: string[];
  priceRange: { min: number; max: number };
  etaMin: number;
  phone: string;
  location: Location;
};

export type BookingStatus =
  | "pending"
  | "accepted"
  | "on_the_way"
  | "completed"
  | "cancelled";

export type Booking = {
  id: string;
  customerId: string;
  mechanicId: string;
  problemType: ProblemType;
  location: Location;
  addressLabel: string;
  vehicle: Vehicle;
  status: BookingStatus;
  createdAt: number;
  updatedAt: number;
};

export type ProblemType =
  | "engine_issue"
  | "battery"
  | "puncture"
  | "general_service";

export type ChatMessage = {
  id: string;
  bookingId: string;
  sender: "user" | "mechanic";
  text: string;
  createdAt: number;
};

