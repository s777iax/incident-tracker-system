import { useEffect, useState } from 'react';
import { getIncidents } from '../services/api.js';
import { useNavigate } from "react-router-dom";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user?.role === "user";

  useEffect(() => {
    try {
      const fetchIncidents = async () => {
        const data = await getIncidents();
        setIncidents(data);
        setFilteredIncidents(data);
      };
      fetchIncidents();
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const filterBySeverity = (severity) => {
    const data = incidents.filter(incident => incident.severity === severity);
    setFilteredIncidents(data);
  };

  return (
    <div className="incidents-page">
      <button onClick={handleLogout} className='logout-btn'>Logout</button>
      <div className='container'>
        <h1>Incident Report System</h1>
        <div>
          <button onClick={() => setFilteredIncidents(incidents)} className="filter-btn">All</button>
          <button onClick={() => filterBySeverity("LOW")} className="filter-btn">Low</button>
          <button onClick={() => filterBySeverity("MEDIUM")} className="filter-btn">Medium</button>
          <button onClick={() => filterBySeverity("HIGH")} className="filter-btn">High</button>
        </div>
        {incidents.length === 0 ? (
          <p>No incidents available.</p>
        ) : (
          filteredIncidents.map((incident) => (
            <div key={incident.incident_id} className='incident-container' onClick={() => navigate(`/incidents/${incident.incident_id}`)}>
              <div className="incident-header">
                <h2>{incident.title}</h2>
                {!isUser && (
                  <div className={`severity severity-${incident.severity.toLowerCase()}`}>
                    <span className="severity-dot"></span>
                    <span>{incident.severity}</span>
                  </div>
                )}

              </div>
              <p>{incident.description}</p>
              <p>
                {incident.status.replace("_", " ")}
              </p>
              <p className="text-date">{new Date(incident.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
        {isUser && (
          <button onClick={() => navigate("/incidents/new")} className="create-incident-btn">
            Create New Incident
          </button>
        )}
      </div>
    </div>
  )
}
