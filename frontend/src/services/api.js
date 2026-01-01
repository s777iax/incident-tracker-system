const API_URL = "http://localhost:3000";

const getToken = () => localStorage.getItem('token');

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }

  return data;
}

export async function register(email, password) {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Registration failed');
  }

  return data;
}

export async function getIncidents() {
  const user = JSON.parse(localStorage.getItem('user'));

  const endpoint =
    user.role === 'admin' ? '/incidents/admin' : `/incidents/mine`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch incidents');
  }

  return data;
}

export async function getIncidentById(id) {
  const user = JSON.parse(localStorage.getItem('user'));

  const endpoint =
    user.role === 'admin' ? `/incidents/admin/${id}` : `/incidents/mine/${id}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch incident');
  }

  return data;
}

export async function updateIncidentStatus(id, status) {
  const res = await fetch(`${API_URL}/incidents/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to update incident status');
  }

  return data;;
}

export async function generateAiSummary(id) {
  const res = await fetch(`${API_URL}/incidents/${id}/ai-summary`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to generate AI summary');
  }

  return data;
}    

export async function createIncident(title, description) {
  const res = await fetch(`${API_URL}/incidents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ title, description }),
  });

  const data = await res.json();

  console.log(data);

  if (!res.ok) {
    throw new Error(data.error || 'Failed to create incident');
  }

  return data;
}