import {useState} from "react";
import {Navigate, Link} from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import './login.css';

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(!isLoggedIn) {
        try {
            await doSignInWithEmailAndPassword(email, password);
            setIsLoggedIn(true);
        } catch (error) {
            setError("Login failed. Please check your credentials.");
        }
        }
    }

    const onGoogleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!isLoggedIn) {
    try {
      await doSignInWithGoogle();
      setIsLoggedIn(true); // Only set after successful login
    } catch {
      setIsLoggedIn(false);
    }
  }
    }

  return (
    <div>
      {isLoggedIn && <Navigate to="/" replace={true} />}
      <main className="session">
        
  <div className="form-area">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
          <button onClick={onGoogleLogin}>Login with Google</button>
        </form>
                <p style={{ marginTop: "1.5rem", padding: "0.5rem 0" }}>

        Don't have an account? <Link to="/register">Register</Link></p>
</div>
      </main>
 
    </div>
  );
}