//Continued fraction method
function continued(num, den) {
    if (!checkValid()) {
        return;
    }
    //continue only if valid fraction

    var denominators = []; //final output
    var integerParts = []; //to represent continued fraction
    var numerator = num;
    var denominator = den;
    var remainder = 0; //for finding continued fraction rep
    var largestInt = 0; //keep track of largest value of a[i]

    findContinuedFractionRep();
    var conNums = [];
    var conDens = [];
    findPrimaryConvergents();
    console.log(conNums + " " + conDens);
    var secConNums = [];
    var secConDens = [];
    //largestInt = integerParts[integerParts.length - 1]
    findSecondaryConvergents();
    console.log(secConNums);
    console.log(secConDens);
    changingConvergentsToDenominators();
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
    //get continued fraction representation of original fraction
    function findContinuedFractionRep() {
        while (numerator > 1) { //find continued fraction
            var a = Math.floor(numerator/denominator);
            integerParts.push(a);
            if (a > largestInt) {
                largestInt = a;
            }
            if (numerator < denominator) { //flip den and num
                remainder = numerator;
                numerator = denominator;
                denominator = remainder;
            } else { //flip after removing integer part
                remainder = numerator % denominator;
                numerator = denominator;
                denominator = remainder;
            }
        }
        if (integerParts.length % 2 === 0) { //if its even number, change a[last] to a[last] - 1 and a[last+1] to 1
            if (integerParts.indexOf(largestInt) === integerParts.length - 1) { //in case last was the only biggest int
                largestInt = Math.max(largestInt - 1, 1); //make sure its not 0
            }
            integerParts[integerParts.length-1] = integerParts[integerParts.length-1] - 1;
            integerParts.push(1);
        }
    }
    //find primary convergents for continued fraction
    function findPrimaryConvergents() {
        //initialising to find convergents, index will -2 to match integerParts
        conNums.push(0);
        conNums.push(1);
        conDens.push(1);
        conDens.push(0);
        //find convergent: h[i]/k[i] :h[i] and k[i] and k[-1] = h[0] = 0, h[=1] = k[0] = 1
        //h[n] = a[i]h[i-1] + h[i-2]; k[i] = a[i]k[i-1] + k[i-2]
        for (var counter = 0; counter < integerParts.length; counter++) {
            conNums.push(conNums[counter+1] * integerParts[counter] + conNums[counter]);
            conDens.push(conDens[counter+1] * integerParts[counter] + conDens[counter]);
        }

    }
    //find secondary convergents for continued fraction
    function findSecondaryConvergents() {
        /*for (var counter = 0; counter <= largestInt; counter++) {
            secConNums.push([]);
            secConDens.push([]);
        }
        //find secondary convergent: use a table to store for 0 to max a[i] with formula
        for (counter = 0; counter <= largestInt; counter++) {
            for (var index = 2; index < conNums.length; index++) { //conNums and conDens have same length
                secConNums[counter].push(conNums[index-1] + conNums[index] * counter);
                secConDens[counter].push(conDens[index-1] + conDens[index] * counter);
            }
        }*/
        for (var counter = 0; counter < conNums.length - 2; counter++) {
            secConNums.push([]);
            secConDens.push([]);
        }
        for (var counter = 0; counter < conNums.length - 2; counter++){
            secConNums[counter].push(conNums[counter+1]);
            secConDens[counter].push(conDens[counter+1]);
            for (var index = 1; index <= integerParts[counter+1]; index++){
                if (counter + 1 < conNums.length) {
                    secConNums[counter].push(conNums[counter + 1] + conNums[counter + 2] * index);
                    secConDens[counter].push(conDens[counter + 1] + conDens[counter + 2] * index);
                }
            }
        }

    }
    //get unit fractions' denominators based on convergents found
    function changingConvergentsToDenominators() {
        //put secondary convergent in list with primary
        //when the primary number [i] too big, replace with secondary list from i-1 to i+1 and remove i
        for (var counter = 2; counter < conNums.length - 1; counter++) {
            if (conNums[counter] / conDens[counter] > conNums[counter + 1] / conDens[counter + 1]) {
                for (var index = 1; index < integerParts[counter-1]; index++) {
                        denominators.push(secConDens[counter - 2][index]);
                        console.log("counter and index: " + counter + "|" + index + " " + secConDens[counter-2][index]);
                }
            } else {
                denominators.push(conDens[counter]);
            }
        }
        denominators.push(den);
        for (counter = 0; counter < denominators.length - 1; counter++) {
            denominators[counter] = denominators[counter] * denominators[counter+1];
        }
        denominators.pop(); //last one removed because only needed for multiplying
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

continued(11,21);
continued(18,23);
continued(5,6);
//continued(3,7);
//continued(7,15);
//continued(6,7);
//continued(5,6);