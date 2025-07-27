import React, { useState, useEffect, type ReactNode, useContext } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase/firebase'; 

type AuthContextType = {
  user: User | null;
  userLoggedIn: boolean;
  userEmail: string;
  loading: boolean;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {}
  const [user, setUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, initializeUser);
return unsubscribe;
  }, []);

    async function initializeUser(user: User | null) {
    if (user) {
      setUser(user);
      setUserEmail(user.email || "");
      setUserLoggedIn(true);
    } else {
      setUser(null);
      setUserEmail("");
      setUserLoggedIn(false);
    }
    setLoading(false);
  }
      setUserLoggedIn(true);
const value: AuthContextType = {
    user,
    userLoggedIn,
    userEmail,
    loading,
}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
