//Binary method

function binary(num, den) {
    if (!checkValid()) {
        return;
    }
    //continue only if valid fraction
    var denominators = []; //all UFs' denominators
    var nonRepeating = []; //non-repeating part
    var noOfRepeats = 0; //to get representations with positive UFs
    var repeating = []; //repeating part

    getBinaryRep();
    console.log(nonRepeating + " " + repeating);
    getDecimalRep();
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
    //get binary representation of original fraction
    function getBinaryRep() {
        var remainders = [];
        var rem = 0;
        getNonRepeating(remainders);
        var firstTime = remainders.indexOf(rem);
        noOfRepeats = remainders.length - firstTime; //diff between 1st and 2nd instance of rem
        console.log("repeats: " + noOfRepeats);
        getRepeating();

        //get non-repeating part of binary representation
        function getNonRepeating(remainders) {
            do {
                remainders.push(num);
                if (num < den) { //numerator smaller than denominator
                    num = num * 2;
                    nonRepeating.push(0);

                } else { //numerator greater than or equal to denominator
                    num = (num - den) * 2; //% also workz
                    nonRepeating.push(1);
                }
                rem = num;
            } while (remainders.indexOf(rem) === -1);
            console.log(nonRepeating);
        }

        //get repeating part of binary representation
        function getRepeating() {
            for (var counter = 0; counter < noOfRepeats; counter++) {
                if (counter + noOfRepeats < nonRepeating.length) { //skips non-repeating part
                    repeating.push(nonRepeating[counter + noOfRepeats]);
                } else { //follow repeating part
                    repeating.push(nonRepeating[counter])
                }
            }
        }
    }
    //get decimal representation from binary representation
    function getDecimalRep() {
        for (var counter = 0; counter < noOfRepeats; counter++) {
            //non repeating part is just powers of 2
            if (nonRepeating[counter] === 1) {
                denominators.push(Math.pow(2,counter));
            }
            //convert repeating from formula: 2^counter+numRepeats - 2^counter
            if (repeating[counter] === 1) {
                denominators.push(Math.pow(2,noOfRepeats+counter) - Math.pow(2,counter));
                //denominators.push(Math.pow(2,counter)*(Math.pow(2,noOfRepeats) - 1));
            }
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

binary(4,21);
binary(5,22); //1/8,1/16,1/32,1/128,1/2046,1/8184,1/16368,1/32736,1/130944
binary(6,7);
