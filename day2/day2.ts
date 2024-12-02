import * as fs from "fs";

enum Order {
  INCREASING,
  DECREASING,
}

const reports = fs
  .readFileSync("./test", "utf-8")
  .split("\n")
  .map((line) => line.split(" ").map((value) => +value));

// Part 1
let countSafe = 0;

reports.forEach((report) => {
  const order = report[0] > report[1] ? Order.DECREASING : Order.INCREASING;
  const safe = report.every((_, i) => {
    if (i === 0) return true;

    if (order === Order.INCREASING) {
      return report[i] > report[i - 1] && report[i] <= report[i - 1] + 3;
    }
    return report[i] < report[i - 1] && report[i] >= report[i - 1] - 3;
  });

  if (safe) countSafe++;
});

console.log("Part 1:", countSafe);
