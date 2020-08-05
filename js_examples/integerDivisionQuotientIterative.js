function divisionQuoIter (big, small) {
    function iter(big, small, multiplier) {
        return small * multiplier <= big
            ? iter(big, small, multiplier + 1)
            : multiplier - 1;
    }
    return iter(big, small, 1);
}

divisionQuoIter(31,4); //7
