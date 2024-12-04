import * as fs from "fs";

const inputString: string[] = fs.readFileSync("./input", "utf-8").split("\n");
const inputArray = inputString.map((line) => line.split(""));

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
  countOccurences(inputString) +
  countOccurences(transposeInput(inputString)) +
  countOccurences(getDiagonalInputTopToBottom(inputString)) +
  countOccurences(getDiagonalInputBottomToTop(inputString));
console.log("Part 1:", totalCount);

// Part 2
const size = inputArray.length;

const checkForX = (input: string[][], i: number, j: number) => {
  if (i <= 0 || j <= 0 || i >= input.length - 1 || j >= input.length - 1)
    return false;

  if (input[i][j] !== "A") return false;

  // check for
  // M.S
  // .A.
  // M.S
  if (
    input[i - 1][j - 1] === "M" &&
    input[i + 1][j - 1] === "M" &&
    input[i - 1][j + 1] === "S" &&
    input[i + 1][j + 1] === "S"
  ) {
    return true;
  }

  // check for
  // M.M
  // .A.
  // S.S
  if (
    input[i - 1][j - 1] === "M" &&
    input[i + 1][j - 1] === "S" &&
    input[i - 1][j + 1] === "M" &&
    input[i + 1][j + 1] === "S"
  ) {
    return true;
  }

  // check for
  // S.M
  // .A.
  // S.M
  if (
    input[i - 1][j - 1] === "S" &&
    input[i + 1][j - 1] === "S" &&
    input[i - 1][j + 1] === "M" &&
    input[i + 1][j + 1] === "M"
  ) {
    return true;
  }

  // check for
  // S.S
  // .A.
  // M.M
  if (
    input[i - 1][j - 1] === "S" &&
    input[i + 1][j - 1] === "M" &&
    input[i - 1][j + 1] === "S" &&
    input[i + 1][j + 1] === "M"
  ) {
    return true;
  }

  return false;
};

let count = 0;
[...Array(size)].forEach((_, i) => {
  [...Array(size)].forEach((_, j) => {
    if (checkForX(inputArray, i, j)) count++;
  });
});

console.log("Part 2:", count);
