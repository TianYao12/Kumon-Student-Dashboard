import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import StudentDashbaord from "./components/StudentDashboard";
import GoogleSignIn from "./components/GoogleSignIn"
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import { User } from "firebase/auth";
import AllStudentsDashboard from "./components/AllStudentsDashboard";

const App = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            return setUser(user);
        })
    })
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <GoogleSignIn />} />
                <Route path="/dashboard" element={<StudentDashbaord />} />
                <Route path="/signin" element={<GoogleSignIn />} />
                <Route path="/allstudents" element={<AllStudentsDashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;