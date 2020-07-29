function divisionQuo (big, small) {
    return big < small ?
        0 :
        1 + divisionQuo(big - small, small);
}

function divisionRem (big, small) {
    return big < small ?
        big :
        divisionRem(big - small, small);
}

function ceiling(big, small) {
    return divisionRem(big, small) === 0
        ? divisionQuo(big, small)
        : 1 + divisionQuo(big, small);
}

ceiling(12, 21);