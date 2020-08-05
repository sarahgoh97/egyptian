function greedy(num, den) {
    if (num === 0) {
        return 0;
    } else {
        const unit_fraction_den = ceiling(den, num);
        display(unit_fraction_den);
        return unit_fraction_den + greedy(num * unit_fraction_den - den,
            den * unit_fraction_den);
    }
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

greedy(4,5);