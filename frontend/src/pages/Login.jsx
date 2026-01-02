import { useState } from 'react';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { login } from '../services/api.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [passwordType, setPasswordType] = useState("password");
    const [showPassword, setShowPassword] = useState(false);

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

    const togglePasswordVisibility = () => {
        if (passwordType === "password") {
            console.log("show password");
            setPasswordType("text");
            setShowPassword(true);
        } else {
            console.log("hide password");
            setPasswordType("password");
            setShowPassword(false);
        }
    };


    return (
        <div className="login-page">
            <button onClick={handleSignUp} className="sign-up-btn">Sign Up</button>
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="input-group">
                        <EmailOutlinedIcon
                            className="icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <LockOutlinedIcon
                            className="icon" />
                        <input
                            type={passwordType}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!showPassword ?
                            <VisibilityOffOutlinedIcon
                                className="icon"
                                onClick={togglePasswordVisibility} /> :
                            <VisibilityOutlinedIcon
                                className="icon"
                                onClick={togglePasswordVisibility} />
                        }
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type="submit" className="action-btn">Login</button>
                </form>
            </div>
        </div>
    );
}