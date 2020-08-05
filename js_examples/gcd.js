function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

gcd(6,52);