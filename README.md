# Research Hub

A full-stack MERN application for research collaboration with document sharing, discussions, progress tracking, and citation management.

## Features

- **Research Groups** – Create and manage research groups with members
- **Document Sharing** – Upload and manage research documents
- **Discussion Board** – Threaded discussions with replies
- **Progress Tracker** – Milestone-based progress tracking with visual bars
- **Citation Manager** – Store and manage academic citations

## Architecture

```
research-hub/
├── server/
│   ├── config/db.js
│   ├── models/
│   │   ├── ResearchGroup.js
│   │   ├── Document.js
│   │   ├── Discussion.js
│   │   ├── Progress.js
│   │   └── Citation.js
│   ├── routes/
│   │   ├── groups.js
│   │   ├── documents.js
│   │   ├── discussions.js
│   │   ├── progress.js
│   │   └── citations.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── client/
│   ├── public/index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── Navbar.js
│   │       ├── GroupList.js
│   │       ├── DocumentViewer.js
│   │       ├── DiscussionBoard.js
│   │       ├── ProgressTracker.js
│   │       └── CitationManager.js
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/groups | List groups |
| POST   | /api/groups | Create group |
| DELETE | /api/groups/:id | Delete group |
| GET    | /api/documents | List documents |
| POST   | /api/documents | Upload document |
| DELETE | /api/documents/:id | Delete document |
| GET    | /api/discussions | List discussions |
| POST   | /api/discussions | Create discussion |
| POST   | /api/discussions/:id/reply | Reply to discussion |
| GET    | /api/progress | List milestones |
| POST   | /api/progress | Add milestone |
| PUT    | /api/progress/:id | Update milestone |
| GET    | /api/citations | List citations |
| POST   | /api/citations | Add citation |
| DELETE | /api/citations/:id | Delete citation |

## Usage

1. Start MongoDB on port 27017
2. `cd server && npm install && npm run seed && npm start`
3. `cd client && npm install && npm start`
4. Open `http://localhost:3000`
