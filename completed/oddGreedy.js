//Odd Greedy Iteration Method

function oddGreedy(num, den) {
    if (!checkValid()) {
        return;
    }
    //continue only if valid fraction

    var result = "Unit fractions of " + num + "/" + den + " are: ";
    var previous = 1;
    while (num > 0) {
        var biggest = Math.ceil(den/num);
        if (biggest % 2 === 0) { //makes it odd
            biggest += 1;
        }
        if (biggest <= previous) { //makes sure next chosen is bigger
            biggest = previous + 2;
        }
        result = result + "1/" + biggest;
        num = num * biggest - den;
        den = den * biggest;
        previous = biggest;
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
        if (den % 2 === 0) {
            console.log("Please put in a fraction with an odd denominator");
            return false;
        }
        return true;
    }
}

oddGreedy(4,21);
oddGreedy(3,7);
oddGreedy(4,7);
oddGreedy(5,7);
oddGreedy(6,7);