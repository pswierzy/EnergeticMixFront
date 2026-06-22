# EnergeticMix Frontend

React-based frontend application for visualizing clean energy intensity analysis and consumption optimization.

## Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Language**: TypeScript

## Configuration

The application requires the API base URL to be defined in the environment variables.

Create a `.env` file in the root directory i.e.:

```env
VITE_API_BASE_URL=http://localhost:8080/api/energy
```

## Installation and Running

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

## Backend

Code for backend can be found [HERE](https://github.com/pswierzy/EnergeticMixServer).
