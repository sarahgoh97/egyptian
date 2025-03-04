//Reverse Greedy Method

function revGreed(num, den, heuristic) {
    if (!checkValid()) {
        return;
    }
    var result = "Unit fractions of " + num + "/" + den + " are: ";
    //continue only if valid fraction
    var denominators = [];
    var inverse = 0;
    var factors = [];

    while (num > 1) {
        inverse = modInv(num, den);
        if (inverse < 1) {
            return;
        } else {
            //factorise den^2
            factors = factorise(den * den);
        }
        var removed = 0;
        switch (heuristic) {
            case "BASIC":
                removed = basic();
                break;
            case "SMALL_UNIT":
                removed = small_unit();
                break;
            case "SMALL_NUM":
                removed = small_numerator();
                break;
            case "SMALL_DEN":
                removed = small_denominator();
                break;
            case "BIG_DIV":
                removed = big_divisor();
                break;
        }
        denominators.push(removed);
        getRemainingFraction();
    }
    denominators.push(den);
    removeDuplicates(denominators);
    denominators.sort(compareNumbers);
    print();

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
    //gets modular inverse of small mod big
    function modInv(small,big) {

        small = small % big;
        for (var counter = 1; counter < big; counter++){
            if ((counter * small) % big === 1)
                return counter;
        }
        return -1;
    }
    //finds all the factors of num and returns an array
    function factorise(num) {
        var factors = [];
        var factor = 1;
        var max = Math.floor(Math.sqrt(num));

        while (factor <= max) {
            if (num % factor === 0) {
                factors.push(factor);
                if (num/factor !== factor) {
                    factors.push(num/factor);
                }
            }
            factor = factor + 1;
        }
        factors.sort(compareNumbers);
        return factors;
    }
    //used for sorting
    function compareNumbers(a, b) {
        return a - b;
    }
    //for printing answer
    function print() {
        for (var counter = 0; counter < denominators.length; counter++) {
            result = result + "1/" + denominators[counter];
            if (counter !== denominators.length - 1) {
                result = result + ", "
            }
        }
        console.log(result);
    }

    //basic method of finding the largest possible denominator for the unit fraction
    function basic() {
        //find the minimum value of (num-1 mod den * d) mod den
        var minimum = den * den;
        var curr = factors[0];
        for (var counter = 0; counter < factors.length; counter++) {
            curr = (factors[counter] * inverse) % den;
            if (checkDen(counter) && curr < minimum) {
                //console.log(factors[counter]);
                minimum = curr;
            }
        }
        //get the denominator
        var removedNum = (minimum * num) % den;
        var removedDen = minimum * den;
        var removed = removedDen / removedNum;
        //remove UF
        return removed;
    }
    //small unit method of finding the largest possible denominator for the unit fraction
    function small_unit() {
        var maximum = 0;
        var temp = 0;
        //ie. find largest UF to remove / smallest denominator
        for (var counter = 0; counter < factors.length; counter++) {
            if (checkDen(counter)) {
                temp = factors[counter] / ((factors[counter] * inverse) % den);
                if (temp > maximum) {
                    maximum = temp;
                }
            }
        }
        //remove UF
        //x-UF/y --> num = num * denOfUF - 1
        var removedNum = maximum;
        //den = den * denOfUF
        var removedDen = den;
        //actual denominator pushed = den/num
        var removed = removedDen / removedNum;
        return removed;
    }
    //small denominator method of finding the largest possible denominator for the unit fraction
    function small_denominator() {
        var maximum = 0;
        var temp = 0;
        var first = 0;
        var second = 0;
        var minimum = den * den;
        var frac = 0;
        //ie. find UF to remove, using integers for calculations
        for (var counter = 0; counter < factors.length; counter++) {
            if (checkDen(counter)) {
                //console.log(factors[counter]);
                temp = factors[counter] / ((factors[counter] * inverse) % den);
                var tempNum = factors[counter];
                var tempDen = (factors[counter] * inverse) % den;
                //first = 1 / (temp / den);
                //second = 1 / ((num - temp) / den);
                var firstNum = tempNum;
                var firstDen = tempDen * den;
                var secondNum = num * tempDen - tempNum;
                var secondDen = den * tempDen;
                first = firstDen / findGCD(firstNum, firstDen);
                second = secondDen / findGCD(secondNum, secondDen);
                //first = den / temp;
                //second = first / (num / temp - 1);
                maximum = Math.max(first, second);
                if (maximum > 0) {
                    if (minimum >= maximum) {
                        minimum = first;
                        //console.log("Minimum is now " + minimum);
                    }
                }
                //den of temp / den
            }
        }
        //remove UF
        var removed = minimum;
        return removed;
    }
    //small numerator method of finding the largest possible denominator for the unit fraction
    function small_numerator() {
        var numerator = 0;
        var denominator = den;
        var temp = 0;
        var minimum = den * den;
        var frac = 1;
        //ie. find UF to remove
        for (var counter = 0; counter < factors.length; counter++) {
            if (checkDen(counter)) {
                temp = factors[counter] / ((factors[counter] * inverse) % den);

                var tempNum = factors[counter];
                var tempDen = (factors[counter] * inverse) % den;

                numerator = num * tempDen - tempNum;
                denominator = den * tempDen;
                numerator = numerator / findGCD(numerator, denominator);
                if (Number.isInteger(numerator)) {
                    if (minimum > numerator) {
                        minimum = numerator;
                        frac = denominator / findGCD(tempNum, denominator);
                    } else if (minimum === numerator) {
                        if (frac > denominator / findGCD(tempNum, denominator)) {
                            minimum = numerator;
                            frac = denominator / findGCD(tempNum, denominator);
                        }
                    }
                }
            }
        }
        //remove UF
        var removed = frac;
        return removed;
    }
    //big divisor method of finding the largest possible denominator for the unit fraction
    function big_divisor() {
        var maximum = 0;

        var counter = factors.length-1;
        while (maximum === 0 && counter >= 0) {
            if (((factors[counter] * inverse) % den) * num > factors[counter]) {
                //console.log(factors[counter]);
                maximum = factors[counter] / ((factors[counter] * inverse) % den);
            }
            counter--;
        }
        //remove UF
        var removedNum = maximum;
        var removedDen = den;
        var removed = removedDen / removedNum;
        return removed;
    }
    //check denominator's validity to be used
    function checkDen(counter) {
        return ((factors[counter] * inverse) % den) * num > factors[counter];
    }
    //get the greatest common deonominator between small and big
    function findGCD(small, big) {
        if (!Number.isInteger(small) || !Number.isInteger(big))
            return -1;
        while (big > 0 && small > 0) {
            big = big % small;
            if (big === 0) return small;
            small = small % big;
            if (small === 0) return big;
        }
    }
    //uses pairing method to remove duplicate unit fractions
    function removeDuplicates(denominators) {
        var duplicate = true;

        while (duplicate) {
            denominators.sort(compareNumbers);
            if (denominators[0] === 0)
                denominators.shift();
            duplicate = false;
            //denominators.forEach(print);
            for (var counter = 0; counter < denominators.length - 1; counter++) {
                if (denominators[counter] !== 0 && denominators[counter] === denominators[counter + 1]) {
                    duplicate = true;
                    break;
                }
            }
            if (!duplicate)
                break;
            if (denominators[counter] % 2 === 0) {
                denominators[counter] = denominators[counter] / 2;
                denominators[counter + 1] = 0;
            } else {
                denominators[counter] = (denominators[counter] + 1) / 2;
                denominators[counter + 1] = (denominators[counter + 1] * (denominators[counter + 1] + 1)) / 2;
            }
        }
    }
    //get remaining fraction to be found
    function getRemainingFraction() {
        num = num * removed - den;
        den = den * removed;

        var gcd = findGCD(num, den);
        num = num / gcd;
        den = den / gcd;
    }
}


//TEST
revGreed(31,311, "BASIC");
revGreed(23,231,"BASIC");
revGreed(23,231, "SMALL_UNIT");
revGreed(23,231, "SMALL_NUM");
revGreed(23,231, "SMALL_DEN");
revGreed(23,231,"BIG_DIV");

revGreed(4,21,"BASIC");
revGreed(4,21, "SMALL_UNIT");
revGreed(4,21, "SMALL_NUM");
revGreed(4,21, "SMALL_DEN");
revGreed(4,21,"BIG_DIV");
