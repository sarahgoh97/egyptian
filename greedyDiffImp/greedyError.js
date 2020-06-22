/*Greedy Iterative Method
* works only for SourceAcademy (errors, display)
* checking validity abstracted - using error messages to check
* fractions abstracted instead of 2 integers
* using iterative method for greedy, so checking validity only once
* intDivision functions using recursive calls
* using string here to return back the answer*/

function checkValidFrac(frac) {
    const num = numerator(frac);
    const den = denominator(frac);

    if (num >= den) {
        return error("This is not a proper fraction, please choose a numerator smaller than the denominator");
    } else if (num < 0 || den < 0) {
        return error("Please use positive integers for both the numerators and denominators");
    } else {
        return true;
    }
}
function Error(x, y) {
    error(x + ": " + stringify(y)); //stringify function by Source Academy
}
function greedy(num, den) {
    function iter(frac, ans) {
        num = numerator(frac);
        den = denominator(frac);
        if (num === 0) {
            return ans;
        } else {
            const unit_fraction = make_fraction(1,ceiling(num, den));
            ans = ans + stringify(denominator(unit_fraction)) + " ";
            return iter(make_fraction(num * denominator(unit_fraction) - den, den * denominator(unit_fraction)), ans);
        }
    }

    const frac = make_fraction(num, den);
    if (!checkValidFrac(frac)) {
        return false;
    } else {
        return iter(frac, "");
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
    return small <= big
        ? 1 + intDivisionQuotient(small, big - small)
        : 0;
}
/* finds the remainder of big / small, found when big is no longer bigger than small */
function intDivisionRemainder(small, big) {
    return small <= big
        ? intDivisionRemainder(small, big - small)
        : big;
}

function make_fraction(num, den) {
    return pair(num, den);
}
function numerator(fraction) {
    return head(fraction);
}
function denominator(fraction) {
    return tail(fraction);
}
/* pair is a primitive function in the environment given by the book
 * implemented like how the book says */
function pair (num, den) {
    return m => m === 0
        ? num : den
}
function head(p) { //first element of pair
    return p(0);
}
function tail(p) { //second element of pair
    return p(1);
}

greedy(4, 21);
greedy(3, 7);
greedy(5, 3);