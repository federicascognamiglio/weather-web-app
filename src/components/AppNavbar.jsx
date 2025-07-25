import { NavLink } from "react-router-dom"
import logo from '../assets/logo.png';

function AppNavbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* Navbar Logo */}
                <NavLink className="navbar-brand">
                    <img src={logo} alt="Logo" width="50" className="mx-4"/>
                </NavLink>
                {/* Navbar Collapse Button */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink to={"/"} className="nav-link text-end" aria-current="page">Dashboard</NavLink>
                        <NavLink to={"/settings"} className="nav-link text-end">Settings</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AppNavbar