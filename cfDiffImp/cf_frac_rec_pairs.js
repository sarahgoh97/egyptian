/* Continued fraction method with pairs */

/* function that fractions use, can be used across all ef algos potentially for the fractions */
function make_frac(num, den) {
    return {numerator: num,
        denominator: den};
}
function getDen(frac) {
    return frac.denominator;
}
function getNum(frac) {
    return frac.numerator;
}
function print(frac) {
    console.log("The fraction is " + getNum(frac) + " / " + getDen(frac));
}
function simplify(frac) { //can see difference for 4/21
    const greatestCommonDen = gcd(getNum(frac), getDen(frac));
    return make_frac(getNum(frac) / greatestCommonDen, getDen(frac) / greatestCommonDen);
}
function gcd(small, big) { //iterative
    if (small === 0) {
        return big;
    } else {
        const remainder = big % small;
        return gcd(remainder, small);
    }
}

/* pair is a primitive function in the environment given by the book
 * implemented like how the book says */
function pair (num, den) {
    return m => m === 0
        ? num
        : m === 1
            ? den
            : Error("Argument not 0 or 1 in pair", m);
}
function head(p) { //first element of pair
    return p(0);
}
function tail(p) { //second element of pair
    return p(1);
}
/* to be able to see linked list */
function stringifyPair(p) {
    if (p === null || head(p) === null) {
        return null;
    } if (typeof head(p) === 'object') {
        return "[" + getNum(head(p)) + "/" + getDen(head(p)) + "," + stringifyPair(tail(p)) + "]";
    }
    return "[" + head(p) + ", " + stringifyPair(tail(p)) + "]";
}

function cfRep(frac) {
    const list = euclidForCF(getDen(frac), getNum(frac), 0);
    //console.log("CF: " + stringifyPair(list));
    const pri = findPrimary(list);
    //console.log("Primary: " + stringifyPair(pri));
    const sec = nested(secondary, pri, tail(tail(list)));
    //console.log("Secondary: " + stringifyPair(sec));
    const pos = pair(head(pri), positiveSeq(tail(pri), sec));
    return getUF(pos);
}
function euclidForCF(small, big, counter) {
    if (small === 0) {
        return null;
    } else {
        const quotient = intDivisionQuotient(small, big);
        const rem = intDivisionRemainder(small, big);
        if (rem === 0 && (counter + 1) % 2 === 0) {
            //console.log(counter + " extra");
            return addToFront(quotient - 1, euclidForCF(1, 1, counter + 1));
        } else {
            //console.log(counter);
            return addToFront(quotient, euclidForCF(rem, small, counter + 1));
        }
    }
}
function findSecondary(cfList, priList) {
    //for every thingy in the priList
    //it can has a list of stuff based on cfList value
    return flatmap(secondary, enumerate(0, head(cfList)));
    //return accumulate(append, null, mapSec(secondary, priList, null, enumerate(cfList), 0));
}

