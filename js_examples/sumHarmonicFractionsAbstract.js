function sum(term, a, next, b) {
    return a > b
        ? 0
        : term(a) + sum(term, next(a), next, b);
}

function sumHarmonicFractions(first, last) {
    return sum(unitFraction, first, inc, last);
}

function unitFraction(a) {
    return 1/a;
}

function inc(a) {
    return a + 1;
}

sumHarmonicFractions(2,3);