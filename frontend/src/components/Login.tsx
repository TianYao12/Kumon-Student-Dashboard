import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [password, setPassword] = useState<string>("");
    const authContext = useContext<AuthContextType | null>(AuthContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ password: password})
            });
            if (!response.ok) throw new Error(JSON.stringify(response));
            if (authContext) authContext.login();
            
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {authContext && authContext.isLoggedIn ? (
                <Navigate to="/" />
             ) : (
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input className="login-input" type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button className="login-submit-button" type="submit">Submit</button>
                </form>
             )}
        </>
    )
}

export default Login;