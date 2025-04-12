# Minimal Reproducible Example

This is a minimal example showing how to use the `@dripfi/drip-sdk` with React and Wagmi.

## Features

- Wallet connection using Wagmi
- DripSdk initialization
- Fetching and displaying loyalty card data

## Prerequisites

- Node.js installed
- A Web3 wallet (like MetaMask) installed in your browser

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to the displayed URL (usually `http://localhost:5173`)

4. Connect your wallet:
   - Click the "Connect Wallet" button
   - Approve the connection in your wallet
   - The app will automatically fetch and display your loyalty card data if available

## Tech Stack

- React + Vite
- TypeScript
- Wagmi (for wallet connection)
- @dripfi/drip-sdk (for DeFi functionality)
- ethers.js (for blockchain interaction)
