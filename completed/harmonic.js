//Harmonic Iteration Method

function harmonic (num, den, harm) {
    if (!checkValid()) {
        return;
    }
    //continue only if valid fraction
    var result = "Unit fractions of " + num + "/" + den + " starting from 1/" + harm + " are: ";

    var harmDen = 1;
    var harmNum = 0;
    getHarmonicSeries();
    if (harmNum * den === num * harmDen) { //this is the answer
        console.log(result);
        return;
    }
    //get the remainder = num/den - harmNum/harmDen
    //remainder is (num * harmDen - harmNum * den) / (den * harmDen)
    var remainderNum = num * harmDen - harmNum * den;
    var remainderDen = harmDen * den;
    greedy(remainderNum, remainderDen);
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
        if (num < 0 || den < 0 || harm < 0) {
            console.log("Please use positive integers for both the numerators and denominators involved");
            return false;
        }
        return true;
    }
    //get harmonic series
    function getHarmonicSeries() {
        //check if current harmonic sum and next harmonic exceeds the original:
        //harmNum / harmDen + 1 / harm <= num / den
        //harmNum * harm * den + harmDen * den <= num * harmDen * harm
        //so that only integers are compared
        while (harmNum * harm * den + harmDen * den <= num * harmDen * harm) {
            harmNum = harmNum * harm + harmDen;
            harmDen = harm * harmDen;
            result = result + "1/" + harm;
            harm = harm + 1;
            //check if harmNum / harmDen < num / den, to continue using harmonics
            if (harmNum * den < num * harmDen) {
                result = result + ", ";
            }
        }
    }

    function greedy(numerator, denominator) {
        while (numerator > 0) { //similar to greedy part
            var biggest = Math.ceil(denominator/numerator);
            result = result + "1/" + biggest;
            numerator = numerator * biggest - denominator;
            denominator = denominator * biggest;
            if (numerator !== 0) {
                result = result + ", ";
            }
        }
    }
}

harmonic(5, 6, 2); // 1/2, 1/3
harmonic(4, 21, 14);
harmonic(3, 7, 4);// 1/3, 1/11, 1/231
//harmonic(3,11,12); // 1/4, 1/6, 1/84
//harmonic(18, 23, 5);