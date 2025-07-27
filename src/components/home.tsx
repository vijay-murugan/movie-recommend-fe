import React from "react";
import { useAuth } from "../contexts/authcontext";

const Home = () => {
  const auth = useAuth();
  return (
    <div>
      <h1>Welcome to the Movie Recommendation App</h1>
      {auth?.userLoggedIn ? (
        <p>Hello, {auth.user?.displayName || "User"}!</p>
      ) : (
        <p>Please log in to see personalized recommendations.</p>
      )}
    </div>
  );
};

export default Home;