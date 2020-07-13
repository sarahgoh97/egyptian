/* Greedy method all in one
 * recursively calling itself - does integer division and getting UFs
 * includes variable to avoid repeating of code
 * returns a list of pairs, without abstracting out details of pairs */
function greedy(num, den) {
    return greedy_all_in_one(num, den, pair(null, null), num, den, 0);
}

function greedy_all_in_one(num, den, ans, small, big, counter) {
    //console.log(num + "|" + den + "|" + ans + "|" + big + "|" + counter); //for debugging
    if (num === 0) {
        return ans;
    } else {
        if (small <= big) { //finding value of unit fraction denominator
            return greedy_all_in_one(num, den, ans, small, big - small, 1 + counter);
        } else { //found so can subtract from fraction: num / den
            let unit_fraction_den = 0; //variable to minimise code
            if (big === 0) { //largest unit fraction same denominator as current value
                unit_fraction_den = counter;
            } else {
                unit_fraction_den = counter + 1;
            }
            const newNum = num * unit_fraction_den - den;
            const newDen = den * unit_fraction_den;

            if (head(ans) === null) {
                ans = pair(unit_fraction_den, null);
            } else {
                ans = changeTail(ans, pair(unit_fraction_den, null));
            }
            return greedy_all_in_one(newNum, newDen, ans, newNum, newDen, 0);
        }
    }
}

/* pair is a primitive function in the environment given by the book
 * implemented like how the book says */
function pair (num, den) {
    return m => m === 0
        ? num
        : m === 1
            ? den
            : Error("Argument not 0 or 1 in pair", m);
}
function head(p) { //first element of pair
    return p(0);
}
function tail(p) { //second element of pair
    return p(1);
}
/* new function to add things to linked list */
function changeTail(p, newTail) {
    return tail(p) === null
        ? pair(head(p), newTail)
        : pair(head(p), changeTail(tail(p), newTail));
}
/*to be able to see linked list */
function stringifyPair(p) {
    if (p === null) {
        return null;
    }
    return "[" + head(p) + ", " + stringifyPair(tail(p)) + "]";
}

console.log(stringifyPair(greedy(4, 21)));
console.log(stringifyPair(greedy(3, 7)));
