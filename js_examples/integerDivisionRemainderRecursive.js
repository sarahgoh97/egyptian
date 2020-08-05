function divisionRemRec (big, small) {
    return big < small ?
        big :
        divisionRem(big - small, small);
}

divisionRemRec(31,4); //3
