# Frontend Setup Instructions

## Quick Start

Follow these steps to add your frontend files to this folder:

### Option 1: Using VSCode

1. Open VSCode
2. Navigate to your local frontend project files
3. Copy all your frontend files
4. Paste them into this `Frontend` folder

### Option 2: Using Git

If your frontend files are in a separate repository:

```bash
# Navigate to the Frontend folder
cd Frontend

# If you have a separate frontend repo, you can copy files:
# Method 1: Clone temporarily and copy files
git clone <your-frontend-repo-url> temp_frontend
cp -r temp_frontend/* .
rm -rf temp_frontend

# Method 2: Add as git subtree (advanced)
git subtree add --prefix=Frontend <your-frontend-repo-url> main --squash
```

### Option 3: Create New React App with Vite

If you're starting fresh:

```bash
# Navigate to the project root
cd /path/to/gig-freelance-app

# Remove the empty Frontend folder
rm -rf Frontend

# Create new Vite React app
npm create vite@latest Frontend -- --template react

# Navigate to Frontend and install dependencies
cd Frontend
npm install

# Install additional dependencies for the project
npm install axios socket.io-client react-router-dom
```

## After Adding Files

1. **Install Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file in the Frontend folder:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Verify Backend Connection**
   - Make sure the backend is running on `http://localhost:5000`
   - Test API endpoints from your frontend

## File Structure Recommendations

Organize your files like this:

```
Frontend/
├── public/              # Static files
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   │   ├── auth/
│   │   ├── gigs/
│   │   └── bids/
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── GigList.jsx
│   │   └── GigDetail.jsx
│   ├── services/       # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── gigService.js
│   │   └── bidService.js
│   ├── context/        # React Context
│   │   └── AuthContext.jsx
│   ├── hooks/          # Custom hooks
│   │   └── useAuth.js
│   ├── utils/          # Utility functions
│   │   └── socket.js
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Frontend documentation
```

## Connecting to Backend

### API Service Example

Create `src/services/api.js`:

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### Socket.IO Connection Example

Create `src/utils/socket.js`:

```javascript
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const connectSocket = (userId) => {
  socket.connect();
  socket.emit('join', userId);
};

export const disconnectSocket = () => {
  socket.disconnect();
};
```

## Common Issues

### CORS Errors
If you see CORS errors, make sure:
- Backend is running
- Backend `.env` has correct `FRONTEND_URL` setting
- You're using `withCredentials: true` in axios

### Port Conflicts
If port 5173 is already in use:
- Change the port in `vite.config.js`
- Update backend's `FRONTEND_URL` environment variable

### Module Not Found
If you see module errors:
- Run `npm install` in the Frontend folder
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

## Need Help?

- Check Backend/README.md for API documentation
- Review Backend/routes/ for available endpoints
- Create an issue on GitHub for bugs or questions
