import type { Room, Position } from '../types/robotTypes';
import { leftTurnMap, rightTurnMap } from './directionMaps';

const executeRobotCommands = (
  room: Room,
  position: Position,
  commands: string
): Position => {
  let { x, y, direction } = position;

  for (const command of commands) {
    switch (command) {
      case 'L':
        direction = leftTurnMap[direction];
        break;
      case 'R':
        direction = rightTurnMap[direction];
        break;
      case 'F':
        switch (direction) {
          case 'N': y -= 1; break;
          case 'S': y += 1; break;
          case 'E': x += 1; break;
          case 'W': x -= 1; break;
        }
        if (x < 0 || x >= room.width || y < 0 || y >= room.height) {
          throw new Error('Robot walked out of room! Throwing this error.');
        }
        break;
      default:
        throw new Error(`Invalid command: ${command}`);
    }
  }

  return { x, y, direction };
};

export default executeRobotCommands;