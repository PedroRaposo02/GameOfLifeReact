import { useEffect, useState } from "react";

interface GridCellProps {
  cellSize: number;
  isGameCleared: boolean;
  setIsGameCleared: (isGridCleared: boolean) => void;
  cellValue: number;
}

const GridCell = ({
  cellSize,
  cellValue,
}: GridCellProps) => {
  const [isActive, setIsActive] = useState(cellValue === 1);

  useEffect(() => {
    setIsActive(cellValue === 1);
  }, [cellValue]);

  return (
    <div
      className={`border border-slate-800 outline-white ${
        isActive ? "bg-slate-700" : "bg-white"
        }`}
      style={{
        width: cellSize,
        height: cellSize,
      }}
      onClick={() => setIsActive(!isActive)}
    ></div>
  );
};

export default GridCell;
