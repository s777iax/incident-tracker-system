import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { getIncidentById, updateIncidentStatus, generateAiSummary } from '../services/api.js';

export default function IncidentDetails() {
    const [incidentDetails, setIncidentDetails] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";
    const { id } = useParams();

    const statusOptions = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];

    useEffect(() => {
        try {
            const fetchIncidentDetails = async () => {
                const data = await getIncidentById(id);
                setIncidentDetails(data);
            };
            fetchIncidentDetails();

        } catch (error) {
            console.error("Error fetching incident:", error);
        }
    }, []);

    const handleStatusUpdate = async (newStatus) => {
        try {
            if (newStatus === incidentDetails.status) return;

            setSuccessMessage(null);

            await updateIncidentStatus(id, newStatus);
            setIncidentDetails((prevDetails) => ({
                ...prevDetails,
                status: newStatus,
            }));

            setSuccessMessage("Status updated successfully.");
        } catch (error) {
            console.error("Error updating status:", error);
        };
    };

    const handleGenerateAiSummary = async () => {
        setLoading(true);
        try {
            const summary = await generateAiSummary(id);
            setIncidentDetails((prevDetails) => ({
                ...prevDetails,
                ai_summary: summary.ai_summary,
            }));
            setLoading(false);

        } catch (error) {
            console.error("Error generating AI summary:", error);
        }
    };

    return (
        <div>
            <button onClick={() => navigate("/incidents")}>Back</button>
            <h1>Incident Report System</h1>

            {!incidentDetails ? (
                <p>Loading incident details...</p>
            ) : (
                <div
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '10px 0'
                    }}
                >
                    <h3>{incidentDetails.title}</h3>
                    <p>Description: {incidentDetails.description}</p>

                    <div>
                        <strong>Status:</strong>{" "}
                        {isAdmin ? (
                            <select
                                value={incidentDetails.status}
                                onChange={(e) => handleStatusUpdate(e.target.value)}
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span>{incidentDetails.status}</span>
                        )}
                    </div>

                    <small>
                        Created at:{" "}
                        {new Date(incidentDetails.created_at).toLocaleString()}
                    </small>

                    {isAdmin &&
                        (incidentDetails.ai_summary ?
                            (<p>AI Summary: {incidentDetails.ai_summary}</p>) : (
                                <button onClick={handleGenerateAiSummary}>Generate AI Summary</button>

                            ))}
                    {loading && <p>Generating AI summary...</p>}
                    {successMessage && <p>{successMessage}</p>}
                </div>
            )}
        </div>
    );
}