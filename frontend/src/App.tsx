import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar";
import CheckAuth from "./components/CheckAuth";
import Login from "./components/Login";
import CurrentStudentDashbaord from "./components/CurrentStudentDashboard";
import AllStudentsDashboard from "./components/AllStudentsDashboard";
import { AuthProvider } from "./context/AuthContext";

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
                    <Route path="/allstudents" 
                        element={
                            <CheckAuth>
                                <AllStudentsDashboard />
                            </CheckAuth>
                        } 
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;