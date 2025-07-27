import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, updatePassword, sendEmailVerification, onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
}
export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}

export const doSignOut = () => {
  return auth.signOut();
}

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
}

export const doPasswordUpdate = async (password: string) => {
  if (auth.currentUser) {
    return await updatePassword(auth.currentUser, password);
  }
  throw new Error("No user is currently signed in.");
}

export const doSendEmailVerification = async () => {
  if (auth.currentUser) {
    return await sendEmailVerification(auth.currentUser);
  }
  throw new Error("No user is currently signed in.");
}

export const onAuthStateChangedListener = (callback: (user: any | null) => void) => {
  return onAuthStateChanged(auth, callback);
} 