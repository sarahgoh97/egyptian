//Binary Remainder method

function binaryRem(num, den) {
    let result = [];
    let tempNum = findPowerOfTwo(num, den, result);
    let tempDen = result[result.length - 1] * den;
    findOthers(tempNum, tempDen, result);
    result.sort(compareNumbers);
	print(result);
	    //used for sorting
    function compareNumbers(a, b) {
        return a - b;
    }
    //for printing answer
    function print(denominators) {
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
function findPowerOfTwo(num, den, result) {
    let powerOfTwo = 1
    let numerator = num;
    let complete = false;
    let tempNum = 1;
    let tempDen = 1;
    while (!complete) {
        powerOfTwo = powerOfTwo * 2;
        tempNum = numerator * 2 - den;
        tempDen = den * powerOfTwo;
        if (tempNum >= 0) {
            result.push(powerOfTwo);
            if (tempNum <= powerOfTwo * 2) { 
                complete = true;
            }
            numerator = tempNum;
        } else {
            numerator = numerator * 2;
        }
    }
    return tempNum;
}
function findOthers(tempNum, tempDen, result) {
    let counter = 0;
    while (tempNum >= 1) {
        if (tempNum % 2 === 1) { 
            result.push(tempDen / Math.pow(2, counter));
        }
            tempNum = Math.floor(tempNum / 2);
            counter = counter + 1;
        }
    
}    


binaryRem(4,21);
binaryRem(18,23);
binaryRem(31,311);