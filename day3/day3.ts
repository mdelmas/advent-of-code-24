import * as fs from "fs";

const memory = fs.readFileSync("./input", "utf-8").replace("\n", "");

// Part 1
const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = memory.matchAll(regex);

let result = 0;
for (const match of matches) {
  const [_, val1, val2] = match;
  result += +val1 * +val2;
}

console.log("Part 1:", result);
