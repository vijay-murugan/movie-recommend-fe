import { useAuth } from "../../contexts/authcontext";
import { doSignOut } from "../../firebase/auth";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const auth = useAuth();
  const userLoggedIn = auth?.userLoggedIn ?? false;
  const navigate = useNavigate();
  return (
    <nav className="header">
        {
            userLoggedIn
        ?
        <>
        <button onClick={() => {doSignOut().then(() => { navigate('/login') })}}>
          Logout
        </button>
        </>
        :
        <>
        <Link className="header-link" to="/login">Login</Link>
        <Link className="header-link" to="/register">Register</Link>
        </>
    }
    </nav>
  );
}

export default Header;