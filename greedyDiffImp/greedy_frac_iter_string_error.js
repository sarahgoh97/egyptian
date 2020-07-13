/* Greedy method with chapter 2 data abstraction
 * naming of elements with const
 * iterative calling functions (greedy and intDivision functions)
 * using fraction objects
 * uses error to ensure that input given works
 * abstracted how ans is updated into its own function that changes when different output type
 * returns a string */
function greedy(num, den) {
    function iter(frac, ans) {
        if (getNum(frac) === 0) {
            return ans;
        } else {
            //largest unit fraction = the integer value that is at least den / num
            const unit_fraction_den = ceiling(getNum(frac), getDen(frac));
            ans = update(ans, unit_fraction_den);
            const newFrac = simplify(
                make_frac(getNum(frac) * unit_fraction_den - getDen(frac), getDen(frac) * unit_fraction_den)
                );
            return iter(newFrac, ans);
        }
    }
    function update(ans, unit_fraction_den) {
        return ans + unit_fraction_den + " ";
        //return ans = ans + unit_fraction_den; //without whitespace
    }
    const originalFrac = make_frac(num, den);
    if (!checkValidFrac(originalFrac)) {
        return iter(originalFrac, "");
    } else {
        return checkValidFrac(originalFrac);
    }
}
/* checks validity of fraction given by user */
function checkValidFrac(frac) {
    const num = getNum(frac);
    const den = getDen(frac);

    if (num >= den) {
        return "This is not a proper fraction, please choose a numerator smaller than the denominator";
    } else if (num < 0 || den < 0) {
        return "Please use positive integers for both the numerators and denominators";
    } else {
        return false;
    }
}

/* similar format to functions found in chapter 1
 * getting the ceiling of big / small */
function ceiling(small, big) {
    return intDivisionRemainder(small, big) === 0
        ? intDivisionQuotient(small, big)
        : intDivisionQuotient(small, big) + 1;
}
/* finds the quotient of big / small, found when big is no longer bigger than small */
function intDivisionQuotient(small, big) {
    function iter(small, big, multiplier) {
        return small * multiplier <= big
            ? iter(small, big, multiplier + 1)
            : multiplier - 1;
    }
    return iter(small, big, 1);
}
/* finds the remainder of big / small, found when big is no longer bigger than small */
function intDivisionRemainder(small, big) {
    function iter(small, big, multiplier) {
        return small * multiplier <= big
            ? iter(small, big, multiplier + 1)
            : big - small * (multiplier - 1);
    }
    return iter(small, big, 1);
}

/* function that fractions use, can be used across all ef algos potentially for the fractions */
function make_frac(num, den) {
    return {numerator: num,
        denominator: den};
}
function getDen(frac) {
    return frac.denominator;
}
function getNum(frac) {
    return frac.numerator;
}
function print(frac) {
    console.log("The fraction is " + getNum(frac) + " / " + getDen(frac));
}
function simplify(frac) { //can see difference for 4/21
    const greatestCommonDen = gcd(getNum(frac), getDen(frac));
    return make_frac(getNum(frac) / greatestCommonDen, getDen(frac) / greatestCommonDen);
}
function gcd(small, big) { //iterative
    if (small === 0) {
        return big;
    } else {
        const remainder = big % small;
        return gcd(remainder, small);
    }
}

console.log(greedy(4, 21));
console.log(greedy(3, 7));
console.log(greedy(3, 2));