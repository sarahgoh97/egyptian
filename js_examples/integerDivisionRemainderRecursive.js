function divisionRem (big, small) {
    return big < small ?
        big :
        divisionRem(big - small, small);
}

divisionRem(31,4); //3
