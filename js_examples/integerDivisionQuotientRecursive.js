function divisionQuoRec (big, small) {
    return big < small ?
        0 :
        1 + divisionQuo(big - small, small);
}

divisionQuoRec(31,4); //7
