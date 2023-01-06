import { FirebaseError } from 'firebase/app';

export const errorHandler = (error: FirebaseError | any) => {
  console.log(error.name, error.message);
};
