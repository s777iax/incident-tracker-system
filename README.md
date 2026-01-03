# Incident Tracker System
A role-based incident reporting web application that allows users to submit incident reports and administrators to monitor, prioritise, and manage incidents through a dashboard interface.

## Demo

- **User & Admin POV Demo:**

https://github.com/user-attachments/assets/de69bf94-d86f-44e1-889c-f320636be79d


## Features

### User
- Secure login and registration
- Submit new incident reports
- View submitted incidents and their status
- Clear severity indicators for each incident

### Admin
- Admin-only dashboard with incident summary cards
- View latest reported incidents
- Identify and prioritise high-severity incidents
- Generate AI-powered incident summaries
- Update incident status (Open / In Progress / Resolved)

## Tech Stack

**Frontend**
- React
- React Router
- CSS

**Backend**
- Node.js
- Express
- PostgreSQL

**Other**
- JWT Authentication
- AI text summarisation API

## How It Works

- Users authenticate using JWT-based authentication.
- Incident data is stored in a PostgreSQL database.
- Role-based access control ensures different views for users and admins.
- Admins have access to a dashboard that provides a high-level overview of incident statuses and recent reports.
- AI-generated summaries help admins quickly understand reported incidents.

## Design Decisions

- The dashboard focuses on high-level visibility rather than detailed charts to keep the interface clean and actionable.
- Recent incidents are limited to a small number to avoid clutter.
- Authentication redirects perform a full redirect to ensure a clean application state after login and logout.
- Severity levels are visually highlighted to help administrators prioritise incidents quickly.

## Notes

This project was built as a full-stack portfolio application to demonstrate role-based access control, real-world workflows, and clean system design.


