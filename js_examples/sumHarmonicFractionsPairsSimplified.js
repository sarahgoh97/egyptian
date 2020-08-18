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

function sumHarmonicFractions(first, last) {
    function iter(first, last, curr) {
        return first > last
            ? simplify(curr)
            : iter(first + 1, last, add_frac(curr, make_frac(1,first)));
    }
    return iter (first, last, make_frac(0,1));
}

simplify(sumHarmonicFractions(2,8));