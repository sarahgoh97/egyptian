//Splitting method

function splitting (num, den) {
    if (!checkValid()) {
        return;
    }
    //continue only if valid fraction
    //split the fraction into its ufs of 1/den
    var denominators = [];
    var counter = 0;
    while (counter < num) {
        denominators.push(den);
        counter++;
    }
    //all same means have duplicates
    removeDuplicates();
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
    //to get rid of duplicate unit fractions
    function removeDuplicates() {
        var duplicate = true;
        while (duplicate) {
            denominators.sort(compareNumbers);
            duplicate = false;
            for (counter = 0; counter < denominators.length - 1; counter++) {
                if (denominators[counter] === denominators[counter+1]) {
                    duplicate = true;
                    //console.log(denominators[counter] + " in " +  counter + " same as " + denominators[counter+1]);
                    break;
                }
            }
            if (duplicate) {
                replaceDuplicates();
            }
        }
    }
    //to replace the duplicates
    function replaceDuplicates() {
        denominators[counter + 1] = denominators[counter] + 1;
        denominators.push(denominators[counter] * (denominators[counter] + 1));
    }
    //used for sorting
    function compareNumbers(a, b) {
        return a - b;
    }
    //for printing answer
    function print() {
        var result = "Unit fractions of " + num + "/" + den + " are: ";
        for (counter = 0; counter < denominators.length; counter++) {
            result = result + "1/" + denominators[counter];
            if (counter !== denominators.length - 1) {
                result = result + ", "
            }
        }
        console.log(result);
    }
}

splitting(4,21);
splitting(3,35);
splitting(3,7);