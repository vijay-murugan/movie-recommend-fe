import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth"; 

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
          setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            await doCreateUserWithEmailAndPassword(email, password);
            navigate("/");
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    }

    return (
        <nav>
            <main className="form-area">
                <h1>Register</h1>
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </main>
        </nav>
    );
}
