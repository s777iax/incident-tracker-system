import { useEffect, useState } from 'react';
import { getIncidents } from '../services/api.js';

export default function Dashboard() {
    const [incidents, setIncidents] = useState([]);

    const fetchIncidents = async () => {
        try {
            const data = await getIncidents();
            setIncidents(data);
        } catch (error) {
            console.error("Error fetching incidents:", error);
        }
    };

    useEffect(() => {
        fetchIncidents();
    }, []);

    const openStatus = incidents.filter(incident => incident.status === 'OPEN').length;
    const inProgressStatus = incidents.filter(incident => incident.status === 'IN_PROGRESS').length;
    const resolvedStatus = incidents.filter(incident => incident.status === 'RESOLVED').length;

    const latestIncidents = [...incidents]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);

    return (
        <div className="dashboard-page">
            <div className="dashboard-cards">
                <div className="dashboard-card total">
                    <p>Total Incidents</p>
                    <h2>{incidents.length}</h2>
                </div>
                <div className="dashboard-card open">
                    <p>Open</p>
                    <h2>{openStatus}</h2>
                </div>

                <div className="dashboard-card progress">
                    <p>In Progress</p>
                    <h2>{inProgressStatus}</h2>
                </div>

                <div className="dashboard-card resolved">
                    <p>Resolved</p>
                    <h2>{resolvedStatus}</h2>
                </div>
            </div>
            <div className="latest-incidents">
                <h2>Latest Reports</h2>

                {latestIncidents.map((incident) => (
                    <div
                        key={incident.incident_id}
                        className="incident-container"
                        onClick={() => navigate(`/incidents/${incident.incident_id}`)}
                    >
                        <div className="incident-header">
                            <h3>{incident.title}</h3>
                            <div className={`severity severity-${incident.severity.toLowerCase()}`}>
                                <span className="severity-dot"></span>
                                <span>{incident.severity}</span>
                            </div>
                        </div>
                        <p>{incident.description}</p>
                        <p>
                            {incident.status.replace("_", " ")}
                        </p>
                        <p className="text-date">{new Date(incident.created_at).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
