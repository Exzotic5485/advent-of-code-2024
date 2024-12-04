import { readInput } from "../utils";

const XMAS = "XMAS";

const DIRECTIONS = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, -1], // Left
    [0, 1], // Right
    [1, -1], // Down Left
    [1, 1], // Down Right
    [-1, -1], // Up Left
    [-1, 1], // Up Right
];

function wordsearch(str: string) {
    const grid = str.split("\n").map((line) => line.split(""));

    let total = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            const letter = grid[row][col];

            if (letter !== XMAS[0]) {
                continue;
            }

            for (const [rowDir, colDir] of DIRECTIONS) {
                for (let i = 1; i < XMAS.length; i++) {
                    const nextLetter =
                        grid[row + rowDir * i]?.[col + colDir * i];

                    if (!nextLetter || nextLetter !== XMAS[i]) break;

                    if (i === XMAS.length - 1) {
                        total++;
                    }
                }
            }
        }
    }

    return total;
}

const X_DIRECTIONS = [
    [
        [-1, -1],
        [1, 1],
    ],
    [
        [1, -1],
        [-1, 1],
    ],
];

function mas(str: string) {
    const grid = str.split("\n").map((line) => line.split(""));

    let total = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            const letter = grid[row][col];

            if (letter !== "A") {
                continue;
            }

            let valid = 0;

            for (const directions of X_DIRECTIONS) {
                const letters = new Set(["S", "M"]);

                for (const [rowDir, colDir] of directions) {
                    const nextLetter = grid[row + rowDir]?.[col + colDir];

                    if (!nextLetter || !letters.has(nextLetter)) break;

                    letters.delete(nextLetter);
                }

                if (letters.size === 0) valid++;
            }

            if (valid >= 2) total++;
        }
    }

    return total;
}

async function main() {
    const input = await readInput(__dirname);

    console.log(wordsearch(input));
    console.log(mas(input));
}

await main();
