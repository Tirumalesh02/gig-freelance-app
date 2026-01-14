# Quick Start Guide

## Adding Your Frontend Files from VSCode

### Method 1: Copy/Paste Your Existing Files (Recommended)

1. **Open your local frontend project** in VSCode
2. **Select all your frontend files** (Ctrl+A or Cmd+A)
3. **Copy them** (Ctrl+C or Cmd+C)
4. **Navigate to this Frontend folder** in your file system
5. **Paste the files** (Ctrl+V or Cmd+V)
6. **Commit and push** to this repository:
   ```bash
   git add Frontend/
   git commit -m "Add frontend files"
   git push
   ```

### Method 2: Create a New React + Vite App

If you're starting fresh:

```bash
# From the project root
cd /path/to/gig-freelance-app

# Remove the Frontend folder
rm -rf Frontend

# Create new Vite + React app
npm create vite@latest Frontend -- --template react

# Install dependencies
cd Frontend
npm install

# Install required packages for the backend integration
npm install axios socket.io-client react-router-dom

# Copy the template files as reference
# (They're available in this repo if you need them)
```

### Method 3: Clone from Another Repository

If your frontend is in a separate Git repository:

```bash
cd /path/to/gig-freelance-app

# Remove the Frontend folder
rm -rf Frontend

# Clone your frontend repo
git clone <your-frontend-repo-url> Frontend

# Remove the git history to integrate with main repo
cd Frontend
rm -rf .git
```

## After Adding Files

1. **Create `.env` file** in Frontend folder:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

2. **Install dependencies**:
   ```bash
   cd Frontend
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Start the backend** (in another terminal):
   ```bash
   cd Backend
   npm install
   npm run dev
   ```

5. **Open your browser**: http://localhost:5173

## Need More Details?

- See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed setup
- See [README.md](./README.md) for project overview
- Check template files for configuration examples:
  - `package.json.template` - Dependencies
  - `vite.config.js.template` - Vite configuration with proxy

## Backend Integration

The backend expects:
- Frontend URL: `http://localhost:5173`
- API endpoints: `http://localhost:5000/api/*`
- Socket.IO: `http://localhost:5000/socket.io`

Make sure both servers are running for full functionality!
