//NOT WORKING YET ONLY WORKS FOR ONE CASE :(

function forceRem(num, den, givenP) {
    console.log("Egyptian fraction decomposition for: " + num + "/" + den + " using " + givenP);
    let denominators = [];
    let factors = [];
    factors = factorise(givenP);

    console.log(factors);

    let quotient = Math.floor(num * givenP / den);
    let remainder = (num * givenP) % den;
    let quotientSum = [];
    //let isQuotientChecked = [];
    let remainderSum = [];
    //initialising arrays
    console.log("Quotient is: " + quotient + " and remainder is: " + remainder);

    for (let counter = 0; counter <= quotient; counter++) {
        quotientSum.push([]);
    }
    for (let counter = 0; counter <= remainder; counter++) {
        remainderSum.push([]);
    }

    //for every factor of givenP
    let counter = 0;
    while (counter < factors.length && factors[counter] <= quotient) {
        quotientSum[factors[counter]].push(factors[counter]);
        counter = counter + 1;
    }

    counter = 0;
    while (counter < factors.length && factors[counter] <= remainder) {
        remainderSum[factors[counter]].push(factors[counter]);
        counter = counter + 1;
    }

    //console.log(remainderSum + quotientSum);
    //add other factors of givenP if same >= largest factor in list as long as sum <= quotient OR remainder
    counter = 0;
    let currListIndex = 1;
    let quotientMax = 1;
    while (quotientSum[factors[counter]] <= quotient) {
        let factorIndex = counter;
        currListIndex = factors[counter];
        while (quotientSum[currListIndex][0] + factors[factorIndex] <= quotient) {
            quotientSum[factors[counter]].push(factors[factorIndex] + quotientSum[currListIndex][0]);
            quotientMax = Math.max(quotientMax,factors[factorIndex] + quotientSum[currListIndex][0]);
            factorIndex = factorIndex + 1;
        }
        counter = counter + 1;
    }
    console.log("Quotient part: " + quotientSum + "\t" + quotientMax);

    counter = 0;
    currListIndex = 1;
    let remainderMax = 1;
    while (remainderSum[factors[counter]] <= remainder) {
        let factorIndex = counter;
        currListIndex = factors[counter];
        while (remainderSum[currListIndex][0] + factors[factorIndex] <= remainder) {
            remainderSum[factors[counter]].push(factors[factorIndex] + remainderSum[currListIndex][0]);
            remainderMax = Math.max(remainderMax,factors[factorIndex] + remainderSum[currListIndex][0]);
            factorIndex = factorIndex + 1;
        }
        counter = counter + 1;
    }
    console.log(remainderSum);
    console.log(remainderMax);
    //to find shortest to longest:
    //what is shortest length:

    let extraQuo = 0;
    let quotients = [];
    if (quotient !== quotientMax) {
        extraQuo = factors.indexOf(quotient - quotientMax);
    }
    //take from quotient max
    let index = 0;
    for (counter = 0; counter < factors.length; counter++) {
        let factor = factors[counter];
        //console.log("trying to take this out" + quotientSum[factor]);
        if (factor <= quotient && quotientSum[factor].pop() === quotientMax) {
            quotients.push([]);
            quotients[index].push(factor);
            quotients[index].push(quotientMax - factor);
            index++;
        }
    }
    console.log(quotients);
        //for every quotient/remainder - factor (factor in increasing order) - stop once it has been found (while loop)
            //if the on top list's last one is the same value
                //add it into the list for the shortest
            //else just ignore
    let extraRem = 0;
    let remainders = [];
    if (remainder !== remainderMax) {
        extraRem = factors.indexOf(remainder - remainderMax);
    }
    //take from quotient max
    index = 0;
    for (counter = 0; counter < factors.length; counter++) {
        let factor = factors[counter];
        console.log("trying to take this out" + remainderSum[factor]);
        if (factor <= remainder && remainderSum[factor].pop() === remainderMax) {
            remainders.push([]);
            remainders[index].push(factor);
            remainders[index].push(remainderMax - factor);
            index++;
        }
    }
    console.log(remainders);

    //for every set of quotients
    let numberOfAnswers = quotients.length * remainders.length;
    for (counter = 0; counter < quotients.length; counter++) {
        for (index = 0; index < remainders.length; index++) {
            denominators.push([]);
            //denominators[counter * quotients.length + index].push(givenP/quotients[counter][quoCount]);
            for (let quoCount = 0; quoCount < quotients[counter].length; quoCount++) {
                denominators[counter * quotients.length + index].push(givenP /quotients[counter][quoCount]);
            }
            for (let remCount = 0; remCount < remainders[counter].length; remCount++) {
                denominators[counter * quotients.length + index].push(givenP * den /remainders[index][remCount]);
            }
            //removeDuplicates(denominators[counter * quotients.length + index]);
            denominators[counter * quotients.length + index].sort(function(a,b){return a-b});
        }
    }

    denominators.sort();
    for (counter = 0; counter < numberOfAnswers; counter++) {
        console.log("Number " + counter + ":");
        denominators[counter].forEach(print);
    }

    function print(value) {
        console.log("1/" + value + " ");
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

forceRem(31,311,252);
forceRem(5,6,8);

/*
    let remainingSum = quotient;
    let counter = 1;
    let factorIndex = 0;
    let toCheckFac = 0;
    let isFactor = false;
    let lastChecked = counter;
    //finding sum for quotient first -- ufds?


    while (counter < quotient) {
        if (counter === 0) {
            for (let index = lastChecked; index <= quotient; quotient++) {
                if (isQuotientChecked[index] === quotient) {
                    counter = index;
                    lastChecked = index;
                    break;
                }
            }
            if (counter === 0) break;
        }
        if (isQuotientChecked[counter]) {

        }
        isQuotientChecked[counter] = true;
        if (remainingSum - counter >= 0){
            toCheckFac = remainingSum - counter;
            quotientSum[counter] = toCheckFac;
            remainingSum = toCheckFac;
            counter = toCheckFac - counter;
        } else {

        }

        console.log(remainingSum + "\t" + counter + "\t" + toCheckFac + "\t" + isFactor);
        console.log(quotientSum);
    }
        if (toCheckFac !== 0) {
            for (let index = 0; index < factors.length; index++) {
                if (toCheckFac === factors[index]) {
                    isFactor = true;
                    break;
                }
            }
        } else {
            isFactor = true;
        }
        console.log(remainingSum + "\t" + counter + "\t" + toCheckFac + "\t" + isFactor);
        if (isFactor === true) {
            remainingSum = toCheckFac;
            quotientSum[counter] = Math.min(toCheckFac,quotientSum[counter]);
            counter = quotientSum[counter];
            isFactor = false;
            //if reached end, counter = 0 because remainingsum = 0
        } else {
            counter = counter + 1;
            lastChecked = counter;
        }
        console.log(remainingSum + "\t" + counter + "\t" + toCheckFac + "\t" + isFactor);
        console.log(quotientSum);
    }*/
/*
remainingSum = remainder;
counter = 1;
factorIndex = 0;
toCheckFac = 0;
isFactor = false;
//finding sum for quotient first -- ufds?
while (counter < remainder && remainingSum > 0) {
    toCheckFac = remainder - counter;
    for (let index = 0; index < factors.length; index++) {
        if (toCheckFac === factors[index]) {
            isFactor = true;
            break;
        }
    }

    if (isFactor === true) {
        remainingSum = remainingSum - counter;
        remainderSum[counter] = toCheckFac;
        counter = remainderSum[counter];
        isFactor = false;
    } else {
        factorIndex = factorIndex + 1;
        counter = factors[factorIndex];
    }
    console.log(remainingSum + "\t" + counter + "\t" + toCheckFac + "\t" + isFactor);
    console.log(remainderSum);
}
*/