//Greedy Recursive Method
//checking validity abstracted
function checkValidFrac(num, den) {
    if (num >= den) {
        console.log("This is not a proper fraction, please choose a numerator smaller than the denominator");
        return false;
    }
    if (num < 0 || den < 0) {
        console.log("Please use positive integers for both the numerators and denominators");
        return false;
    }
    return true;
}
function greedy(num, den) {
    if (!checkValidFrac(num, den)) {
        return false;
    }
    if (num === 0) {
        console.log(" ");
        return;
    } else {
        const unit_fraction_den = Math.ceil(den/num);
        console.log(unit_fraction_den);
        greedy(num * unit_fraction_den - den, den * unit_fraction_den);
    }
}

greedy(4,21);
greedy(3,7);
greedy(5,3);