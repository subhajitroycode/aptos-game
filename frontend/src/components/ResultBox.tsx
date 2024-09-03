const ResultBox = ({
  result,
  isActive,
}: {
  result: string;
  isActive: boolean;
}) => {
  return (
    <>
      {!result && (
        <div className={`result-box ${!isActive && "disabled"}`}>
          <p>{result || "game result"}</p>
        </div>
      )}
      {result && result !== "Game not yet played" && result === "Win" && (
        <div className="result-box win">
          <p>You {result}</p>
        </div>
      )}
      {result && result !== "Game not yet played" && result === "Lose" && (
        <div className="result-box lose">
          <p>You {result}</p>
        </div>
      )}
      {result && (result === "Game not yet played" || result === "Draw") && (
        <div className="result-box draw">
          <p>{result}</p>
        </div>
      )}
    </>
  );
};

export default ResultBox;
