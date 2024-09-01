module aptosgame::RockPaperScissorsLizardSpock {
    use std::string::{ String, utf8 };
    use std::signer;
    use aptos_framework::randomness;

    // Struct to store game result & scores
    struct GameResult has key {
        computer_move: String,
        game_result: String,
        player_score: u64,
        computer_score: u64,
        draws: u64
    }

    // Entry function to create a new game
    public entry fun create_game(account: &signer) acquires GameResult { 
        if (exists<GameResult>(signer::address_of(account))) {
            let result = borrow_global_mut<GameResult>(signer::address_of(account));
            result.computer_move = utf8(b"New Game Created");  
            result.game_result = utf8(b"Game not yet played");
        } else {
            let result = GameResult { 
                computer_move: utf8(b"New Game Created"),
                game_result: utf8(b"Game not yet played"),
                player_score: 0,
                computer_score: 0,
                draws: 0
            };
            move_to(account, result);
        }
    }

    // Retrieve the latest game result
    public fun get_result(account: &signer): (String, String) acquires GameResult {
        let result = borrow_global<GameResult>(signer::address_of(account));
        (result.computer_move, result.game_result)
    }

    // Retrieve the current scores
    public fun get_score(account: &signer): (u64, u64, u64) acquires GameResult {
        let result = borrow_global<GameResult>(signer::address_of(account));
        (result.player_score, result.computer_score, result.draws)
    }

    // Main game logic
    #[randomness]
    entry fun duel(account: &signer, player_move: String) acquires GameResult {
        let random_number = randomness::u64_range(0, 5);
        let result = borrow_global_mut<GameResult>(signer::address_of(account));

        // Determine computer's move
        if (random_number==0) {
            result.computer_move = utf8(b"Rock");
        } else if (random_number==1) {
            result.computer_move = utf8(b"Paper");
        } else if (random_number==2) {
            result.computer_move = utf8(b"Scissors");
        } else if (random_number==3) {
            result.computer_move = utf8(b"Lizard");    
        } else {
            result.computer_move = utf8(b"Spock");
        };

        let computer_move = &result.computer_move;

        // Determine game outcome & update scores
        if (player_move == *computer_move) {
            result.game_result = utf8(b"Draw"); // Draw
            result.draws = result.draws + 1;
        } else if (
            (player_move == utf8(b"Scissors") && (*computer_move == utf8(b"Paper") || *computer_move == utf8(b"Lizard"))) ||
            (player_move == utf8(b"Paper") && (*computer_move == utf8(b"Rock") || *computer_move == utf8(b"Spock"))) ||
            (player_move == utf8(b"Rock") && (*computer_move == utf8(b"Lizard") || *computer_move == utf8(b"Scissors"))) ||
            (player_move == utf8(b"Lizard") && (*computer_move == utf8(b"Spock") || *computer_move == utf8(b"Paper"))) ||
            (player_move == utf8(b"Spock") && (*computer_move == utf8(b"Scissors") || *computer_move == utf8(b"Rock")))
        ) {
            result.game_result = utf8(b"Win"); // User wins
            result.player_score = result.player_score + 1;
        } else {
            result.game_result = utf8(b"Lose"); // Computer wins
            result.computer_score = result.computer_score + 1;
        }
    }
}