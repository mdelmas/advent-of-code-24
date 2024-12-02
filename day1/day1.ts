import * as fs from "fs";

const [list1, list2] = fs
  .readFileSync("./input", "utf-8")
  .split("\n")
  .map((line) => line.split("   ").map((val) => +val))
  .reduce(
    ([list1, list2], [val1, val2]) => {
      list1.push(val1);
      list2.push(val2);
      return [list1, list2];
    },
    [[], []] as number[][]
  )
  .map((list) => list.sort());

// Part 1
const sum = list1.reduce(
  (sum, _, index) => sum + Math.abs(list1[index] - list2[index]),
  0
);

console.log("Part 1 : ", sum);

// Part 2
const countOccurences = (list: number[]) =>
  list.reduce((count, value) => {
    const key = value;
    if (!(key in count)) {
      count[key] = 0;
    }
    count[key]++;
    return count;
  }, {} as { [key: number]: number });
/*
 {
  const count = {} as { [key: number]: number };

  list.forEach((value) => {
    const key = value;
    if (!(key in count)) {
      count[key] = 0;
    }
    count[key]++;
  });

  return count;
};
*/

const count1 = countOccurences(list1);
const count2 = countOccurences(list2);

let similarityScore = 0;
for (const key in count1) {
  if (key in count2) {
    similarityScore += +key * count1[key] * count2[key];
  }
}
console.log("Part 2 : ", similarityScore);
