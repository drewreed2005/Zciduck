import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Blog from "./pages/Blog.jsx";
import Music from "./pages/Music.jsx";
import Birthday from "./pages/Birthday.jsx";

export default function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/music" element={<Music />} />
                <Route path="/madre_birthday" element={<Birthday />} />
            </Routes>
        </>
    );
}