//Greedy Recursive Method
//checking validity abstracted
//fractions abstracted instead of 2 integers (using another way of defining objects in js)
    //some functions fractions use tgt
//includes gcd
function checkValidFrac(frac) {
    if (getNum(frac) >= getDen(frac)) {
        console.log("This is not a proper fraction, please choose a numerator smaller than the denominator");
        return false;
    }
    if (getNum(frac) < 0 || getDen(frac) < 0) {
        console.log("Please use positive integers for both the numerators and denominators");
        return false;
    }
    return true;
}
function greedy(num, den) {
    var frac = make_frac(num, den);
    if (!checkValidFrac(frac)) {
        return false;
    }
    return iter(frac);
    function iter(frac) {
        print(frac);
        if (getNum(frac) === 0) {
            console.log(" ");
        } else {
            var biggest = Math.ceil(getDen(frac) / getNum(frac));
            console.log(biggest);
            var newFrac = make_frac(getNum(frac) * biggest - getDen(frac), getDen(frac) * biggest);
            iter(simplify(newFrac));
        }
    }
}
//function that fractions use, can be used across all ef algos potentially for the fractions
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
    var greatestCommonDen = gcd(getNum(frac), getDen(frac));
    var simplifiedFrac = make_frac(getNum(frac) / greatestCommonDen, getDen(frac) / greatestCommonDen);
    return simplifiedFrac;
}
function gcd(small, big) { //iterative
    if (small === 0) {
        return big;
    } else {
        const remainder = big % small;
        return gcd(remainder, small);
    }
}

greedy(4,21);
greedy(3,7);
greedy(5,3);