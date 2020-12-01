function make_frac(num, den) {
    return pair(num, den);
}
function num(frac) {
    return head(frac);
}
function den(frac) {
    return tail(frac);
}
function add_frac(first, second) {
    return make_frac(num(first) * den(second) + num(second) * den (first),
        den(first) * den(second));
}
function simplify(frac) {
    const greatestCommonDen = gcd(num(frac), den(frac));
    return make_frac(num(frac) / greatestCommonDen, den(frac) / greatestCommonDen);
}
function gcd(small, big) { //iterative
    if (small === 0) {
        return big;
    } else {
        const remainder = big % small;
        return gcd(remainder, small);
    }
}

function cf_ef(frac) {
    function cf_rep(small, big, counter) {
        if (small === 0) {
            return null;
        } else {
            const quotient = divisionQuo(big, small);
            const rem = divisionRem(big, small);
            if (rem === 0 && (counter + 1) % 2 === 0) {
                return append(list(quotient - 1), cf_rep(1, 1, counter + 1));
            } else {
                return append(list(quotient), cf_rep(rem, small, counter + 1));
            }
        }
    }
    const cfRep = cf_rep(den(frac), num(frac), 0);
    return findPrimary(cfRep);
}

function findPrimary(cfRep) {
    const first = make_frac(0, 1);
    const second = make_frac(1, 0);
    return findPrimaryRec(cfRep, second, first);
}
function findPrimaryRec(cfRep, prev, beforePrev) {
    if (cfRep === null) {
        return null;
    } else {
        const cfInt = head(cfRep);
        const primaryNum = num(beforePrev) + num(prev) * cfInt;
        const primaryDen = den(beforePrev) + den(prev) * cfInt;
        return append(list(make_frac(primaryNum, primaryDen)),
            findPrimaryRec(tail(cfRep),
                make_frac(primaryNum, primaryDen), prev)
        );
    }
}

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
cf_ef(make_frac(4,7));