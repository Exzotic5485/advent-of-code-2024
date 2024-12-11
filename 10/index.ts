import { readInput } from "../utils";

type Grid = number[][];

const DIRECTIONS = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, -1], // Left
    [0, 1], // Right
];

const TRAIL_END = 9;

function recursiveTrail(grid: Grid, startRow: number, startCol: number) {
    const endPostions = new Set<string>();

    const recursive = (row: number, col: number, nextNumber = 1) => {
        for (const [dirRow, dirCol] of DIRECTIONS) {
            const nextValue = grid[row + dirRow]?.[col + dirCol];

            if (nextValue === nextNumber) {
                if (nextValue === TRAIL_END) {
                    endPostions.add(`${row + dirRow}-${col + dirCol}`);
                }

                recursive(row + dirRow, col + dirCol, nextNumber + 1);
            }
        }
    };

    recursive(startRow, startCol);

    return endPostions.size;
}

function calculateScore(grid: Grid) {
    let totalScore = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== 0) continue;

            totalScore += recursiveTrail(grid, i, j);
        }
    }

    return totalScore;
}

function recursiveTrailRating(grid: Grid, startRow: number, startCol: number) {
    let trails = 0;

    const recursive = (row: number, col: number, nextNumber = 1) => {
        for (const [dirRow, dirCol] of DIRECTIONS) {
            const nextValue = grid[row + dirRow]?.[col + dirCol];

            if (nextValue === nextNumber) {
                if (nextValue === TRAIL_END) {
                    trails++;
                }

                recursive(row + dirRow, col + dirCol, nextNumber + 1);
            }
        }
    };

    recursive(startRow, startCol);

    return trails;
}

function calculateRating(grid: Grid) {
    let totalRating = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== 0) continue;

            totalRating += recursiveTrailRating(grid, i, j);
        }
    }

    return totalRating;
}

async function main() {
    const input = await readInput(__dirname);

    const grid = input.split("\n").map((line) =>
        line
            .split("")
            .filter((s) => s.trim())
            .map(Number)
    );

    // part 1
    const score = calculateScore(grid);
    console.log(score);

    // part 2
    const rating = calculateRating(grid);
    console.log(rating);
}

await main();
