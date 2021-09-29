import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <Link to="/" className="header__link">
                <span className="header__brand">SouLxSnips</span>
            </Link>
        </div>
    );
}
