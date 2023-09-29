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
      className={`w-[${cellSize}px] aspect-square border border-slate-800 outline-white ${
        isActive ? "bg-slate-700" : "bg-white"
      }`}
      onClick={() => setIsActive(!isActive)}
    ></div>
  );
};

export default GridCell;
