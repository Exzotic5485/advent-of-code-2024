import { readInput } from "../utils";

type AntennaMap = {
    [key: string]: number[][];
};

function positionInGrid([x, y]: number[], grid: string[][]) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[x].length;
}

function positionToString([x, y]: number[]) {
    return `${x},${y}`;
}

function calculateAntiNodes(grid: string[][]) {
    const antennas: AntennaMap = {};
    const antinodes = new Set<string>();

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const value = grid[i][j];

            if (value === ".") continue;

            if (value in antennas) {
                for (const [x, y] of antennas[value]) {
                    const rowDiff = x - i;
                    const colDiff = y - j;

                    const firstNode = [x + rowDiff, y + colDiff];
                    const secondNode = [i - rowDiff, j - colDiff];

                    if (positionInGrid(firstNode, grid))
                        antinodes.add(positionToString(firstNode));

                    if (positionInGrid(secondNode, grid))
                        antinodes.add(positionToString(secondNode));

                    console.log(
                        `[${i}, ${j}] [${x}, ${y}] = ${rowDiff} ${colDiff}`
                    );
                }

                antennas[value].push([i, j]);
            } else {
                antennas[value] = [[i, j]];
            }
        }
    }

    return antinodes.size;
}

async function main() {
    const input = await readInput(__dirname);

    const grid = input
        .split("\n")
        .map((line) => line.split("").filter((v) => v.trim()));

    // part 1
    const antinodes = calculateAntiNodes(grid);

    console.log(antinodes);
}

await main();
