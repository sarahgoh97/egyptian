function sumHarmonicFractions(first, last) {
    return first > last
        ? 0
        : fraction(1, first) + sumHarmonicFractions(first + 1, last);
}

sumHarmonicFractions(2,3);