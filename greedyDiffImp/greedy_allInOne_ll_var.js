/* Greedy method all in one
 * recursively calling itself - does integer division and getting UFs
 * includes variable to avoid repeating of code
 * returns a linked list */
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
                ans = createList(unit_fraction_den, null);
            } else {
                ans = addToList(ans, unit_fraction_den);
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

/* constructor for list */
function createList(first, second) {
    return pair(first, second);
}
/* function to add a new thing (toBeAdded) to linked list */
function addToList(p, toBeAdded) {
    return tail(p) === null
        ? pair(head(p), pair(toBeAdded, null))
        : pair(head(p), addToList(tail(p), toBeAdded));
}
/* to be able to see linked list */
function stringifyList(p) {
    if (p === null) {
        return null;
    }
    return "[" + head(p) + ", " + stringifyList(tail(p)) + "]";
}

console.log(stringifyList(greedy(4, 21)));
console.log(stringifyList(greedy(3, 7)));

