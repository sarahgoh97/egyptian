function sum(term, a, next, b) {
    return a > b
        ? 0
        : term(a) + sum(term, next(a), next, b);
}

function sumHarmonicFractions(first, last) {
    return sum( x => 1 / x,
        first,
        x => x + 1,
        last);
}

sumHarmonicFractions(2,3);