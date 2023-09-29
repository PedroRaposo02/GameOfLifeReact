import { useEffect, useState } from "react";
import GameComponent from "./components/game-canvas";
import Button from "@mui/material/Button";

export type Grid = {
  columns: number;
  rows: number;
  cellSize: number;
};

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isGameCleared, setIsGameCleared] = useState(false);
  const [randomize, setRandomize] = useState(false);
  const [grid, setGrid] = useState<Grid>({
    columns: 40,
    rows: 30,
    cellSize: 20,
  });

  const handleClear = () => {
    setIsStarted(false);
    setIsGameCleared(true);
  };

  const handleChangeColumns = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newGrid = {...grid};
    newGrid.columns = parseInt(e.target.value);
    setGrid(newGrid);
  }

  const handleChangeRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGrid = {...grid};
    newGrid.rows = parseInt(e.target.value);
    setGrid(newGrid);
  }

  return (
    <div className="min-h-screen h-full w-full bg-slate-800 flex flex-col justify-center items-center p-10 gap-5">
      <div className="flex gap-10">
        <h1 className="text-white text-4xl font-bold font-serif">
          Conway's Game of Life
        </h1>
        <div className="flex flex-col justify-end items-end">
          <p className="flex gap-2">
            <span className="text-slate-300 font-semibold">Columns</span>
            <input
              type="range"
              name="Columns"
              id="columns"
              onChange={handleChangeColumns}
            />
            <p className="text-slate-300 font-semibold">{grid.columns}</p>
          </p>
          <p className="flex gap-2">
            <span className="text-slate-300 font-semibold">Rows</span>
            <input
              type="range"
              name="Rows"
              id="rows"
              onChange={handleChangeRows}
            />
            <p className="text-slate-300 font-semibold">{grid.rows}</p>
          </p>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center gap-10">
        <GameComponent
          randomize={randomize}
          setRandomize={setRandomize}
          hasStarted={isStarted}
          isGameCleared={isGameCleared}
          setIsGameCleared={setIsGameCleared}
          grid={grid}
        />
        <div className="flex flex-row gap-5">
          <Button
            variant="contained"
            onClick={() => setIsStarted(!isStarted)}
            sx={{
              backgroundColor: isStarted ? "red" : undefined,
              "&:hover": {
                backgroundColor: isStarted ? "red" : undefined,
              },
              width: "150px",
            }}
          >
            {isStarted ? "Stop" : "Start"}
          </Button>
          <Button
            variant="contained"
            onClick={handleClear}
            sx={{
              width: "150px",
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={() => setRandomize(true)}
            sx={{
              width: "150px",
            }}
          >
            Randomize
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
