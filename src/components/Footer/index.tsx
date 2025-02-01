import { Link } from "react-router"


const Footer = () => {
    return (
        <footer className="m-2 mx-auto text-sm">
           <Link to="/">Share Liked Songs</Link> · 2025 · <Link to="help">Info &amp; Help</Link>
        </footer>
    )
}

export default Footer