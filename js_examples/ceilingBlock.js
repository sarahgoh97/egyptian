function ceiling(big, small) {
    function divisionQuo (big) {
        return big < small ?
            0 :
            1 + divisionQuo(big - small);
    }

    function divisionRem (big) {
        return big < small ?
            big :
            divisionRem(big - small);
    }

    return divisionRem(big) === 0
        ? divisionQuo(big)
        : 1 + divisionQuo(big);

}

ceiling(123, 12);