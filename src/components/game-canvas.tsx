import React, { useEffect, useState } from "react";
import GridCell from "./grid-cell";
import { Grid } from "../App";

interface GridProps {
  hasStarted: boolean;
  isGameCleared: boolean;
  setIsGameCleared: (isGridCleared: boolean) => void;
  randomize: boolean;
  setRandomize: (isRandomized: boolean) => void;
  grid: Grid;
}

const GameComponent = ({
  hasStarted,
  isGameCleared,
  setIsGameCleared,
  randomize,
  setRandomize,
  grid,
}: GridProps) => {

  const cellSize = grid.cellSize;

  const requestRef = React.useRef<number>();

  const [cells, setCells] = useState<number[][]>(
    Array.from(Array(grid.columns)).map(() =>
      Array.from(Array(grid.rows)).map(() => 0)
    )
  );

  const animate = React.useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
  }, []);
  
  useEffect(() => {
    if (randomize) {
      setCells(
        Array.from(Array(grid.columns)).map(() =>
          Array.from(Array(grid.rows)).map(() => Math.round(Math.random()))
        )
      );
      setRandomize(false);
    }
  }, [setRandomize, randomize, grid.columns, grid.rows]);

  useEffect(() => {
    if (isGameCleared) {
      setCells(
        Array.from(Array(grid.columns)).map(() =>
          Array.from(Array(grid.rows)).map(() => 0)
        )
      );
    }
    setIsGameCleared(false);
  }, [grid.columns, grid.rows, isGameCleared, setIsGameCleared]);

  useEffect(() => {
    function startSimulation() {
      const newCells: number[][] = [];

      for (let i = 0; i < grid.columns; i++) {
        newCells.push([]);
        for (let j = 0; j < grid.rows; j++) {
          newCells[i].push(0);
        }
      }

      for (let i = 0; i < grid.columns; i++) {
        for (let j = 0; j < grid.rows; j++) {
          const currentCell = cells[i][j];
          // Count live neighbors!
          let neighbors = 0;
          if (i > 0) {
            if (cells[i - 1][j] === 1) neighbors++;
          }
          if (j > 0) {
            if (cells[i][j - 1] === 1) neighbors++;
          }
          if (i > 0 && j > 0) {
            if (cells[i - 1][j - 1] === 1) neighbors++;
          }
          if (i < grid.columns - 1) {
            if (cells[i + 1][j] === 1) neighbors++;
          }
          if (j < grid.rows - 1) {
            if (cells[i][j + 1] === 1) neighbors++;
          }
          if (i < grid.columns - 1 && j < grid.rows - 1) {
            if (cells[i + 1][j + 1] === 1) neighbors++;
          }
          if (i > 0 && j < grid.rows - 1) {
            if (cells[i - 1][j + 1] === 1) neighbors++;
          }
          if (i < grid.columns - 1 && j > 0) {
            if (cells[i + 1][j - 1] === 1) neighbors++;
          }

          // Rules of Life
          if (currentCell === 1 && (neighbors === 2 || neighbors === 3)) {
            newCells[i][j] = 1;
          } else if (currentCell === 0 && neighbors === 3) {
            newCells[i][j] = 1;
          } else if (currentCell === 1 && (neighbors < 2 || neighbors > 3)) {
            newCells[i][j] = 0;
          }
        }
      }

      setCells(newCells);
    }

    if (hasStarted) {
      requestRef.current = requestAnimationFrame(animate);
      startSimulation();
    } else {
      cancelAnimationFrame(requestRef.current!);
    }
  }, [animate, hasStarted, cells, grid.columns, grid.rows]);

  return (
    <div
      className={`flex flex-row w-[${grid.columns * cellSize}px] h-[${grid.rows * cellSize}px] bg-white`}
    >
      {cells.map((row, indexRow) => (
        <div className="flex flex-col" key={indexRow}>
          {row.map((cell, indexCol) => (
            <GridCell
              cellSize={cellSize}
              isGameCleared={isGameCleared}
              setIsGameCleared={setIsGameCleared}
              key={indexCol}
              cellValue={cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameComponent;
