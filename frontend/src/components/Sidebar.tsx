import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import "../styles/sidebar.css";

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const menuItems = [
        {
            label: "Profile", link: "/profile"
        },
        {
            label: "Skills", link: "/skills",
        },
        {
            label: "Education", link: "/education",
        },
        {
            label: "Experiences", link: "/experiences",
        },
        {
            label: "Projects", link: "/projects",
        },
        {
            label: "Certifications", link: "/certifications",
        },
        {
            label: "Code", link: "/code",
        },
        {
            label: "Templates", link: "/templates"
        }
    ]
    const onLogout = () => {
        logout();
        navigate("/login")
    }
    return <div id="sidebar" className="sidebar w-full h-full max-h-full max-w-72">
        {
            menuItems.map(item =>
                <Link key={item.label} to={item.link} ><Button type="button" className="w-full my-1" label={item.label}></Button></Link>
            )
        }
        <Button type="button" severity="danger" className="w-full my-1" label="Logout" onClick={onLogout}></Button>
    </div>
}

export default Sidebar;