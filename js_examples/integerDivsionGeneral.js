function divisionQuo (big, small) {
    return division(big, small, 1);
}

function divisionRem (big, small) {
    return big - small * division(big, small, 1);
}

function division(big, small, multiplier) {
    return big - small * multiplier >= small
        ? division(big, small, multiplier + 1)
        : multiplier;
}

divisionQuo(122, 33); //3
divisionRem(122, 33); //23

/*
function ceiling(big, small) {
    return divisionRem(big, small) === 0
        ? divisionQuo(big, small)
        : 1 + divisionQuo(big, small);
}*/