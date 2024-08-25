import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    const getNavLinkClass = (path: string) => {
        return location.pathname === path
            ? "navbar-list-item-text active"
            : "navbar-list-item-text";
    };

    return (
        <nav className="navbar-container">
            <ul className="navbar-list-items-container">
                <li>
                    <Link to="/" className={`${getNavLinkClass('/')} space-left-20`}>
                        Current Students
                    </Link>
                </li>
                <li>
                    <Link to="/allstudents" className={getNavLinkClass('/allstudents')}>
                        All Students
                    </Link>
                </li>
                <li>
                    <Link to="/qrcodes" className={getNavLinkClass('/qrcodes')}>
                        QR Codes
                    </Link>
                </li>
                {authContext && !authContext.isLoggedIn && (
                    <li>
                        <Link to="/login" className={getNavLinkClass('/login')}>
                            Login
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;