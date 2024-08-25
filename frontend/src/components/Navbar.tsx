import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    return (
        <nav className="navbar-container">
            <ul className="navbar-list-items-container">
                <li>
                    <Link to="/" className="navbar-list-item-text space-left-20">Current Students</Link>
                </li>
                <li>
                    <Link to="/allstudents" className="navbar-list-item-text">All Students</Link>
                </li>
                <li>
                    <Link to="/qrcodes" className="navbar-list-item-text">QR Codes</Link>
                </li>
                {authContext && !authContext.isLoggedIn &&
                    <li>
                        <Link to="/login" className="navbar-list-item-text">Login</Link>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Navbar;
