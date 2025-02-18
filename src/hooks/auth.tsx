import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Employe {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: Employe;
}

interface SignInCredentials {
  email: string;
}

interface AuthContextData {
  user: Employe;
  signIn(Credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Support:token');
    const user = localStorage.getItem('@Support:user');

    if (token && user) {
      // api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email }) => {
    console.log('passou aqui');
    const response = await api.post('/employes/session', {
      email,
    });

    const { token, employe } = response.data;

    localStorage.setItem('@Support:token', token);
    localStorage.setItem('@Support:user', JSON.stringify(employe));

    // api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user: employe });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Support:token');
    localStorage.removeItem('@Support:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
