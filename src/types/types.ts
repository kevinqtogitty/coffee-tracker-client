export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface UsersCoffee {
  id?: number;
  name: string;
  price: string | number;
  roastLevel: string | number;
  process: string | number;
  roaster: string;
  singleOrigin: boolean | string;
  country: string | number;
  notes: string;
  purchaseDate?: string | null;
  farmer: number | null;
  timestamp: string;
}

export interface Processes {
  id: number;
  country?: string;
  process_name: string;
  roast_level?: string;
}
export interface Origins {
  id: number;
  country: string;
  process_name?: string;
  roast_level?: string;
}
export interface RoastLevels {
  id: number;
  roast_level: string;
  process_name?: string;
  country?: string;
}
