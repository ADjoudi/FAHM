import "../styles/Header.scss";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function Header({ user }) {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="FAHM" />
      </Link>
      <nav>
        {user ? (
          <>
            <Link to={`/${user.id}/add-post`}>New Post</Link>
            <Link to="/profile">{user.name}</Link>
          </>
        ) : (
          <>
            <Link to="/sign-up">Sing-up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
