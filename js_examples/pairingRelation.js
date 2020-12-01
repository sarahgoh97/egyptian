function make_frac(num, den) {
    return pair(num, den);
}
function num(frac) {
    return head(frac);
}
function den(frac) {
    return tail(frac);
}

function pair_frac(frac) {
    if (num(frac) === 2) {
        if (den(frac) % 2 === 0) {
            return make_frac(1, den(frac) / 2);
        } else {
            return list(make_frac(1, (den(frac) + 1) / 2),
                make_frac(1, (den(frac) * (den(frac) + 1))/2));
        }
    } else {
        return "Fraction must have 2 as numerator";
    }
}

pair_frac(make_frac(2,9));