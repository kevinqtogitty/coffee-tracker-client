export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UsersCoffee {
  id?: number;
  name: string;
  price: string;
  roastLevel: string;
  process: string;
  roaster: string;
  singleOrigin: boolean | string;
  country: string;
  notes: string;
  purchaseDate?: string;
  farmer: number | null;
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
