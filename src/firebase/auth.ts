import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  onAuthStateChanged,
  signOut,
  browserSessionPersistence,
  setPersistence
} from 'firebase/auth';
import { createUser } from '../requests/userRequests';
import { User } from '../types/types';
import { app } from './config';
import { errorHandler } from './error_handler/firebaseErrorHandler';

const auth = getAuth(app);

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

    const userInDB = await createUser(data);
    console.log('sent request');
    return userInDB;
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

const signOutUser = async () => {
  try {
    const signOutUser = await signOut(auth);
    return signOutUser;
  } catch (error) {
    return errorHandler(error);
  }
};

export { createANewUserWithEmailAndPassword, signInUser, signOutUser };
