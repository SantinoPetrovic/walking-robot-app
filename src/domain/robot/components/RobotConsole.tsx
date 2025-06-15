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

    if (roomWidth < startX || roomHeight < startY ) {
      setResult('Error: Robot and its position is out of room.');
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
    <div className="min-h-screen p-6 font-mono">
      <h2 className="text-3xl font-bold text-center text-white p-4 mb-6">
        Robot Console
      </h2>
      <div className="max-w-xl mx-auto rounded-lg shadow-md space-y-6">
        <label className="block font-semibold mb-3">Room Size (width × height):</label>
        <div className="flex gap-2 mb-5">
          <input
            type="number"
            min={1}
            value={roomWidth}
            onChange={(e) => setRoomWidth(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          <input
            type="number"
            min={1}
            value={roomHeight}
            onChange={(e) => setRoomHeight(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>

      <div className='mt-5'>
        <label className="block font-semibold mb-3">Start Position (x y direction): </label>
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            value={startX}
            onChange={(e) => setStartX(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          <input
            type="number"
            min={1}
            value={startY}
            onChange={(e) => setStartY(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          <select
            value={startDir}
            onChange={(e) => setStartDir(e.target.value as Direction)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {directions.map((dir) => (
              <option key={dir} value={dir}>
                {dir}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='mt-5'>
        <label className="block font-semibold mb-3">Commands:</label>
        <input
          value={commands}
          onChange={(e) => setCommands(e.target.value.toUpperCase())} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 my-4 rounded transition"
      >
        Run Robot
      </button>
      <div className="mt-5">
        <p className="text-xl">
          <span className="font-bold">Room:</span> {roomWidth} × {roomHeight}
        </p>
        <p className="text-xl">
          <span className="font-bold">Start Position:</span> ({startX}, {startY}) facing {startDir}
        </p>
        <p className="text-xl">
          <span className="font-bold">Commands:</span> {commands}
        </p>
        {result && (
          <p className="text-xl">
            <span className="font-bold">Result:</span> {result}
          </p>
        )}
      </div>

    </div>
  );
};

export default RobotConsole;