import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudentDashbaord from "./components/StudentDashboard";
import AllStudentsDashboard from "./components/AllStudentsDashboard";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import CheckAuth from "./components/CheckAuth";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/" 
                        element={
                        <CheckAuth>
                            <StudentDashbaord />
                        </CheckAuth>
                        } 
                    />
                    <Route path="/allstudents" element={<AllStudentsDashboard />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;