function make_frac(num, den) {
    return pair(num, den);
}
function num(frac) {
    return head(frac);
}
function den(frac) {
    return tail(frac);
}

function greedy(frac) {
    if (num(frac) === 0) {
        return make_frac(0, 1);
    } else {
        const unit_fraction = make_frac(1,
            ceiling(den(frac), num(frac)));
        print(unit_fraction);
        return add_frac(unit_fraction,
            greedy(subtract_frac(frac, unit_fraction)));
    }
}
function subtract_frac(first, second) {
    return make_frac(num(first) * den(second) - den(first) * num(second),
        den(first) * den(second));
}
function add_frac(first, second) {
    return make_frac(num(first) * den(second) + num(second) * den (first),
        den(first) * den(second));
}
function print(frac) { //prints out fraction
    display(num(frac));
    display("-");
    display(den(frac));
}
function ceiling(big, small) {
    function divisionQuo (big) {
        return big < small ?
            0 :
            1 + divisionQuo(big - small);
    }

    function divisionRem (big) {
        return big < small ?
            big :
            divisionRem(big - small);
    }

    return divisionRem(big) === 0
        ? divisionQuo(big)
        : 1 + divisionQuo(big);

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

simplify(greedy(make_frac(3,4)));