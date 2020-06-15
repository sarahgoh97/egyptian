//Greedy Recursive Method
//checking validity abstracted
//fractions abstracted instead of 2 integers
function checkValidFrac(frac) {
    const num = numerator(frac);
    const den = denominator(frac);
    if (num >= den) {
        console.log("This is not a proper fraction, please choose a numerator smaller than the denominator");
        return false;
    }
    if (num < 0 || den < 0) {
        console.log("Please use positive integers for both the numerators and denominators");
        return false;
    }
    return true;
}
function greedy(num, den) {
    const frac = make_fraction(num, den);
    if (!checkValidFrac(frac)) {
        return false;
    }
    return iter(frac);
    function iter(frac) {
        num = numerator(frac);
        den = denominator(frac);
        if (num === 0) {
            console.log(" ");
            return;
        } else {
            const unit_fraction = make_fraction(1,Math.ceil(den/num));
            console.log(denominator(unit_fraction));
            iter(make_fraction(num * denominator(unit_fraction) - den, den * denominator(unit_fraction)));
        }
    }
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
//pair is a primitive function in the environment given by the book
//implemented like how the book says
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

greedy(4,21);
greedy(3,7);
greedy(5,3);