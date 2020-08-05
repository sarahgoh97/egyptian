function gcd(small, big) {
    if (small === 0) {
        return big;
    } else {
        const remainder = big % small;
        return gcd(remainder, small);
    }
}

gcd(6,52);