//Greedy Recursive Method
//checking validity abstracted
//fractions abstracted instead of 2 integers (using another way of defining objects in js)
    //fractions using dot operator
function checkValidFrac(frac) {
    if (frac.numerator >= frac.denominator) {
        console.log("This is not a proper fraction, please choose a numerator smaller than the denominator");
        return false;
    }
    if (frac.numerator < 0 || frac.denominator < 0) {
        console.log("Please use positive integers for both the numerators and denominators");
        return false;
    }
    return true;
}
function greedy(num, den) {
    var frac = { //fraction as object variable
        numerator: num,
        denominator: den
    };
    if (!checkValidFrac(frac)) {
        return false;
    }
    return iter(frac);
    function iter(frac) {
        print(frac);
        if (frac.numerator === 0) {
            console.log(" ");
        } else {
            var biggest = Math.ceil(frac.denominator / frac.numerator);
            console.log(biggest);
            var newFrac = {
                numerator: frac.numerator * biggest - frac.denominator,
                denominator: frac.denominator * biggest
            };
            iter(newFrac);
        }
    }
}
function print(frac) {
    console.log("The fraction is " + frac.numerator + " / " + frac.denominator);
}


greedy(4,21);
greedy(3,7);
greedy(5,3);