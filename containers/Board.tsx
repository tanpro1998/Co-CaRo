import { useEffect, useState } from "react";
import Square from "../components/Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(16).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);

  const setSquareValue = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setSquares(Array(16).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  type Player = "X" | "O" | "BOTH!" | null;

  const calWinner = (square: Player[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
  };

  useEffect(() => {
    const w = calWinner(squares);
    if (w) {
      setWinner(w);
    }
    if (!w && !squares.filter((square) => !square).length) {
      setWinner("BOTH!");
    }
  });
  return (
    <div>
      {!winner && <p>Hey {currentPlayer}, its your turn!</p>}
      {winner && winner !== "BOTH!" && <p>Good Job {winner}</p>}
      {winner && winner === "BOTH!" && <p>Good Job Both!</p>}
      <div className="grid">
        {Array(16)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
              />
            );
          })}
      </div>
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Board;
