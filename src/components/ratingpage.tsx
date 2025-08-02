import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/authcontext';
import { doSignOut } from '../firebase/auth';

const movies = [
  { movieId: 1, name: "Inception" },
  { movieId: 2, name: "The Matrix" },
  { movieId: 3, name: "Interstellar" },
  // Add more movies as needed
];

export const Rate = () => {
  const auth = useAuth();
  const userLoggedIn = auth?.userLoggedIn ?? false; // fallback to false if undefined
  const user = auth?.user;
  const navigate = useNavigate();
  const handleLogout = async () => {
    await doSignOut();
    navigate('/login');
  };
  const userEmail = auth?.userEmail;  
  const userId = user?.uid || "user123";
  const [current, setCurrent] = useState(0);
  const [ratings, setRatings] = useState<{ movieId: number; rating: number }[]>(
    movies.map((m) => ({ movieId: m.movieId, rating: 0 }))
  );

  const handleRatingChange = (val: number) => {
    setRatings((prev) =>
      prev.map((r, idx) =>
        idx === current ? { ...r, rating: val } : r
      )
    );
  };

  const handleSubmit = async () => {
    // Backend call
    const response = await fetch("http://127.0.0.1:8000/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, ratings }),
  });
    const result = await response.json();
    console.log("Ratings submitted:", { userId, ratings });
    console.log("Backend result:", result);
    navigate("/thankyou");
  };

  if (!userLoggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <button className="button" onClick={() => navigate("/login")}>Login</button>
        <button className="button" onClick={() => navigate("/register")} style={{ marginLeft: "1rem" }}>Register</button>
      </div>
    );
  }

  const movie = movies[current];

  return (
    
    <div style={{ maxWidth: 400, margin: "4rem auto", textAlign: "center" }}>
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Welcome{userEmail ? `, ${userEmail}` : ''}!</h2>
        <button onClick={handleLogout} style={{ marginTop: '2rem' }}>
          Logout
        </button>
      </div>
      <h2>Rate Movies</h2>
      <div style={{ margin: "2rem 0" }}>
        <div><strong>Movie Name:</strong> {movie.name}</div>
        <div><strong>Movie ID:</strong> {movie.movieId}</div>
        <div style={{ margin: "1rem 0" }}>
          <label>
            <strong>Rating (1-5): </strong>
            <input
              type="number"
              min={1}
              max={5}
              value={ratings[current].rating || ""}
              onChange={e => handleRatingChange(Number(e.target.value))}
              style={{ width: 60, marginLeft: 8 }}
            />
          </label>
        </div>
      </div>
      <div>
        <button
          onClick={() => setCurrent((c) => c - 1)}
          disabled={current === 0}
          style={{ marginRight: 16 }}
        >
          Previous
        </button>
        {current < movies.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            disabled={ratings[current].rating < 1 || ratings[current].rating > 5}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={ratings.some(r => r.rating < 1 || r.rating > 5)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
