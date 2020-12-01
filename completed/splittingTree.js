function splittingTree(num, den) {
    return num === 1
        ? den
        : den + " " + splittingTree(num - 1, den + 1) + " " + splittingTree(num - 1, den * (den + 1));
}

console.log(splittingTree(4, 21));
console.log(splittingTree(3, 7));
console.log(splittingTree(3, 35));