function secondary(cfInt, priFracBef, priFrac) {
    //const secondaryNum = numerator(priFracBef) + cfInt * numerator(priFrac);
    //const secondaryDen = denominator(priFracBef) + cfInt * denominator(priFrac);
    //console.log(getNum(priFracBef) + "/" + getDen(priFracBef) + " " + getNum(priFrac) + "/" + getDen(priFrac));
    const secondaryNum = getNum(priFracBef) + cfInt * getNum(priFrac);
    const secondaryDen = getDen(priFracBef) + cfInt * getDen(priFrac);
    console.log(cfInt + " " + secondaryNum +"/" + secondaryDen + "-----");
    return make_frac(secondaryNum, secondaryDen);
}
/*function mapSec(func, priList, prev, max, counter) {
    return priList === null || counter > head(max)
        ? null
        : pair(func(counter, head(priList), head(tail(priList))),
            mapSec(func, tail(priList), head(priList), max, counter + 1));
}
function flatmap(f, seq) {
    return accumulate(append, null, map(f, seq)); //mapseq?
}*/
//returns list from 0 to cf int
function enumerate(counter, max) {
    return counter > max
        ? null
        : pair(counter, enumerate(counter+1, max));
}
//seq here is the secondary fractions from 0 to CF int
//f can use secondary(cfInt, p_i-1, p_i)
function mapSecondary(f, seq, priFracBef, priFrac) {
    return seq === null
        ? null
        : pair(f(head(seq), priFracBef, priFrac),
            mapSecondary(f, tail(seq), priFracBef, priFrac));
}
//to provide priFracBef and priFrac into mapSecondary, and combine them
function nested(f, priList, cfList) {
    return priList === null || cfList === null
        ? null
        : pair(mapSecondary(f, enumerate(0, head(cfList)), head(priList), head(tail(priList))),
            nested(f, tail(priList), tail(cfList)));
}
function append(list1, list2) {
    //console.log(stringifyPair(list1));
    return list1 === null
        ? list2
        : pair(head(list1), append(tail(list1), list2));
}
function filter(predicate, sequence) {
    return is_null(sequence) || is_null(tail(sequence))
        ? null
        : predicate(head(sequence), head(tail(sequence)))
            ? pair(head(sequence),
                filter(predicate, tail(sequence)))
            : filter(predicate, tail(sequence));
}
function is_null(obj) {
    return obj === null;
}
function positiveSeq(pri, sec) {
    //console.log(stringifyPair(tail(head(sec))));
    return pri === null || tail(pri) === null
        ? null
        : tooBig(head(pri), head(tail(pri)))
            ? append(tail(head(sec)), positiveSeq(tail(pri), tail(sec)))
            : positiveSeq(tail(pri), tail(sec));
}
function getUF(positiveSeq) {
    //console.log(head(positiveSeq));
    return positiveSeq === null || tail(positiveSeq) === null
        ? null
        : pair( uf(positiveSeq),
            getUF(tail(positiveSeq)));
}
function uf(positiveSeq) {
    return make_frac(1, getDen(head(positiveSeq)) * getDen(head(tail(positiveSeq))));
}
function tooBig(frac1, frac2) {
    return getNum(frac1) * getDen(frac2) > getNum(frac2) * getDen(frac1);
}

function findPrimary(cfList) {
    const first = make_frac(0, 1);
    const second = make_frac(1, 0);
    //return findPrimaryRec(cfList, second, first);
    return accumulate(pair, null, map(primary, cfList, second, first));
}
function map(func, list, prev, beforePrev) {
    //console.log(getNum(prev) + "/" + getDen(prev) + "|" + getNum(beforePrev) + "/" + getDen(beforePrev));
    return list === null
        ? null
        : pair(func(head(list), prev, beforePrev),
            map(func, tail(list), func(head(list), prev, beforePrev), prev));
}
function primary(cfInt, prev, beforePrev) {
    const primaryNum = getNum(beforePrev) + getNum(prev) * cfInt;
    const primaryDen = getDen(beforePrev) + getDen(prev) * cfInt;
    //console.log(primaryNum+ "/" + primaryDen);
    return make_frac(primaryNum, primaryDen);
}
function findPrimaryRec(cfList, prev, beforePrev) {
    if (cfList === null) {
        return null;
    } else {
        const cfInt = first(cfList);
        const primaryNum = getNum(beforePrev) + getNum(prev) * cfInt;
        const primaryDen = getDen(beforePrev) + getDen(prev) * cfInt;
        //console.log(primaryNum + "/" + primaryDen);
        return addToFront(make_frac(primaryNum, primaryDen), findPrimaryRec(next(cfList), make_frac(primaryNum, primaryDen), prev));
    }
}
function addToFront(element, seq) {
    return pair(element, seq);
}
function first(list) {
    return head(list);
}
function next(list) {
    return tail(list);
}
function enumerate_interval(low, high) {
    return low > high
        ? null
        : pair(low, enumerate_interval(low + 1, high));
}
function accumulate(op, initial, sequence) {
    return sequence === null
        ? initial
        : op(head(sequence),
            accumulate(op, initial, tail(sequence)));
}

console.log(stringifyPair(cfRep(make_frac(5,6))));
console.log(stringifyPair(cfRep(make_frac(11,21))));
console.log(stringifyPair(cfRep(make_frac(3,7))));
