import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, []);

    async function fetchUser() {
        try {
            const response = await fetch('/api/auth/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                // Token invalid
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
        } catch {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    async function login(email, password) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);

        return data;
    }

    async function register(name, email, password, passwordConfirmation) {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);

        return data;
    }

    async function logout() {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
        } catch {
            // ignore
        }

        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
