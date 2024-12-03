import { readInput } from "../utils";

function performMultiplication(str: string) {
    let total = 0;

    for (const match of str.matchAll(/mul\((\d+),(\d+)\)/g)) {
        total += Number(match[1]) * Number(match[2]);
    }

    return total;
}

function performConditionedMultiplication(str: string) {
    let total = 0;

    let action = true;

    for (const match of str.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g)) {
        const operation = match[0].replace(/\(([\d,]?)+\)/, "");

        switch (operation) {
            case "mul": {
                if (!action) break;

                total += Number(match[1]) * Number(match[2]);
                break;
            }
            case "do": {
                action = true;

                break;
            }
            case "don't": {
                action = false;

                break;
            }
        }
    }

    return total;
}

async function main() {
    const input = await readInput(__dirname);

    console.log(performMultiplication(input));
    console.log(performConditionedMultiplication(input));
}

await main();
