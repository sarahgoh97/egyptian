function divisionQuoRec (big, small) {
    return big < small ?
        0 :
        1 + divisionQuoRec(big - small, small);
}

divisionQuoRec(31,4); //7
