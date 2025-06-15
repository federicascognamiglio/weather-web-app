// Components
import AppNavbar from "../components/AppNavbar";
import { Outlet } from "react-router-dom";

function MasterLayout() {
    return (
        <>
            <header>
                <AppNavbar />
            </header>

            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default MasterLayout;