function divisionQuo (big, small) {
    return big < small ?
        0 :
        1 + divisionQuo(big - small, small);
}

divisionQuo(31,4); //7
