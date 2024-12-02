import { readInput } from "../utils";

function calculateDifference(leftList: number[], rightList: number[]) {
    const sortedLeft = leftList.sort((a, b) => a - b);
    const sortedRight = rightList.sort((a, b) => a - b);

    let difference = 0;

    for (let i = 0; i < sortedLeft.length; i++) {
        const leftNum = sortedLeft[i];
        const rightNum = sortedRight[i];

        difference += Math.abs(leftNum - rightNum);
    }

    return difference;
}

type OccurenceMap = {
    [key: number]: number;
};

function calculateSimilarity(leftList: number[], rightList: number[]) {
    const rightListOccurences = rightList.reduce((obj, num) => {
        obj[num] = (obj[num] || 0) + 1;

        return obj;
    }, {} as OccurenceMap);

    let occurenceScore = 0;

    for (let i = 0; i < leftList.length; i++) {
        const leftNum = leftList[i];
        const rightTotal = rightListOccurences[leftNum] || 0;

        occurenceScore += leftNum * rightTotal;
    }

    return occurenceScore;
}

async function main() {
    const input = await readInput(__dirname);

    const leftArr: number[] = [];
    const rightArr: number[] = [];

    for (const line of input.split("\n")) {
        const [leftNum, rightNum] = line.split(/\s+/);

        leftArr.push(Number(leftNum));
        rightArr.push(Number(rightNum));
    }

    const difference = calculateDifference(leftArr, rightArr);
    const similarity = calculateSimilarity(leftArr, rightArr);

    console.log(`Difference: ${difference}\nSimilarity Score: ${similarity}`);
}

await main();
