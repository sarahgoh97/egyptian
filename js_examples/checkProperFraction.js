function abs(x) { //in book
    return x < 0 ? -x : x;
}
function testProper(numerator, denominator) {
    return abs(numerator) < abs(denominator);
}

testProper(-4, 3);