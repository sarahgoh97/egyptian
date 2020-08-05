function greedy(num, den) {
    if (num === 0) {
        return 0;
    } else {
        const unit_fraction_den = getBiggestUF(bruteForce)(num, den);
        //const unit_fraction_den = getBiggestUF(ceiling)(num, den);
        return unit_fraction_den + greedy(num * unit_fraction_den - den, den * unit_fraction_den);
    }
}
function getBiggestUF(func) {
    return func;
}

function bruteForce(num, den) {
    function iter(num, den, unit_fraction_den) {
        return num * unit_fraction_den >= den
            ? unit_fraction_den
            : iter(num, den, unit_fraction_den + 1);
    }
    return iter(num, den, 2);
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
