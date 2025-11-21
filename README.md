MERN Bug Tracker – Testing & Debugging Assignment

A full-stack bug tracking application built with the MERN stack to demonstrate comprehensive testing strategies and debugging techniques as part of Week 6 coursework.


📋 Features

✅ Report new bugs with title and description
✅ View all reported bugs in a responsive list
✅ Update bug status: open → in-progress → resolved
✅ Delete bugs permanently
✅ Real-time UI updates with safe error handling
✅ Full test coverage (unit + integration)
✅ Graceful error boundaries (frontend + backend)


🛠️ Tech 

Frontend
React 19, Vite, Tailwind CSS
React Testing Library, Jest, jest-environment-jsdom
Error Boundary for crash resilience

Backend
Node.js, Express, MongoDB (Mongoose)
MongoDB Atlas (cloud database)
Supertest, mongodb-memory-server (for future expansion)

Tooling & Testing
Jest (multi-project config with projects)
Babel (@babel/preset-react) for JSX/ESM transformation
ESM ("type": "module") throughout
VS Code, Git, GitHub


🚀 Getting Started

Prerequisites
Node.js v18+
npm
MongoDB Atlas account

Installation

1. Clone the repository
bash
git clone https://github.com/your-username/mern-bug-tracker.git
cd mern-bug-tracker

2. Install root dependancies for testing
bash
npm install

3. Set up the backend
bash
cd server
npm install

4. Create .env in server/
PORT=5000
MONGODB_URI=mongodb+srv://bugtracker_user:DEskU5cF5iFq73wY@cluster001.s73jjfw.mongodb.net/?appName=Cluster001
NODE_ENV=development

5. Set up the frontend
bash
cd client
npm install

6. Start the servers
*Terminal 1 (Backend):
bash
cd server && npm run dev

*Terminal 2 (Frontend):
bash
cd client && npm run dev

7. Open the app
Visit: http://localhost:5173


🧪 Testing

Run All Tests
bash
npm test

Run Unit Tests
bash
npm run test:unit

Run Integration Tests
bash
npm run test:integration

Generate Covergage Report
bash
npm test -- --coverage


🐞 Debugging Techniques Used

Frontend
*Error Boundary: Catches rendering errors and shows fallback UI
*Chrome DevTools:
Inspected component state and props
Monitored network requests to /api/bugs
Debugged event handlers (addBug, deleteBug)
*Safe Fetch Handling: Uses res.ok and res.text() fallback to prevent .json() crashes
*Loading/Error States: Clear UI feedback during async operations

Backend
*Express Error Middleware: Centralized error handling with JSON responses
*MongoDB Atlas Connection Validation: Early exit if MONGODB_URI is missing
*Node.js Inspector: Used node --inspect for server-side debugging
*Intentional Bugs Introduced & Fixed:
Missing validation on empty bug title
Async/await error propagation issues
Incorrect status code on delete


📂 Project Structure

mern-bug-tracker/
├── client/                  
│   ├── src/
│   │   ├── components/       
│   │   └── tests/           
│   ├── vite.config.js       
│   └── index.html
├── server/                  
│   ├── src/
│   │   ├── models/Bug.js
│   │   ├── routes/bugs.js
│   │   └── middleware/errorHandler.js
│   └── .env                 
├── jest.config.js           
├── babel.config.json        
└── README.md


📝 Testing 

*Unit Tests: Isolated component logic (e.g., form validation, button behavior)
*Integration Tests: Component + mock API interactions (UI updates on state change)
*ESM Support: Configured Jest with --experimental-vm-modules and @jest/globals
*Mocking: Used jest.fn() for callback verification; identity-obj-proxy for CSS/assets
*Error Resilience: All async calls wrapped in try/catch; safe rendering with Array.isArray()


📸 Screenshots
Bug Form
![Bug Form](screenshots/bug-form.png)


📤 Submission
GitHub Repository:https://github.com/PLP-MERN-Stack-Development/testing-and-debugging-ensuring-mern-app-reliability-Jess-neemo.git

Assignment: Week 6 – Testing and Debugging in MERN Applications