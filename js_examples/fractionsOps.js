function add_frac(first, second) {
    return make_frac(num(first) * den(second) + num(second) * den (first),
        den(first) * den(second));
}
function sub_frac(first, second) {
    return make_frac(num(first) * den(second) - num(second) * den (first),
        den(first) * den(second));
}
function mul_frac(first, second) {
    return make_frac(num(first) * num(second), den(first) * den(second));
}
function div_frac(first, second) {
    return make_frac(num(first) * den(second), den(first) * num(second));
}
function equal_frac(first, second) {
    return num(first) * den(second) === num(second) * den(first);
}
function simplify(frac) {
    const greatestCommonDen = gcd(num(frac), den(frac));
    return make_frac(num(frac) / greatestCommonDen, den(frac) / greatestCommonDen);
}
function gcd(small, big) { //iterative
    if (small === 0) {
        return big;
    } else {
        const remainder = big % small;
        return gcd(remainder, small);
    }
}

