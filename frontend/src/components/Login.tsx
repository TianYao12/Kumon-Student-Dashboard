import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase"; 

const Login = () => {
    const login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("User signed in:", result.user);
            })
            .catch((error) => {
                console.error("Error during sign-in:", error);
            });
    };

    const authContext = useContext(AuthContext);

    return (
        <>
            {authContext && authContext.isLoggedIn ? (
                <Navigate to="/" />
            ) : (
                <div className="login-container" onClick={login}>
                    <h1>Login</h1>
                    <GoogleSignIn />
                </div>
            )}
        </>
    );
};

export default Login;
