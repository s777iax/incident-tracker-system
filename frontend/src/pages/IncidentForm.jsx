import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { createIncident } from '../services/api.js';

export default function IncidentForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            setError('All fields required.');
            return;
        }

        try {
            await createIncident(title, description);
            setTitle('');
            setDescription('');
            window.location.href = "/incidents";
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="incident-form-page">
            <div className="back-icon-container" onClick={() => navigate("/incidents")}>
                <ArrowBackIosIcon
                    className="icon" />
                <p>Back</p>
            </div>
            <div className="incident-form-container">
                <h2>New Incident</h2>
                <form onSubmit={handleSubmit}>
                    <div className="incident-input-group">
                        <p className="input-hint">Short summary of the incident</p>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="incident-input-group">
                        <p className="input-hint">Briefly describe the incident</p>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p>{error}</p>}
                    <button type="submit" className="action-btn">Create Incident</button>
                </form>
            </div>
        </div>
    );
}