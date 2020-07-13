/* Greedy method all in one
 * recursively calling itself - does integer division and getting UFs
 * includes variable to avoid repeating of code (compared to greedy_allInOne_string.js)
 * returns a string
 * variations change the type of ans in greedy_all_in_one */
function greedy(num, den) {
    return greedy_all_in_one(num, den, "", num, den, 0);
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
            ans = ans + unit_fraction_den + " ";
            const newNum = num * unit_fraction_den - den;
            const newDen = den * unit_fraction_den;
            return greedy_all_in_one(newNum, newDen, ans, newNum, newDen, 0);

        }
    }
}

console.log(greedy(4, 21));
console.log(greedy(3, 7));
