import { useEffect, useState } from "react";
import { Cell } from "./game-canvas";

interface GridCellProps {
  cellSize: number;
  cell: Cell;
  handleCellClick: (rowIndex: number, colIndex: number) => void;
}

const GridCell = ({
  cellSize,
  cell,
  handleCellClick,
}: GridCellProps) => {

  return (
    <div
      className={`border border-slate-800 outline-white ${
        cell.isAlive ? "bg-slate-700" : "bg-white"
        }`}
      style={{
        width: cellSize,
        height: cellSize,
      }}
      onClick={() => handleCellClick(cell.x, cell.y)}
    />
  );
};

export default GridCell;
