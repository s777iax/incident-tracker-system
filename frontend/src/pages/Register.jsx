import { useState } from 'react';
import { register } from '../services/api.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('All fields required.');
            return;
        }

        try {
            const data = await register(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = "/incidents";
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogin = () => {
        window.location.href = "/login";
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
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

                <button type="submit">Register</button>
            </form>
        </div>
    );
}