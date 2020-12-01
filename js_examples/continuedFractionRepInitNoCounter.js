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

function cf_ef(frac) {
    function cf_rep (small, big) {
        if (small === 0) {
            return null;
        } else {
            const quotient = divisionQuo(big, small);
            return append(list(quotient),
                cf_rep(divisionRem(big, small), small));
        }
    }
    return cf_rep(den(frac), num(frac));
}

function divisionQuo (big, small) {
    return big < small ?
        0 :
        1 + divisionQuo(big - small, small);
}

function divisionRem (big, small) {
    return big < small ?
        big :
        divisionRem(big - small, small);
}
cf_ef(make_frac(3,11)); 