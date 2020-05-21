//basically starts from biggest denominator and works its way down
function revGreed(num, den, heuristic) {
    console.log("Egyptian fractions for " + num + "/" + den + " " + heuristic);

    //var heuristic = ["BASIC", "SMALL_UNIT", "SMALL_DEN", "SMALL_NUM", "BIG_DIVISOR"];

    let denominators = [];
    let inverse = 0;
    let factors = [];

    while (num > 1) {
        //find modular inverse of num-1 mod den
        inverse = modInv(num, den);
        console.log("The inverse is: " + inverse);
        if (inverse < 1) {
            return;
        } else {
            //factorise den^2
            factors = factorise(den * den);
            //find possible values of d from 1 to den^2
        }
        console.log("Factors are: " + factors);
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
        //console.log(denominators);

        num = num * removed - den;
        den = den * removed;

        let gcd = findGCD(num, den);
        num = num / gcd;
        den = den / gcd;
        //console.log("Next is: " + num + "/" + den);
        //repeat until reach UF
    }
    denominators.push(den);
    removeDuplicates(denominators);
    denominators.sort(function (a, b) {
        return a - b
    });
    denominators.forEach(print);

    function print(value) {
        console.log("1/" + value + " ");
    }

    function basic() {
//find the minimum value of (num-1 mod den * d) mod den
        let minimum = den * den;
        let curr = factors[0];
        for (let counter = 0; counter < factors.length; counter++) {
            curr = (factors[counter] * inverse) % den;
            if (curr * num > factors[counter] && curr < minimum) {
                //console.log(factors[counter]);
                minimum = curr;
            }
        }
        //console.log("Minimum is " + minimum);
        //get the denominator
        let numRemove = (minimum * num) % den;
        let denRemove = minimum * den;
        let removed = denRemove / numRemove;
        //remove UF
        return removed;
    }

    function small_unit() {
        let maximum = 0;
        let temp = 0;
        //ie. find largest UF to remove
        for (let counter = 0; counter < factors.length; counter++) {
            if (((factors[counter] * inverse) % den) * num > factors[counter]) {
                //console.log(factors[counter]);
                temp = factors[counter] / ((factors[counter] * inverse) % den);
                if (temp > maximum) {
                    maximum = temp;
                }
            }
        }
        //find UF with the smallest denominator to remove
        //(num-1 mod den * d) mod den

        //go through all the possible values of d
        //compare all the d's to see which gives largest UF/smallest denominator


        //remove UF
        //x-UF/y --> num = num * denOfUF - 1
        let removedNum = maximum;
        //den = den * denOfUF
        let removedDen = den;
        //actual denominator pushed = den/num
        let removed = removedDen / removedNum;
        return removed;
    }

    function small_denominator() {
        let maximum = 0;
        let temp = 0;
        let first = 0;
        let second = 0;
        let minimum = den * den;
        let frac = 0;
        //ie. find UF to remove
        for (let counter = 0; counter < factors.length; counter++) {
            if (((factors[counter] * inverse) % den) * num > factors[counter]) {
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
                maximum = Math.max(first, second); //console.log("First and second are: " + first + " " + second + "\n");
                if (maximum > 0) {
                    if (minimum >= maximum) {
                        minimum = first;
                        //console.log("Minimum is now " + minimum);
                        //frac = temp;
                    }
                }
                //den of temp / den
                //console.log("temp is "+ temp + "\tden*y:" + first + "\tgcd: " + second + "\tmax: " + maximum + "\tmin: " + minimum +"\tgonna remove: " + den/frac);
            }
        }


        //remove UF
        //x-UF/y --> num = num * denOfUF - 1
        //let removedNum = minimum;
        //den = den * denOfUF
        //let removedDen = den;
        //actual denominator pushed = den/num
        let removed = minimum; //removedDen / removedNum; console.log("Removed: " + removed);
        return removed;
    }

    function small_numerator() {
        let numerator = 0;
        let temp = 0;
        let top = 0;
        let bottom = 0;
        let minimum = den * den;
        let frac = 1;
        //ie. find UF to remove
        for (let counter = 0; counter < factors.length; counter++) {
            if (((factors[counter] * inverse) % den) * num > factors[counter]) {
                //console.log(factors[counter]);
                temp = factors[counter] / ((factors[counter] * inverse) % den); //console.log(temp);

                /*

                var firstNum = num * tempDen - tempNum;;
                var firstDen = den * tempDen;
                var secondNum = tempNum;
                var secondDen = tempDen * den;

                var first = firstNum / findGCD(firstNum, firstDen);
                var second = secondNum / findGCD(secondNum, secondDen);

                numerator = firstNum / findGCD(firstNum, firstDen) - secondDen / findGCD(secondNum, secondDen);
                console.log("first and second and numerator: " + first + "\t" + second + "\t" + numerator);*/
                //numerator = tempNum / den / tempDen;
                //console.log(numerator);
                //bottom = den / temp;
                //top = num * den / temp - den;

                //numerator = top / findGCD(top, bottom);

                var tempNum = factors[counter];
                var tempDen = (factors[counter] * inverse) % den;

                numerator = num * tempDen - tempNum;
                var denominator = den * tempDen;
//console.log(tempNum + " "  + tempDen + " " + numerator + "/" + denominator)
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
                //console.log("removing " + frac + " num and min and frac " + numerator+" " + minimum + " " + frac);
                //den of temp / den
                //console.log("temp is "+ temp + "\tnum:" + top + "\tden: " + bottom + "\tnumerator: " + numerator+ "\tmin: " + minimum +"\tgonna remove: " + den/frac);
            }
            //console.log(frac);
        }


        //remove UF
        //x-UF/y --> num = num * denOfUF - 1
        //let removedNum = minimum; console.log(removedNum);
        //den = den * denOfUF
        //let removedDen = den;
        //actual denominator pushed = den/num
        let removed = frac;//removedDen / removedNum;
        return removed;
    }

    function big_divisor() {
        let maximum = 0;
        let temp = 0;

        var counter = factors.length-1;
        while (maximum === 0 && counter >= 0) {
            if (((factors[counter] * inverse) % den) * num > factors[counter]) {
                //console.log(factors[counter]);
                maximum = factors[counter] / ((factors[counter] * inverse) % den);
            }
            counter--;
        }

        //remove UF
        //x-UF/y --> num = num * denOfUF - 1
        let removedNum = maximum;
        //den = den * denOfUF
        let removedDen = den;
        //actual denominator pushed = den/num
        let removed = removedDen / removedNum;
        return removed;
    }


    function modInv(small,big) {

        small = small % big;
        for (let counter = 1; counter < big; counter++){
            if ((counter*small)%big === 1)
                return counter;
        }
        return -1;
    }

    function factorise(num) {
        let factors = [];
        let factor = 1;
        let max = Math.floor(Math.sqrt(num));

        while (factor <= max) {
            if (num % factor === 0) {
                factors.push(factor);
                if (num/factor !== factor) {
                    factors.push(num/factor);
                }
            }
            factor = factor + 1;
        }
        factors.sort(function(a,b){return a-b});
        return factors;
    }

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

    function removeDuplicates(denominators) {
        var duplicate = true;

        while (duplicate) {
            denominators.sort(function (a, b) {
                return a - b
            });
            if (denominators[0] === 0)
                denominators.shift();
            duplicate = false;
            //denominators.forEach(print);
            for (counter = 0; counter < denominators.length - 1; counter++) {
                if (denominators[counter] !== 0 && denominators[counter] === denominators[counter + 1]) {
                    duplicate = true;
                    console.log(denominators[counter] + " in " + counter + " same as " + denominators[counter + 1]);
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
}


//TEST
//revGreed(31,311, "BASIC");
//revGreed(23,231,"BASIC");
//revGreed(23,231, "SMALL_UNIT");
//revGreed(23,231, "SMALL_NUM");
//revGreed(23,231, "SMALL_DEN");
//revGreed(23,231,"BIG_DIV");

//revGreed(17,180, "SMALL_NUM");
//revGreed(10,143, "SMALL_NUM");

//revGreed(10,143,"BASIC");
//revGreed(5,6,"BASIC");
//revGreed(3,7,"BASIC");
//revGreed(7,15);
//revGreed(6,7);

revGreed(4,21,"BASIC");
revGreed(4,21, "SMALL_UNIT");
revGreed(4,21, "SMALL_NUM");
revGreed(4,21, "SMALL_DEN");
revGreed(4,21,"BIG_DIV");
