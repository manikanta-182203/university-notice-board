# University Notice Board

A responsive React application that fetches university notices from a local JSON Server API.

## Features
- React + Vite frontend
- JSON Server REST API (`db.json`)
- Fetch and refresh notices from the server
- Search by title, description, department, or category
- Filter by category
- Important notice labels
- Responsive desktop and mobile layout
- Sample notices included so it works immediately

## Requirements
Install Node.js LTS from https://nodejs.org/ and restart your terminal after installation.

## Run the project in VS Code
1. Extract the ZIP file.
2. Open VS Code.
3. Select **File → Open Folder** and choose the `university-notice-board` folder.
4. Open **Terminal → New Terminal**.
5. Run `npm install` and wait for it to finish.
6. Run `npm run dev`.
7. Open the frontend address shown in the terminal (normally http://localhost:5173).
8. JSON Server runs at http://localhost:3001/notices. You can open that URL to see the JSON API.

Keep the terminal running while using the website. The `npm run dev` command starts both the React app and JSON Server.

## Edit notices
Open `db.json`. Add or edit items inside the `notices` array. Save the file and refresh the site. Each notice has:
- `id`: unique string
- `title`: notice title
- `category`: Examinations, Events, Campus, Scholarships, or Sports
- `department`: publishing department
- `date`: YYYY-MM-DD
- `priority`: Normal or Important
- `description`: notice content

JSON Server also exposes a REST API. For example, `GET http://localhost:3001/notices`.

## Push to GitHub
1. Sign in at https://github.com/ and create a **new repository** named `university-notice-board`.
2. Do not initialize it with a README if you plan to push this existing project.
3. In VS Code, open the project terminal and run these commands one by one:

```bash
git init
git add .
git commit -m "Create university notice board app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/university-notice-board.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If Git asks you to sign in, complete the browser sign-in prompt.

## Troubleshooting
- If `npm` is not recognized, install Node.js LTS and restart VS Code.
- If the website says it cannot connect, check that `npm run dev` is still running and that port 3001 is not being used by another app.
- If `git` is not recognized, install Git from https://git-scm.com/downloads and restart VS Code.
- This starter uses a **local JSON Server**. It runs on your computer and is not automatically a public API after deploying the frontend. To make the live site work for everyone, deploy the JSON Server/API separately and update `API_URL` in `src/App.jsx` to the deployed API URL.
