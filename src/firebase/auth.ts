import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { app } from './config';

const auth = getAuth(app);

const authObserver = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const createANewUserWithEmailAndPassword = async (
  auth: Auth,
  email: string,
  password: string
) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    // add a user to postgres
  } catch (error) {
    console.log(error);
  }
};

const signInUser = async (auth: Auth, email: string, password: string) => {
  try {
    const signedInUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    console.log(error);
  }
};

const signOutUser = async (auth: Auth) => {
  try {
    const signOutUser = await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export {
  authObserver,
  createANewUserWithEmailAndPassword,
  signInUser,
  signOutUser
};
