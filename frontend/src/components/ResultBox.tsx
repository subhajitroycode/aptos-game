// ResultBox component to display game results
const ResultBox = ({
  result,
  isActive,
}: {
  result: string;
  isActive: boolean;
}) => {
  return (
    <>
      {/* Display when there's no result or game is not active */}
      {!result && (
        <div className={`result-box ${!isActive && "disabled"}`}>
          <p>{result || "game result"}</p>
        </div>
      )}

      {/* Display when player wins */}
      {result && result !== "Game not yet played" && result === "Win" && (
        <div className="result-box win">
          <p>You {result}</p>
        </div>
      )}

      {/* Display when player loses */}
      {result && result !== "Game not yet played" && result === "Lose" && (
        <div className="result-box lose">
          <p>You {result}</p>
        </div>
      )}

      {/* Display for draw or when game hasn't been played yet */}
      {result && (result === "Game not yet played" || result === "Draw") && (
        <div className="result-box draw">
          <p>{result}</p>
        </div>
      )}
    </>
  );
};

export default ResultBox;
