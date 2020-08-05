function pyramidSlantHeight(resources, base) {
    const sideMaxArea = divide(resources, 4);
    return divide(sideMaxArea * 2, base);
}

function divide(a, b) {
    return divisionQuoRec(a, b);
}


function divisionQuoRec (big, small) {
    return big < small ?
        0 :
        1 + divisionQuo(big - small, small);
}

pyramidSlantHeight(200, 23); //4

