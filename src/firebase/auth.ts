import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  setPersistence
} from 'firebase/auth';
import { createUser } from '../requests/userRequests';
import { User } from '../types/types';
import { app, auth } from './config';
import { errorHandler } from './error_handler/firebaseErrorHandler';

const createANewUserWithEmailAndPassword = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    const data: User = {
      userId: newUser.user.uid,
      email: email,
      firstName: firstName,
      lastName: lastName
    };

    await createUser(data);
    return;
  } catch (error: FirebaseError | any) {
    return errorHandler(error);
  }
};

const signInUser = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const signedInUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(signedInUser);
    return signedInUser;
  } catch (error) {
    return errorHandler(error);
  }
};

export { createANewUserWithEmailAndPassword, signInUser };
