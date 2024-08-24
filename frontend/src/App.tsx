import { BrowserRouter, Route, Routes } from "react-router-dom"
import CurrentStudentDashbaord from "./components/CurrentStudentDashboard";
import AllStudentsDashboard from "./components/AllStudentsDashboard";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import CheckAuth from "./components/CheckAuth";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/" 
                        element={
                        <CheckAuth>
                            <CurrentStudentDashbaord />
                        </CheckAuth>
                        } 
                    />
                    <Route path="/allstudents" element={<CheckAuth>
                        <AllStudentsDashboard />
                    </CheckAuth>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;