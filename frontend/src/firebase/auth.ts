import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

export const createUserEmailPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInEmailPassword = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
};

export const signOut = () => {
    return auth.signOut();
}

export const passwordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
}

export const passwordChange = (password: string) => {
    if (auth.currentUser) return updatePassword(auth.currentUser, password)
}