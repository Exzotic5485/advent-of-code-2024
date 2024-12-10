import { readInput } from "../utils";

type Disk = (number | null)[];

function diskmapToArray(str: string) {
    const arr: Disk = [];

    for (let i = 0, j = 0; j < str.length; i++, j += 2) {
        arr.push(
            ...Array.from<number>({
                length: Number(str[j]),
            }).fill(i)
        );

        arr.push(
            ...Array.from<null>({
                length: Number(str[j + 1]),
            }).fill(null)
        );
    }

    return arr;
}

function calculateChecksum(disk: Disk) {
    return disk.reduce(
        (total, cur, i) => (cur === null ? total : total! + cur * i),
        0
    );
}

function compactDisk(disk: Disk) {
    for (let end = disk.length - 1, start = 0; end >= 0; end--) {
        if (disk[end] === null) continue;

        for (start; start < disk.length && start < end; start++) {
            if (disk[start] !== null) continue;

            disk[start] = disk[end];
            disk[end] = null;
            break;
        }
    }

    return disk;
}

const getCountOfEqualDescending = (arr: Array<any>, index: number) => {
    let count = 0;

    while (arr[index - count] === arr[index] && index - count >= 0) {
        count++;
    }

    return count;
};

function compactDiskBlocked(disk: Disk) {
    for (let end = disk.length - 1; end >= 0; end--) {
        if (disk[end] === null) continue;

        const currentID = disk[end];

        const count = getCountOfEqualDescending(disk, end);

        for (let start = 0; start < disk.length && start < end; start++) {
            if (disk[start] !== null) continue;

            let isValidBlock = true;

            for (let i = 0; i < count; i++) {
                if (disk[start + i] !== null) isValidBlock = false;
            }

            if (!isValidBlock) continue;

            for (let i = 0; i < count; i++) {
                disk[start + i] = currentID;
                disk[end - i] = null;
            }

            break;
        }

        end -= count - 1;
    }

    return disk;
}

async function main() {
    const input = await readInput(__dirname);

    const disk = diskmapToArray(input);

    // part 1
    const compactedDisk = compactDisk([...disk]);
    console.log(calculateChecksum(compactedDisk));

    // part 2
    const blockedCompactedDisk = compactDiskBlocked([...disk]);
    console.log(calculateChecksum(blockedCompactedDisk));
}

await main();
