import * as fs from "fs";

enum Order {
  INCREASING,
  DECREASING,
}

const reports = fs
  .readFileSync("./input", "utf-8")
  .split("\n")
  .map((line) => line.split(" ").map((value) => +value));

const checkOrder = (value1: number, value2: number, order: Order) => {
  if (order === Order.INCREASING) {
    return value2 > value1 && value2 <= value1 + 3;
  }
  return value2 < value1 && value2 >= value1 - 3;
};

// Part 1
let countSafe = 0;

reports.forEach((report) => {
  const order = report[0] > report[1] ? Order.DECREASING : Order.INCREASING;
  const safe = report.every((_, i) => {
    if (i === 0) return true;
    return checkOrder(report[i - 1], report[i], order);
  });

  if (safe) countSafe++;
});

console.log("Part 1:", countSafe);

// Part 2
countSafe = 0;

reports.forEach((report) => {
  const order = report[0] > report[1] ? Order.DECREASING : Order.INCREASING;

  let i = 1,
    safe = true;
  while (i < report.length) {
    if (!checkOrder(report[i - 1], report[i], order)) {
      if (
        i + 1 < report.length &&
        !checkOrder(report[i - 1], report[i + 1], order)
      ) {
        safe = false;
        break;
      }
      i++;
    }
    i++;
  }

  if (safe) countSafe++;
});

console.log("Part 2:", countSafe);
