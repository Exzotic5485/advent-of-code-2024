import { readInput } from "../utils";

type RequirementMap = { [k: number]: number[] };

function rulesToRequirements(rules: number[][]) {
    return rules.reduce((obj, [x, y]) => {
        obj[y] ??= [];
        obj[y].push(x);

        return obj;
    }, {} as RequirementMap);
}

function isValidPage(
    page: number,
    update: number[],
    requirements: RequirementMap,
    seen: Set<number>
) {
    const pageRequirements = requirements[page];

    if (pageRequirements) {
        for (const requirement of pageRequirements) {
            if (
                update.find((p) => p === requirement) &&
                !seen.has(requirement)
            ) {
                return false;
            }
        }
    }

    return true;
}

function isValidUpdate(update: number[], requirements: RequirementMap) {
    const seen = new Set<number>();

    for (const page of update) {
        if (!isValidPage(page, update, requirements, seen)) {
            return false;
        }

        seen.add(page);
    }

    return true;
}

function reorderUpdate(update: number[], requirements: RequirementMap) {
    const reorded: number[] = [];

    const seen = new Set<number>();

    for (let i = 0; i < update.length && reorded.length < update.length; i++) {
        for (const page of update) {
            if (
                seen.has(page) ||
                !isValidPage(page, update, requirements, seen)
            ) {
                continue;
            }

            reorded.push(page);

            seen.add(page);
        }
    }

    return reorded;
}

async function main() {
    const input = await readInput(__dirname);

    const [ruleList, updateList] = input.split(/\n\s*\n/g);

    const rules = ruleList
        .split("\n")
        .map((rule) => rule.split("|").map(Number));

    const updates = updateList
        .split("\n")
        .map((line) => line.split(",").map(Number));

    const requireMap = rulesToRequirements(rules);

    const validUpdates = updates.filter((update) =>
        isValidUpdate(update, requireMap)
    );

    const totalValid = validUpdates.reduce(
        (total, update) => total + update[Math.floor(update.length / 2)],
        0
    );

    const invalidUpdates = updates.filter(
        (update) => !isValidUpdate(update, requireMap)
    );

    const reorderedInvalidUpdates = invalidUpdates.map((update) =>
        reorderUpdate(update, requireMap)
    );

    const totalReordered = reorderedInvalidUpdates.reduce(
        (total, update) => total + update[Math.floor(update.length / 2)],
        0
    );

    console.log(totalValid);
    console.log(totalReordered);
}

await main();
