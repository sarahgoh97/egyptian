function greedy(num, den) {
    if (num === 0) {
        return 0;
    } else {
        const unit_fraction_den = bruteForce(num, den);
        display(unit_fraction_den);
        return unit_fraction_den + greedy(num * unit_fraction_den - den,
            den * unit_fraction_den);
    }
}

function bruteForce(num, den) {
    function iter(num, den, unit_fraction_den) {
        return num * unit_fraction_den >= den
            ? unit_fraction_den
            : iter(num, den, unit_fraction_den + 1);
    }
    return iter(num, den, 2);
}

greedy(4, 5);