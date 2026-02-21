# PeerPump

## Overview

PeerPump is a Twitter/X-styled social media frontend for cryptocurrency token discovery and reputation. Users can post token contract addresses (CAs), which are then enriched with token metadata (name, symbol, price, market cap). Other users can endorse (repost), like, or dislike token posts. A reputation/rating system tracks user credibility based on the quality of their token calls.

The app is a client-side React SPA with no backend server — all data is stored in-memory within a simulated blockchain module. There is no database or persistent storage currently.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bootstrapped with Create React App (react-scripts)
- **Routing**: React Router v6 with `BrowserRouter` — two routes: Home (`/`) and Profile (`/profile`)
- **Styling**: Plain CSS with CSS custom properties (dark theme mimicking X/Twitter's design)
- **Dev server port**: Configured to run on port 5000 via the `PORT=5000` environment variable in the start script

### Project Structure
```
src/
├── App.tsx              # Root component with routing and layout
├── index.tsx            # Entry point, renders App
├── styles.css           # Global styles (dark Twitter/X theme)
├── blockchain/
│   └── chain.ts         # In-memory data layer simulating a blockchain
└── pages/
    ├── Home.tsx          # Feed page — post CAs, view/vote on posts
    └── Profile.tsx       # User profile with rating and post history
```

### Data Layer (`src/blockchain/chain.ts`)
- **No real database** — all state lives in module-scoped variables (`chain` array and `ratings` object)
- Data is lost on page refresh
- Exports functions: `addPost`, `getPosts`, `endorse`, `vote`, `simulateLifecycle`, `getRating`, `updateRating`, `fetchTokenDetails`
- Token metadata is currently mocked (returns random prices/mcap with DiceBear identicon avatars)
- A `simulateLifecycle` function runs on a 10-second interval to simulate chain activity

### Key Data Model
- **TokenPost**: id, contractAddress, poster, timestamp, endorsements[], likes[], dislikes[], priceAtPost, metadata
- **TokenMetadata**: name, symbol, price, mcap, image
- **Ratings**: Simple key-value map of user → numeric rating (default 20)

### Authentication
- No real authentication — the Home page generates a random anonymous user ID (`anon_XXX`), and the Profile page uses a hardcoded user `"LexLuthor"`
- No wallet connection is implemented despite ethers.js being a dependency

### Blockchain/Web3
- **ethers.js v6** is listed as a dependency but does not appear to be actively used yet
- The `blockchain/chain.ts` module is a mock/simulation, not connected to any real blockchain
- Token metadata fetching is mocked — designed to eventually connect to Trac Explorer or CoinGecko APIs

### Important Notes for Development
- The `chain.ts` file appears to be incomplete/truncated — the `fetchTokenDetails` function is missing its closing brace, and exported functions `addPost`, `getPosts`, `endorse`, `vote`, `simulateLifecycle` are referenced in pages but not defined in the visible code
- The `Home.tsx` and `Profile.tsx` files are also truncated — JSX is incomplete
- TypeScript strict mode is enabled
- No `noEmit` is set in tsconfig, and `outDir` is not specified — CRA handles compilation internally

## External Dependencies

### NPM Packages
| Package | Purpose |
|---------|---------|
| react, react-dom | UI framework |
| react-router-dom | Client-side routing |
| react-scripts | CRA build toolchain (Webpack, Babel, etc.) |
| ethers | Ethereum/Web3 library (not yet actively used) |
| uuid | Generating unique post IDs |
| typescript | Type checking |

### External Services
- **DiceBear API** (`api.dicebear.com`): Used for generating identicon/pixel-art avatar images from seeds
- **Unsplash** (`images.unsplash.com`): Profile banner placeholder image
- **ibb.co** (`i.ibb.co`): Profile avatar image hosting
- **Trac Explorer / CoinGecko**: Referenced in comments as intended token metadata sources, but not yet implemented

### No Backend Services
- No server, no database, no API endpoints
- If persistent storage is needed, a backend with a database (e.g., PostgreSQL with Drizzle) would need to be added