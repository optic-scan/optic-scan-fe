import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

export default function RedirectIfAuthenticated({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const req = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const res = await req.json();

        if (req.status === 200) {
          setAuthenticated(res.authenticated);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return null;
  }

  return authenticated ? <Navigate to='/dashboard/home' replace /> : children;
}
