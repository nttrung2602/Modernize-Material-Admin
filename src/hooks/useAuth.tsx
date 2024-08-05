import { useState, useEffect } from 'react';

interface User {
  loggedIn: boolean;
  email: string;
}

const getAuthenticatedUser = (): User => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.email ? { loggedIn: true, email: user.email } : { loggedIn: false, email: '' };
};

const useAuth = (): User => {
  const [auth, setAuth] = useState<User>({ loggedIn: false, email: '' });

  useEffect(() => {
    const user = getAuthenticatedUser();
    setAuth(user);
  }, []);

  return auth;
};

export { useAuth };
