import React, { useState, useEffect, type ReactNode, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase'; 

type AuthContextType = {
  user: any | null; // Or use user: ReturnType<typeof onAuthStateChanged>['user'] | null;
  userLoggedIn: boolean;
  userEmail: string;
  loading: boolean;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null); // Change User to any
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: any | null) { // Change User to any
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

  const value: AuthContextType = {
    user,
    userLoggedIn,
    userEmail,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
