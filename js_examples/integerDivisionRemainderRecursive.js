function divisionRemRec (big, small) {
    return big < small ?
        big :
        divisionRemRec(big - small, small);
}

divisionRemRec(31,4); //3
