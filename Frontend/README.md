# Frontend - Gig Freelance Platform

This folder is set up to contain the frontend application for the Gig Freelance Platform.

## Getting Started

### Adding Your Frontend Files

You can add your frontend files to this folder from VSCode or any other editor. The backend is configured to accept requests from a frontend running on `http://localhost:5173` (default Vite port).

### Recommended Structure

A typical frontend structure for this application might look like:

```
Frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js (or other bundler config)
└── README.md
```

## Backend API Endpoints

The backend provides the following API endpoints:

- **Authentication**: `/api/auth/*`
- **Gigs**: `/api/gigs/*`
- **Bids**: `/api/bids/*`

Backend runs on: `http://localhost:5000` (default)

## Environment Configuration

Make sure to create a `.env` file in your frontend folder with:

```env
VITE_API_URL=http://localhost:5000
# or for other frameworks:
REACT_APP_API_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Features to Implement

Based on the backend, your frontend should support:

1. **Authentication**
   - User registration
   - User login/logout
   - JWT token management

2. **Gig Management**
   - Create, read, update, delete gigs
   - Browse available gigs
   - Search and filter gigs

3. **Bidding System**
   - Submit bids on gigs
   - View bid status
   - Manage bids

4. **Real-time Features**
   - Socket.IO integration for real-time notifications
   - Live bid updates

## Getting Help

- Backend Documentation: Check the Backend folder for API details
- Issues: Report any issues on the GitHub repository
