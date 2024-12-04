import * as fs from "fs";

const input: string[] = fs.readFileSync("./input", "utf-8").split("\n");

// Part 1
const countOccurences = (input: string[]) =>
  input.reduce(
    (sum: number, line: string) =>
      sum +
      (line.match(/XMAS/g) || []).length +
      (line.match(/SAMX/g) || []).length,
    0
  );

const transposeInput = (input: string[]) => {
  return [...input[0]].map((_, colIndex) =>
    input.map((line) => line[colIndex]).join("")
  );
};

const getDiagonalInputBottomToTop = (input: string[]) => {
  const diagonalInput = [] as string[][];
  const size = input.length;

  [...Array(size)].forEach((_, i) => {
    diagonalInput[i] = [];
    [...Array(i + 1)].forEach((_, j) => {
      diagonalInput[i].push(input[i - j][j]);
    });
  });

  [...Array(size - 1)].forEach((_, i) => {
    diagonalInput[size + i] = [];
    [...Array(size - 1 - i)].forEach((_, j) => {
      diagonalInput[size + i].push(input[size - 1 - j][i + 1 + j]);
    });
  });

  return diagonalInput.map((line) => line.join(""));
};

const getDiagonalInputTopToBottom = (input: string[]) => {
  const diagonalInput = [] as string[][];
  const size = input.length;

  [...Array(size)].forEach((_, i) => {
    diagonalInput[i] = [];
    [...Array(i + 1)].forEach((_, j) => {
      diagonalInput[i].push(input[j][size - 1 - i + j]);
    });
  });

  [...Array(size - 1)].forEach((_, i) => {
    diagonalInput[size + i] = [];
    [...Array(size - 1 - i)].forEach((_, j) => {
      diagonalInput[size + i].push(input[1 + i + j][j]);
    });
  });

  return diagonalInput.map((line) => line.join(""));
};

const totalCount =
  countOccurences(input) +
  countOccurences(transposeInput(input)) +
  countOccurences(getDiagonalInputTopToBottom(input)) +
  countOccurences(getDiagonalInputBottomToTop(input));
console.log("Part 1:", totalCount);

// Part 2
