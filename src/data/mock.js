export const mockUser = {
  id: 'u1',
  name: 'Shivam',
  phone: '+1 (555) 010-0101',
  email: 'user@garage.app',
  defaultAddress: '221B Baker Street, Downtown',
  vehicles: [
    { id: 'v1', label: 'Honda City • 2018', plate: 'AB-1234' },
    { id: 'v2', label: 'Yamaha FZ • 2020', plate: 'XY-9876' },
  ],
};

export const mockMechanicProfile = {
  id: 'm1',
  name: 'Rohan Motors',
  rating: 4.8,
  reviews: 238,
  experienceYears: 9,
  skills: ['Battery', 'Tyres', 'Diagnostics', 'AC'],
  brands: ['Honda', 'Hyundai', 'Suzuki'],
  languages: ['English', 'Hindi'],
};

export const mockMechanics = [
  {
    id: 'm1',
    name: 'Rohan Motors',
    rating: 4.8,
    jobs: 1200,
    etaMin: 12,
    location: { latitude: 28.6139, longitude: 77.209 },
    tags: ['Top rated', 'Diagnostics'],
  },
  {
    id: 'm2',
    name: 'SpeedFix Garage',
    rating: 4.6,
    jobs: 860,
    etaMin: 18,
    location: { latitude: 28.6215, longitude: 77.2012 },
    tags: ['Fast', 'Tyres'],
  },
  {
    id: 'm3',
    name: 'Urban Auto Care',
    rating: 4.4,
    jobs: 540,
    etaMin: 25,
    location: { latitude: 28.607, longitude: 77.2166 },
    tags: ['Affordable', 'Battery'],
  },
];

export const mockBookings = [
  {
    id: 'b1',
    status: 'ongoing',
    mechanicId: 'm1',
    service: 'Battery jumpstart',
    createdAt: Date.now() - 1000 * 60 * 20,
    address: '221B Baker Street, Downtown',
    etaMin: 10,
    steps: [
      { key: 'accepted', label: 'Accepted', done: true },
      { key: 'enroute', label: 'En route', done: true },
      { key: 'reached', label: 'Reached', done: false },
      { key: 'repair', label: 'Repair in progress', done: false },
      { key: 'done', label: 'Completed', done: false },
    ],
  },
  {
    id: 'b2',
    status: 'completed',
    mechanicId: 'm2',
    service: 'Tyre puncture',
    createdAt: Date.now() - 1000 * 60 * 60 * 36,
    address: 'MG Road, Block C',
    total: 799,
  },
];

export const mockThreads = [
  {
    id: 't1',
    title: 'Rohan Motors',
    lastMessage: 'On the way. Please share a landmark.',
    updatedAt: Date.now() - 1000 * 60 * 4,
  },
];

export const mockMessages = {
  t1: [
    { id: 'm1', from: 'them', text: 'Hi, what seems to be the issue?', ts: Date.now() - 1000 * 60 * 12 },
    { id: 'm2', from: 'me', text: 'Car won’t start. Battery seems dead.', ts: Date.now() - 1000 * 60 * 11 },
    { id: 'm3', from: 'them', text: 'On the way. Please share a landmark.', ts: Date.now() - 1000 * 60 * 4 },
  ],
};

