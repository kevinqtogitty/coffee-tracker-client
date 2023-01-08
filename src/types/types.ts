export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UsersCoffee {
  name: string;
  price: number;
  roastLevel: string;
  process: string;
  roaster: string;
  singleOrigin: boolean | string;
  country: string;
  notes: string;
  purchaseDate?: string;
}
