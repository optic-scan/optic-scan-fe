import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function authenticateMe() {
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

        return authenticated ? children : <Navigate to='/login' replace />;
      } finally {
        setIsLoading(false);
      }
    }

    authenticateMe();
  }, [authenticated, children]);

  if (isLoading) {
    return null;
  }

  return authenticated ? children : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
