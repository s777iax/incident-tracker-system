import { useState } from 'react';
import { useNavigate } from "react-router-dom";

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
        <div>
            <button onClick={() => navigate("/incidents")}>Back</button>
            <form onSubmit={handleSubmit}>
                <h2>Create Incident</h2>
                <div>
                    <label>Title: </label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                {error && <p>{error}</p>}
                <button type="submit">Create Incident</button>
            </form>
        </div>
    );
}