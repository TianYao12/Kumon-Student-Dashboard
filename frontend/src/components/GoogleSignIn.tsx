import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
      }
    });
  }
  return (
    <div className="google-signin-button-container" onClick={login}>
        <img src="../google.png" className="google-signin-button" />
    </div>
  );
}
export default SignInwithGoogle;