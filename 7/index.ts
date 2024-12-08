import { readInput } from "../utils";

function createCombinations(length: number, elements: number[]) {
    const result: number[][] = [];

    const backtrack = (current: number[]) => {
        if (current.length === length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < elements.length; i++) {
            current.push(elements[i]);
            backtrack(current);
            current.pop();
        }
    };

    backtrack([]);

    return result;
}

function isValidEquation(expected: number, input: number[]) {
    const combinations = createCombinations(input.length - 1, [0, 1]);

    for (const combination of combinations) {
        let result = input[0];

        for (let i = 0; i < combination.length; i++) {
            if (combination[i]) {
                result *= input[i + 1];
            } else {
                result += input[i + 1];
            }
        }

        if (result === expected) return true;
    }

    return false;
}

function isValidEquationConcatenation(expected: number, input: number[]) {
    const combinations = createCombinations(input.length - 1, [0, 1, 2]);

    for (const combination of combinations) {
        let result = input[0];

        for (let i = 0; i < combination.length; i++) {
            switch (combination[i]) {
                case 0:
                    result += input[i + 1];
                    break;
                case 1:
                    result *= input[i + 1];
                    break;
                case 2:
                    result = Number(`${result}${input[i + 1]}`);
                    break;
            }
        }

        if (result === expected) return true;
    }

    return false;
}

async function main() {
    const input = await readInput(__dirname);

    const inputs = input
        .split("\n")
        .map((line) => line.match(/\b(\d+)\b/g)!.map(Number));

    // part one
    const calibrationResult = inputs.reduce(
        (total, [expected, ...inputs]) =>
            total + (isValidEquation(expected, inputs) ? expected : 0),
        0
    );

    // part two
    const calibrationResultConcatenation = inputs.reduce(
        (total, [expected, ...inputs]) =>
            total +
            (isValidEquationConcatenation(expected, inputs) ? expected : 0),
        0
    );

    console.log(calibrationResult);
    console.log(calibrationResultConcatenation);
}

await main();
