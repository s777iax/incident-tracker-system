import { useState } from 'react';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { register } from '../services/api.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [passwordType, setPasswordType] = useState("password");
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="sign-up-page">
            <button onClick={handleLogin} className="login-btn">Login</button>
            <div className="sign-up-container">
                <form onSubmit={handleRegister}>
                    <h2>Register</h2>
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
                    <button type="submit" className='action-btn'>Register</button>
                </form>
            </div>
        </div>
    );
}