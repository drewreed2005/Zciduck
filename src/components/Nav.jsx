import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <header className="nav">
            <NavLink to="/" className="brand">Drew Reed</NavLink>
            <nav>
                <NavLink to="/portfolio">Portfolio</NavLink>
                <NavLink to="/blog">Blog</NavLink>
            </nav>
        </header>
    );
}