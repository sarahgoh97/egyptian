//Binary Remainder method

function binaryRem(num, den) {
    if (!checkValid()) {
        return;
    }
    //continue only if valid fraction
    var powerOf2 = 1; //start from 2^0
    var tempNum = 1;
    var tempDen = 1;
    var denominators = [];
    //find powers-of-2 used
    findPowerOfTwo();
    //finding other UFs
    findOtherDenominators();
    denominators.sort(compareNumbers);
    print();

    //checks if given fraction is valid
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
    //find power of 2 to use
    function findPowerOfTwo() {
        var numerator = num;
        var complete = false;
        while (!complete) {
            powerOf2 = powerOf2 * 2;
            //multiply new numerator by 2 while denominator steadily increases
            tempNum = numerator * 2 - den;
            tempDen = den * powerOf2;
            if (tempNum >= 0) {
                denominators.push(powerOf2);
                if (tempNum <= powerOf2 * 2) { //can split into sums of powers of 2
                    complete = true;
                }
                numerator = tempNum;
            } else {
                numerator = numerator * 2;
            }
        }
    }
    //find the other denominators that are not powers of 2 but multiples of original denominator
    function findOtherDenominators() {
        var counter = 0;
        while (tempNum >= 1) {
            //console.log(tempNum);
            if (tempNum % 2 === 1) { //means it is valid power of 2
                denominators.push(tempDen / Math.pow(2, counter));
            }
            tempNum = Math.floor(tempNum / 2);
            counter = counter + 1;
        }
    }
    //used for sorting
    function compareNumbers(a, b) {
        return a - b;
    }
    //for printing answer
    function print() {
        var result = "Unit fractions of " + num + "/" + den + " are: ";
        for (var counter = 0; counter < denominators.length; counter++) {
            result = result + "1/" + denominators[counter];
            if (counter !== denominators.length - 1) {
                result = result + ", "
            }
        }
        console.log(result);
    }
}

binaryRem(4,21);
binaryRem(18,23);
binaryRem(31,311);