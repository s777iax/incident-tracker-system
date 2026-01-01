import { useState } from 'react';
import { login } from '../services/api.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('All fields required.');
            return;
        }

        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = "/incidents";
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignUp = () => {
        window.location.href = "/register";
    };

    return (
        <div>
            <button onClick={handleSignUp}>Sign Up</button>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
}