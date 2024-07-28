import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudentDashbaord from "./components/StudentDashboard";
import Login from "./components/Login"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<StudentDashbaord />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;