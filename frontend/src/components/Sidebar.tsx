import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
    const menuItems = [
        {
            label: "Profile", link: "/"
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
    return <div id="sidebar" className="sidebar w-full h-full max-h-full max-w-72">
        {
            menuItems.map(item =>
                <Link key={item.label} to={item.link} ><Button type="button" className="w-full my-1" label={item.label}></Button></Link>
            )
        }
    </div>
}

export default Sidebar;