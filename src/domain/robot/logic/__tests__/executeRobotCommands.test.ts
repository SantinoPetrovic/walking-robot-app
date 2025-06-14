import { describe, it, expect } from 'vitest';
import executeRobotCommands from '../executeRobotCommands';
import type { Room, Position } from '../../types/robotTypes';

describe('executeRobotCommands', () => {
  const defaultRoom: Room = { width: 5, height: 5 };

  it('should move robot correctly with a hardcoded command', () => {
    const start: Position = { x: 1, y: 2, direction: 'N' };
    const commands = 'RFRFFRFRF';

    const result = executeRobotCommands(defaultRoom, start, commands);
    expect(result).toEqual({ x: 1, y: 3, direction: 'N' });
  });

  it('should move robot correctly with multiple left turns and forward movement', () => {
    const start: Position = { x: 3, y: 3, direction: 'N' };
    const commands = 'LFLFLFLFF';

    const result = executeRobotCommands(defaultRoom, start, commands);
    expect(result).toEqual({ x: 3, y: 2, direction: 'N' });
  });

  it('should throw an error if robot walks out of room', () => {
    const start: Position = { x: 0, y: 0, direction: 'N' };
    const commands = 'F';
    expect(() => {
      executeRobotCommands(defaultRoom, start, commands);
    }).toThrow('Robot walked out of room! Throwing this error.');
  });

  it('should throw an error for invalid command', () => {
    const start: Position = { x: 1, y: 2, direction: 'N' };
    const commands = 'RFZ';

    expect(() => {
      executeRobotCommands(defaultRoom, start, commands);
    }).toThrow('Invalid command');
  });
});