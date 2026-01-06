import type { User } from "../types/models";

type Credentials = { email: string; password: string };

const dummyUsers: Array<User & { password: string }> = [
  {
    id: "u1",
    name: "Aarav Sharma",
    email: "user@garage.app",
    phone: "+91 99999 00000",
    vehicles: [
      {
        id: "v1",
        type: "car",
        brand: "Maruti",
        model: "Baleno",
        number: "MH 12 AB 1234",
        fuel: "Petrol",
      },
    ],
    password: "Password123!",
  },
];

export async function login(creds: Credentials): Promise<User> {
  await sleep(450);
  const found = dummyUsers.find(
    (u) => u.email.toLowerCase() === creds.email.toLowerCase(),
  );
  if (!found || found.password !== creds.password) {
    throw new Error("Invalid email or password");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = found;
  return user;
}

export async function register(user: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  await sleep(650);
  const exists = dummyUsers.some(
    (u) => u.email.toLowerCase() === user.email.toLowerCase(),
  );
  if (exists) throw new Error("Email already registered");
  const created: User & { password: string } = {
    id: `u${dummyUsers.length + 1}`,
    name: user.name,
    email: user.email,
    vehicles: [],
    password: user.password,
  };
  dummyUsers.push(created);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...publicUser } = created;
  return publicUser;
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
}

