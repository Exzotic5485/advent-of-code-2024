import path from "node:path";

export async function readInput(folder = "./", fileName = "input.txt") {
    const file = Bun.file(path.join(folder, fileName));

    return file.text();
}
