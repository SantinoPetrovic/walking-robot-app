# Walking robot App
A small React + TypeScript app that simulates a robot moving in a grid room based on simple commands. You can define the room size, set a starting position, and run movement instructions like `L`, `R`, and `F`.

## What it does

- Define room size
- Set robot's starting position and direction
- Input movement commands (`L`, `R`, `F`)
- Run robot movement by the defined position, direction and commands input
- Handles out-of-bound errors
- Styled UI with Tailwind CSS
- Logic is unit tested

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Vitest (unit testing)

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/SantinoPetrovic/walking-robot-app.git
cd walking-robot-app
```

2. Install dependencies
```bash
npm install
```

3. Run the app
```bash
npm run dev
```
4. visit `http://localhost:5173` in your browser.

## How to test
Run unit tests for the core robot logic:
```bash
npm run test
```

## Notes
If I had more time, I would explore adding:
- A backend service (Node.js) to securely handle robot movement
- The ability to save and load robot sessions and continue where the robot left off