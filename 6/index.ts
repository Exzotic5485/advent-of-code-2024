import { readInput } from "../utils";

const GridSpace = {
    GUARD: "^",
    OBSTRUCTION: "#",
    EMPTY: "."
};

const Directions: Record<string, [number, number]> = {
    UP: [-1, 0],
    RIGHT: [0, 1],
    DOWN: [1, 0],
    LEFT: [0, -1],
};

function getNextDirection(currentDirection: [number, number]) {
    const directions = Object.values(Directions);

    const currentIndex = directions.findIndex(
        ([x, y]) => x === currentDirection[0] && y === currentDirection[1]
    );

    if (currentIndex === -1) return Directions.UP;

    return directions[(currentIndex + 1) % directions.length];
}

function findGuardPosition(grid: string[][]) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === GridSpace.GUARD) return [i, j];
        }
    }

    throw new Error("Grid does not contain a guard.");
}

function calculateGuardPositions(grid: string[][]) {
    let [guardRow, guardCol] = findGuardPosition(grid);

    let direction = Directions.UP;

    const visitedPositions = new Set<string>([`${guardRow}-${guardCol}`]);

    while (
        guardRow >= 0 &&
        guardRow <= grid.length &&
        guardCol >= 0 &&
        guardCol <= grid[0].length
    ) {
        const nextRow = guardRow + direction[0];
        const nextCol = guardCol + direction[1];

        console.log(`Move to: (${nextRow}, ${nextCol})`);

        switch (grid[nextRow]?.[nextCol]) {
            case GridSpace.GUARD:
            case GridSpace.EMPTY:
                [guardRow, guardCol] = [nextRow, nextCol];

                visitedPositions.add(`${guardRow}-${guardCol}`);

                console.log(` - is empty`);
                break;
            case GridSpace.OBSTRUCTION:
                direction = getNextDirection(direction);

                console.log(` - has obstruction`);
                console.log(` - next direction: [${direction}]`);
                break;
            default:
                return visitedPositions.size;
        }
    }
}

async function main() {
    const input = await readInput(__dirname);

    const grid = input
        .split("\n")
        .map((line) => line.split("").filter((str) => str.trim()));

    // part 1
    const positions = calculateGuardPositions(grid);
    console.log("Positions:", positions);
}

await main();
