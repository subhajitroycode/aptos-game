import React from "react";

const ScoreBoard: React.FC<{
  user: number;
  computer: number;
  draws: number;
}> = ({ user, computer, draws }) => {
  return (
    <div className="scoreboard-container">
      <table className="scoreboard-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Sheldon</th>
            <th>Draw</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user}</td>
            <td>{computer}</td>
            <td>{draws}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
