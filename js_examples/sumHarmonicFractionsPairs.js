function make_frac(num, den) {
    return pair(num, den);
}
function num(frac) {
    return head(frac);
}
function den(frac) {
    return tail(frac);
}
function add_frac(first, second) {
    return make_frac(num(first) * den(second) + num(second) * den (first),
        den(first) * den(second));
}


function sumHarmonicFractions(first, last) {
    return first > last
        ? make_frac(0,1)
        : add_frac(make_frac(1, first), sumHarmonicFractions(first + 1, last));
}

sumHarmonicFractions(2,8);