import React, { useState, useEffect } from 'react';
import executeRobotCommands from '../logic/executeRobotCommands';
import type { Direction, Position, Room } from '../types/robotTypes';

const RobotConsole = () => {

  const [roomWidth, setRoomWidth] = useState(5);
  const [roomHeight, setRoomHeight] = useState(7);
  const [startX, setStartX] = useState(3);
  const [startY, setStartY] = useState(3);
  const [startDir, setStartDir] = useState<Direction>('N');
  const [commands, setCommands] = useState('');
  const [result, setResult] = useState<string>('');

  const allowedKeys: string[] = ['L', 'R', 'F'];
  const directions: Direction[] = ['N', 'E', 'S', 'W'];

  const handleSubmit = () => {

    const isValid = [...commands].every((char) => allowedKeys.includes(char));
    if (!isValid) {
      setResult('Error: Command string contains invalid characters.');
      return;
    }

    try {
      const room: Room = { width: roomWidth, height: roomHeight };
      const position: Position = { x: startX, y: startY, direction: startDir };
      const final = executeRobotCommands(room, position, commands.toUpperCase());
      setResult(`Report: ${final.x} ${final.y} ${final.direction}`);
    } catch (err) {
      setResult(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem', minHeight: '100vh' }}>
      <h2>Robot Console</h2>

      <div>
        <label>Room Size (width height): </label>
        <input type="number" value={roomWidth} onChange={(e) => setRoomWidth(Number(e.target.value))} />
        <input type="number" value={roomHeight} onChange={(e) => setRoomHeight(Number(e.target.value))} />
      </div>

      <div>
        <label>Start Position (x y direction): </label>
        <input type="number" value={startX} onChange={(e) => setStartX(Number(e.target.value))} />
        <input type="number" value={startY} onChange={(e) => setStartY(Number(e.target.value))} />
        <select value={startDir} onChange={(e) => setStartDir(e.target.value as Direction)}>
          {directions.map((dir) => (
            <option key={dir} value={dir}>
              {dir}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Commands: </label>
        <input value={commands} onChange={(e) => setCommands(e.target.value.toUpperCase())} />
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
        Run Robot
      </button>
      <div>
        <p>{`Room: ${roomWidth} ${roomHeight}`}</p>
        <p>{`Start: ${startX} ${startY} ${startDir}`}</p> 
        <p>{`Commands: ${commands}`}</p>
        <p>{result}</p>
      </div>

    </div>
  );
};

export default RobotConsole;