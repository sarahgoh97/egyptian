//Greedy Iteration Method

function greedy(num, den) {
    if (!checkValid()) {
        return;
    }
    //continue only if valid fraction
    var result = "Unit fractions of " + num + "/" + den + " are: ";
    while (num > 0) {
        var biggest = Math.ceil(den/num);
        result = result + "1/" + biggest;
        num = num * biggest - den;
        den = den * biggest;
        if (num !== 0) {
            result = result + ", ";
        }
    }
    console.log(result);

    //checks if fraction given is valid
    function checkValid() {
        if (num === 1) {
            console.log("This is already a unit fraction: " + num + "/" + den);
            return false;
        }
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
}

greedy(4,21);
greedy(3,7);
greedy(5,3);