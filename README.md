
# Rock Paper Scissors Lizard Spock - Aptos Blockchain Game

Welcome to the Rock Paper Scissors Lizard Spock game built on the Aptos blockchain! This fun and engaging game extends the classic Rock Paper Scissors with two additional moves: Lizard and Spock.

## Quick Links

- **Live Site**: [Play the game here](https://aptos-game-subhajitroycode.netlify.app/)
- **Video Demo**: [Watch how to play](https://x.com/subhajitroycode/status/1830996257541693820)
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

## Technical Details

### Smart Contract Score Tracking

The game's smart contract, implemented in `RockPaperScissorsLizardSpock.move`, handles score tracking through the `GameResult` struct:

```move
struct GameResult has key {
    computer_move: String,
    game_result: String,
    player_score: u64,
    computer_score: u64,
    draws: u64
}
```

This struct stores the current game state and cumulative scores. The duel function updates these scores based on the game outcome:

- Player wins: `player_score` is incremented.
- Computer wins: `computer_score` is incremented.
- Draw: `draws` is incremented.

### Frontend-Blockchain Interaction
This struct stores the current game state and cumulative scores. The duel function updates these scores based on the game outcome:

1. **Connecting to the blockchain**: The frontend uses the Aptos client to connect. The `Aptos` object handle everything that requires a connection to the Aptos network. A connection is established as soon as the object created.
   ```typescript
    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const client = new Aptos(aptosConfig);
    ```
   
2. **Fetching scores**: The `fetchScores` function retrieves the current scores from the blockchain:
   ```typescript
   const fetchScores = async () => {
        if (!account) return;
        try {
            const resource = await client.getAccountResource({
                accountAddress: account.address,
                resourceType: `${moduleAddress}::${moduleName}::GameResult`,
            });
            setScores({
                user: Number(resource.player_score),
                computer: Number(resource.computer_score),
                draws: Number(resource.draws),
            });
        } catch (error) {
            console.log("Error fetching scores: " + error);
        }
    };
   ```

   The `getAccountResource` method is used to fetch the resource from the blockchain, which contains the scores.

3. **Payload**: The payload is an object that contains the data needed to execute a transaction on the Aptos blockchain:

   ```typescript
    const payload: InputTransactionData = {
        data: {
            function: `${moduleAddress}::${moduleName}::duel`,
            functionArguments: [move],
        },
    };
   ```
4. **signAndSubmitTransaction**: This function is provided by the Aptos Wallet Adapter and is used to sign and submit the transaction to the Aptos network:

   ```typescript
   const response = await signAndSubmitTransaction(payload);
   ```

   It takes the payload, signs it with the user's wallet, and submits it to the blockchain. This function handles the complexities of transaction signing and submission.

## How to Play

1. Connect your wallet.
2. Click "Start Game" to begin a new game session & approve the transaction.
3. Choose your move by clicking on one of the five options.
4. The computer (Sheldon) will make its move.
5. The result will be displayed, and scores will be updated.
6. Continue playing or click "Stop Game" to end the session.

## Smart Contract

The game's core logic and score tracking are implemented in the `RockPaperScissorsLizardSpock.move` smart contract. This contract handles:

- Game creation
- Move validation
- Result determination
- Score tracking


Enjoy playing Rock Paper Scissors Lizard Spock on the Aptos blockchain!
