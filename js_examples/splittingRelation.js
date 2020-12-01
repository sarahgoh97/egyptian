function make_frac(num, den) {
    return pair(num, den);
}
function num(frac) {
    return head(frac);
}
function den(frac) {
    return tail(frac);
}

function split_frac(frac) {
    if (num(frac) === 2) {
        return list(make_frac(1, den(frac) + 1),
            make_frac(1, den(frac) * (den(frac) + 1)));
    } else {
        return "Fraction must have 2 as numerator";
    }
}

split_frac(make_frac(2,9));