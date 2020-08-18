//returns quotient and remainder
function division(big, small) {
    function iter(big, small, multiplier) {
        return big - small * multiplier >= small
            ? iter(big, small, multiplier + 1)
            : pair(multiplier, big - small * multiplier);
    }
    return iter(big, small, 1);
}

division(23, 4);

