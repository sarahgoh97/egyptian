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
        return null;
    } else {
        const unit_fraction = make_frac(1,
            ceiling(den(frac), num(frac)));
        return append(list(unit_fraction),
            greedy(subtract_frac(frac, unit_fraction)));
    }
}
function subtract_frac(first, second) {
    return make_frac(num(first) * den(second) - den(first) * num(second),
        den(first) * den(second));
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

greedy(make_frac(3,41));
