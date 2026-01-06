export type Mechanic = {
  id: string;
  name: string;
  rating: number;
  jobs: number;
  experienceYears: number;
  distanceKm: number;
  etaMin: number;
  tags: string[];
  fromPrice: number;
  vehicleText: string;
};

export const user = {
  locationLabel: "Your location",
  address: "Kothrud, Pune",
};

export const vehicles = [
  { id: "v1", icon: "car", title: "Baleno - Petrol", subtitle: "MH 12 AB 1234" },
  { id: "v2", icon: "bike", title: "Activa - Petrol", subtitle: "MH 12 XY 9021" },
];

export const mechanics: Mechanic[] = [
  {
    id: "rahul",
    name: "Rahul Autocare",
    rating: 4.8,
    jobs: 180,
    experienceYears: 4,
    distanceKm: 1.2,
    etaMin: 15,
    tags: ["Car", "Bike", "Garage"],
    fromPrice: 249,
    vehicleText: "Hero Splendor - MH 12 AB 1234",
  },
  {
    id: "sakshi",
    name: "Sakshi Motors",
    rating: 4.9,
    jobs: 220,
    experienceYears: 5,
    distanceKm: 2.6,
    etaMin: 18,
    tags: ["Car", "Garage"],
    fromPrice: 199,
    vehicleText: "Eeco - MH 12 CD 5544",
  },
  {
    id: "om",
    name: "Om Bike Care",
    rating: 4.7,
    jobs: 140,
    experienceYears: 3,
    distanceKm: 0.9,
    etaMin: 12,
    tags: ["Bike", "Pickup"],
    fromPrice: 149,
    vehicleText: "Bajaj Pulsar - MH 12 KK 7777",
  },
];

