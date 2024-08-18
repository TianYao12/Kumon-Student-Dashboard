import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import StudentDashbaord from "./components/StudentDashboard";
import AllStudentsDashboard from "./components/AllStudentsDashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<StudentDashbaord />} />
                <Route path="/allstudents" element={<AllStudentsDashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;