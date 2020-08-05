function divisionRemIter (big, small) {
    function iter(big, small, multiplier) {
        return small * multiplier <= big
            ? iter(big, small, multiplier + 1)
            : big - small * (multiplier - 1);
    }
    return iter(big, small, 1);
}

divisionRemIter(31,8); //7
