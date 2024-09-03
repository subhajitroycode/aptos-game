
# Rock Paper Scissors Lizard Spock - Aptos Blockchain Game

Welcome to the Rock Paper Scissors Lizard Spock game built on the Aptos blockchain! This fun and engaging game extends the classic Rock Paper Scissors with two additional moves: Lizard and Spock.

## Quick Links

- **Live Site**: [Play the game here](https://your-live-site-url.com)
- **Video Demo**: [Watch how to play](https://your-video-demo-url.com)
- **Contract Address**: [`0x24520160f6fec0a0ecf2a522c4538f34f7bc37927d89387d75b40157be335624`](https://explorer.aptoslabs.com/account/0x24520160f6fec0a0ecf2a522c4538f34f7bc37927d89387d75b40157be335624?network=testnet)

## Game Overview

This game is implemented as a decentralized application (dApp) on the Aptos blockchain. Players can compete against a computer opponent (affectionately named "Sheldon Cooper") in this extended version of the classic game.

### Game Rules

The game follows these rules:
- Scissors cuts Paper
- Paper covers Rock
- Rock crushes Lizard
- Lizard poisons Spock
- Spock smashes Scissors
- Scissors decapitates Lizard
- Lizard eats Paper
- Paper disproves Spock
- Spock vaporizes Rock
- Rock crushes Scissors

## Features

- Connect your Aptos wallet to play (In this case [Petra Wallet](https://petra.app/))
- Start and stop games at will
- Choose your move from Rock, Paper, Scissors, Lizard, or Spock
- Compete against a computer opponent
- View game results and running scores
- Blockchain-based game logic and score tracking from past games

## Technical Stack

- Frontend: React with TypeScript
- Blockchain: Aptos
- Smart Contract: Move language
- Wallet Integration: Aptos Wallet Adapter

## How to Play

1. Connect your wallet.
2. Click "Start Game" to begin a new game session & approve the transaction.
3. Choose your move by clicking on one of the five options.
4. The computer (Sheldon) will make its move.
5. The result will be displayed, and scores will be updated.
6. Continue playing or click "Stop Game" to end the session.

## Project Structure

- `App.tsx`: Main application component
- `ConnectedView.tsx`: Game interface and logic
- `RockPaperScissorsLizardSpock.move`: Smart contract for game logic and score tracking

## Smart Contract

The game's core logic and score tracking are implemented in the `RockPaperScissorsLizardSpock.move` smart contract. This contract handles:

- Game creation
- Move validation
- Result determination
- Score tracking


Enjoy playing Rock Paper Scissors Lizard Spock on the Aptos blockchain!
