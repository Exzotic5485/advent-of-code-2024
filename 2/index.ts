import { readInput } from "../utils";

// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.

function isReportSafe(report: number[]) {
    let increasing: boolean | null = null;

    for (let i = 0; i < report.length; i++) {
        const level = report[i];
        const nextLevel = report[i + 1];

        if (!nextLevel) continue;

        if (increasing === null) increasing = level < nextLevel;

        if (increasing) {
            if (level >= nextLevel) return false;
        } else {
            if (level <= nextLevel) return false;
        }

        const diff = Math.abs(level - nextLevel);

        if (diff < 1 || diff > 3) return false;
    }

    return true;
}

function isReportSafeDampened(report: number[]) {
    if (isReportSafe(report)) return true;

    for (let i = 0; i < report.length; i++) {
        const newReport = report.toSpliced(i, 1);

        if (isReportSafe(newReport)) return true;
    }

    return false;
}

async function main() {
    const input = await readInput(__dirname);

    const reports = input
        .split("\n")
        .map((level) => level.split(" ").map(Number));

    let safeReportCount = reports.reduce(
        (total, report) => (isReportSafe(report) ? total + 1 : total),
        0
    );

    let safeDampenedReportCount = reports.reduce(
        (total, report) => (isReportSafeDampened(report) ? total + 1 : total),
        0
    );

    console.log(
        `Safe Reports: ${safeReportCount}\nSafe Dampened Reports: ${safeDampenedReportCount}`
    );
}

await main();
