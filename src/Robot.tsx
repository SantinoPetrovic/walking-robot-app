type Direction = 'N' | 'E' | 'S' | 'W';

interface Position {
  x: number;
  y: number;
  direction: Direction;
}

interface Room {
  width: number;
  height: number;
}

const leftTurnMap: Record<Direction, Direction> = {
  N: 'W',
  W: 'S',
  S: 'E',
  E: 'N',
};

const rightTurnMap: Record<Direction, Direction> = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
};

const Robot = (
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
          case 'N':
            y += 1;
            break;
          case 'S':
            y -= 1;
            break;
          case 'E':
            x += 1;
            break;
          case 'W':
            x -= 1;
            break;
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
}

export default Robot;