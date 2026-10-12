# CalcFlow Frontend

## Overview
CalcFlow Frontend is the React application that provides the calculator UI and communicates with the Spring Boot API. It handles user input, validation, theme switching, and calculation history display.

## Features
- Responsive calculator UI
- Arithmetic and scientific functions
- Theme toggle for light/dark mode
- Calculation history panel
- Loading and error states
- Keyboard support
- Axios-based backend communication

## Stack
- React 18
- JavaScript
- Vite
- Axios
- Vitest
- React Testing Library
- CSS3

## Project Structure
- `src/components` — reusable UI pieces
- `src/services` — API integration layer
- `src/styles` — global styling
- `src/test` — frontend tests
- `src/App.jsx` — app composition
- `src/main.jsx` — entry point

## Prerequisites
- Node.js 18+
- npm
- Running backend at `http://localhost:8080`

## Environment Setup
Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Set:
```bash
VITE_API_BASE_URL=/api/v1
CALCFLOW_BACKEND_URL=http://localhost:8080
```

The Vite development server proxies `/api` requests to `CALCFLOW_BACKEND_URL`, avoiding cross-origin browser requests. If the backend runs on a different port, update `CALCFLOW_BACKEND_URL` and restart Vite.

## Run the app
```bash
npm install
npm run dev
```

## Testing
```bash
npm test
```

## Build
```bash
npm run build
```

## Backend integration
This frontend depends on the backend repository. The backend is the source of truth for expression evaluation and history persistence.

## Known limitations
- The UI is intentionally simple and readable for learning
- Real backend connectivity is required for end-to-end evaluation
