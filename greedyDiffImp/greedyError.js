//Greedy Recursive Method
//works only for SourceAcademy (errors, display)
//checking validity abstracted
    //using error messages to check
//fractions abstracted instead of 2 integers


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
    error(x + ": " + stringify(y));
}
function greedy(num, den) {

    function iter(frac) {
        num = numerator(frac);
        den = denominator(frac);
        if (num === 0) {
            display(" ");
            return 0;
        } else {
            const unit_fraction = make_fraction(1,math_ceil(den/num));
            display(denominator(unit_fraction));
            iter(make_fraction(num * denominator(unit_fraction) - den, den * denominator(unit_fraction)));
        }
    }

    const frac = make_fraction(num, den);
    if (!checkValidFrac(frac)) {
        return false;
    } else {
        return iter(frac);
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