import { useState, useEffect } from "react";
import Header from "./Header";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import ScoreBoard from "./ScoreBoard";
import ResultBox from "./ResultBox";

const moduleName = import.meta.env.VITE_MODULE_NAME;
const moduleAddress = import.meta.env.VITE_MODULE_ADDRESS;

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const client = new Aptos(aptosConfig);

const ConnectedView = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [computerSelection, setComputerSelection] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [scores, setScores] = useState<{
    user: number;
    computer: number;
    draws: number;
  }>({ user: 0, computer: 0, draws: 0 });
  const moves = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
  const { connected, account, signAndSubmitTransaction } = useWallet();

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

  useEffect(() => {
    if (connected && isActive) {
      fetchScores();
    }
  }, [connected, isActive]);

  const toggleActiveState = async () => {
    if (!account) return;
    if (!isActive) {
      console.log("Toggling active state: " + isActive);
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::create_game`,
          functionArguments: [],
        },
      };
      const response = await signAndSubmitTransaction(payload);
      try {
        await client.waitForTransaction({ transactionHash: response.hash });
        console.log("Transaction confirmed", response);
        setIsActive(true);
        fetchScores();
      } catch (error) {
        console.error("Transaction failed", error);
      }
    } else {
      setIsActive(false);
    }

    setInput("");
    setResult("");
    setComputerSelection("");
  };

  const handleMoveClick = async (move: string) => {
    setResult("");
    setComputerSelection("");
    if (moves.includes(move)) {
      setInput(move);
      try {
        if (!account) return;
        const payload: InputTransactionData = {
          data: {
            function: `${moduleAddress}::${moduleName}::duel`,
            functionArguments: [move],
          },
        };
        const response = await signAndSubmitTransaction(payload);
        console.log(response);

        const resultData = await client.getAccountResource({
          accountAddress: account?.address,
          resourceType: `${moduleAddress}::${moduleName}::GameResult`,
        });
        console.log(resultData);
        setResult(resultData.game_result.toString());
        setComputerSelection(resultData.computer_move.toString());
        fetchScores(); // Fetch updated scores after each game
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Invalid move");
    }
  };

  return (
    <div className="connected-view">
      <Header />
      {/* Scoreboard table */}
      <ScoreBoard
        user={scores.user}
        computer={scores.computer}
        draws={scores.draws}
      />
      <div className="center-wrapper">
        <button
          className={`toggle-button ${isActive && "active"}`}
          onClick={toggleActiveState}
        >
          {isActive ? "Stop Game" : "Start Game"}
        </button>
        <div className="game-container">
          {/* Your Move */}
          <div className="game-wrapper">
            <div className="game-heading">
              <div className="game-move">{input || "select your move"}</div>
            </div>
            <div className="button-container">
              {moves.map((move, index) => (
                <button
                  key={index}
                  className={`game-button ${!isActive && "disabled"}`}
                  onClick={() => handleMoveClick(move)}
                  disabled={!isActive}
                >
                  <img
                    src={`/images/${move}.png`}
                    alt={`hand gesture of ${move}`}
                  />
                  <p>{move}</p>
                </button>
              ))}
            </div>
          </div>
          {/* Computer Move or Sheldon's Move */}
          <div className="game-wrapper">
            <div className="game-heading">
              <div className="game-move">
                {computerSelection || "sheldon cooper"}
              </div>
            </div>
            <div className="avatar">
              <img src="/images/sheldon-cooper.jpg" alt="image of sheldon" />
            </div>
          </div>
        </div>
        {/* Game Result */}
        <ResultBox result={result} isActive={isActive} />
      </div>
    </div>
  );
};
export default ConnectedView;
