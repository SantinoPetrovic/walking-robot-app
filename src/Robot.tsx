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

const directions: Direction[] = ['N', 'E', 'S', 'W'];

const Robot = (
  room: Room,
  position: Position,
  commands: string
) => {
  return;
}

export default Robot;