import React, { useState, useCallback, useRef } from 'react';
import './App.css';

const numRows = 25;
const numColumns = 25;

const generateEmptyGrid = () => {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push([]);
    for (let k = 0; k < numColumns; k++) {
      grid[i][k] = 0;
    }
  }
  return grid;
};

const App = () => {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);

  const runningReference = useRef(running);
  // runningReference.current = running;
  console.log(runningReference.current);

  const runSimulation = useCallback(() => {
    if (!runningReference.current) return;

    setGrid(g => {
      let copy = JSON.parse(JSON.stringify(g));

      for (let i = 0; i < numRows; i++) {
        for (let k = 0; k < numColumns; k++) {
          // simulation logic goes here
          copy[i][k] = g[i][k] ? 0 : 1;
        }
      }
      return copy;
    });
    console.log('render');
    setTimeout(runSimulation, 1000);
  }, []);

  let gridRender = grid.map((row, i) => (
    <div className='row' key={i}>
      {row.map((col, k) => (
        <div
          key={`${i}-${k}`}
          onClick={() => {
            let gridCopy = JSON.parse(JSON.stringify(grid));
            gridCopy[i][k] = grid[i][k] ? 0 : 1;
            setGrid(gridCopy);
          }}
          style={{
            width: 20,
            height: 20,
            border: '1px solid black',
            backgroundColor: grid[i][k] ? 'blue' : 'transparent'
          }}
          className='cell'
        ></div>
      ))}
    </div>
  ));

  return (
    <div>
      <button
        onClick={() => {
          if (!running) {
            runningReference.current = true;
            runSimulation();
          } else {
            runningReference.current = false;
          }
          setRunning(!running);
        }}
      >
        {running ? 'Stop' : 'Start'}
      </button>
      <div className='grid'>{gridRender}</div>
    </div>
  );
};

export default App;
