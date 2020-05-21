//cgiise UF with smallest den (ie. buggest UF)
function revGreedSmall(num, den) {
    console.log("Egyptian fractions for " + num + "/" + den);

    let denominators = [];
    let inverse = 0;
    let factors = [];

    function small_unit() {
        let maximum = 0;
        let temp = 0;
        //ie. find largest UF to remove
        for (let counter = 0; counter < factors.length; counter++) {
            if (((factors[counter] * inverse) % den) * num > factors[counter]) {
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

    while (num > 1) {
        //find modular inverse of num-1 mod den
        inverse = modInv(num, den);
        //console.log("The inverse is: " + inverse);
        if (inverse < 1) {
            return;
        } else {
            //factorise den^2
            factors = factorise(den*den);
            //find possible values of d from 1 to den^2
        }
        //console.log("Factors are: " + factors);
        let removed = small_unit();
        denominators.push(removed); //need to change this too
        //console.log(denominators);

        //update num and den
        //since above is UF removed, then num = num * den pushed in - 1
        //then den = den * den pushed in
        num = num * removed - den;
        den = den * removed;

        //console.log(num + "/" + den);
        let gcd = findGCD(num, den);
        num = num / gcd;
        den = den / gcd;
        //console.log("Next is: " + num + "/" + den);
        //repeat until reach UF
    }
    denominators.push(den);
    removeDuplicates(denominators);
    denominators.sort(function(a,b){return a-b});
    denominators.forEach(print);

    function print(value) {
        console.log("1/" + value + " ");
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
        while (big > 0 && small > 0) {
            big = big % small;
            if (big === 0) return small;
            small = small % big;
            if (small === 0) return big;
        }
    }

    function removeDuplicates(denominators) {
        let duplicate = false;

        while (!duplicate) {
            denominators.sort(function (a, b) {
                return a - b
            });
            if (denominators[0] === 0)
                denominators.shift();
            duplicate = true;
            for (counter = 0; counter < denominators.length - 1; counter++) {
                if (denominators[counter] !== 0 && denominators[counter] === denominators[counter + 1]) {
                    duplicate = false;
                    //console.log(denominators[counter] + " in " + counter + " same as " + denominators[counter + 1]);
                    break;
                }
            }
            if (duplicate)
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

revGreedSmall(31,311);
revGreedSmall(23,231);
revGreedSmall(10,143);
revGreedSmall(5,6);
revGreedSmall(3,7);
revGreedSmall(17,180);
//revGreed(7,15);
//revGreed(6,7);