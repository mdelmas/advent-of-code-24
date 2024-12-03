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

// Part 2
const regex2 = /mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g;
const matches2 = memory.matchAll(regex2);

let skip = false;
let result2 = 0;
for (const match of matches2) {
  const [action, val1, val2] = match;

  if (action === "don't()" || action === "do()") {
    skip = action === "don't()" ? true : false;
    continue;
  }

  if (skip) {
    continue;
  }

  result2 += +val1 * +val2;
}

console.log("Part 2:", result2);
