import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { getIncidentById, updateIncidentStatus, updateIncidentSeverity, generateAiSummary } from '../services/api.js';

export default function IncidentDetails() {
    const [incidentDetails, setIncidentDetails] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";
    const { id } = useParams();

    const statusOptions = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];
    const severityOptions = ['LOW', 'MEDIUM', 'HIGH'];

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

    const handleSeverityUpdate = async (newSeverity) => {
        try {
            if (newSeverity === incidentDetails.severity) return;

            setSuccessMessage(null);

            await updateIncidentSeverity(id, newSeverity);
            setIncidentDetails((prevDetails) => ({
                ...prevDetails,
                severity: newSeverity,
            }));

            setSuccessMessage("Severity updated successfully.");
        } catch (error) {
            console.error("Error updating severity:", error);
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
        <div className="incident-details-page">
            <div className="back-icon-container" onClick={() => navigate("/incidents")}>
                <ArrowBackIosIcon
                    className="icon" />
                <p>Back</p>
            </div>
            <h1>Incident Report System</h1>
            <div className='container'>

                {!incidentDetails ? (
                    <p>Loading incident details...</p>
                ) : (
                    <div className='incident-details-container'>
                        <h3>{incidentDetails.title}</h3>
                        <p>{incidentDetails.description}</p>
                        {isAdmin ? (
                            <div>
                                <div>
                                    <strong>Status:</strong>{" "}
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
                                </div>
                                <div>
                                    <strong>Severity:</strong>{" "}
                                    <select
                                        value={incidentDetails.severity}
                                        onChange={(e) => handleSeverityUpdate(e.target.value)}
                                    >
                                        {severityOptions.map((severity) => (
                                            <option key={severity} value={severity}>
                                                {severity}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <span >{incidentDetails.status.replace("_", " ")}</span>
                        )}
                        <p className="text-date">{new Date(incidentDetails.created_at).toLocaleString()}</p>
                        {successMessage && <p className="text-success">{successMessage}</p>}
                        {isAdmin && (
                            <>
                                {incidentDetails.ai_summary ? (
                                    <div className="ai-summary-section">
                                        <AutoAwesomeIcon style={{ color: '#1976d2' }} />
                                        <div className="ai-summary-details">
                                            <p>{incidentDetails.ai_summary}</p>
                                            <p className="text-ai-generate">AI Generated</p>
                                        </div>
                                    </div>
                                ) : loading ? (
                                    <p className="text-ai-generate">Generating AI summary...</p>
                                ) : (
                                    <button onClick={handleGenerateAiSummary} className="generate-btn"> Generate AI Summary</button>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}