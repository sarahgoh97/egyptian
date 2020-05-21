// JavaScript source code
/*
function binaryRema(num, den) {
    let denominators = [];

    let binDen = 1;
    //let nextNum = num * binDen;

    //to get first denominator
    while (num <= den) {
        //num = nextNum;
        num = num * 2;
        binDen = binDen * 2;
        //console.log("current: " + num + " which denominator power: " + binDen);
    }
    //console.log(num + " " + binDen);
    //denominators.push(binDen);

    //for getting the first part
    while (num > den) {
        denominators.push(binDen);
        console.log(binDen + " " + num);
        num = num % den;
        num = num * 2;
        binDen = binDen * 2;
    }
    num = num / 2;


    //now to express the numerator as binary then split into the fractions
    let binaryRep = [];
    let counter = 0;
    //index 0 is the largest power one
    while (num >= 1) {
        if (num % 2 === 1) {
            binaryRep[counter] = 1;
        } else {
            binaryRep[counter] = 0;
        }
        num = Math.floor(num / 2);
        counter = counter + 1;
    }

    for (counter = 0; counter < binaryRep.length; counter++) {
        binDen = binDen / 2;
        if (binaryRep[counter] === 1) {
            denominators.push(den * binDen);
        }
    }

   console.log(binaryRep);

    denominators.sort(function(a,b){return a-b});
    denominators.forEach(print);

    function print(value) {
        console.log("1/" + value + " ");
    }
}
*/
function binaryRem(num, den) {
    console.log (num + "/" + den + "=");

    let p = 2; //power of 2
    let tempNum = 1;
    let tempDen = 1;
    let denominators = [];

    if (num === 1) {
        denominators.push(den);
        return 0;
    }

    let complete = false;
    while (!complete) {
        tempNum = num * 2 - den;
        tempDen = den * p;
        if (tempNum >= 0) {
            denominators.push(p);
            if (tempNum <= p * 2) {
                let counter = 0;
                //console.log(tempNum + " " + p);
                while (tempNum >= 1) { //gets the decomposition of the sum of powers of 2
                    //console.log(tempNum);
                    if (tempNum % 2 === 1) { //means it is valid power of 2
                        denominators.push(tempDen / Math.pow(2, counter));
                        //console.log(p);
                    }
                    tempNum = Math.floor(tempNum / 2);
                    counter = counter + 1;
                }
                if (tempNum === 0) complete = true;
            }
            num = tempNum;
            //den = tempDen;
        } else {
            num = num * 2;
        }
        p = p * 2;
    }

    //console.log(denominators);

    denominators.sort(function(a,b){return a-b});
    denominators.forEach(print);

    function print(value) {
        console.log("1/" + value);
    }
}

//console.log("18/23=");
//binaryRem(18,23);
//console.log("31/311=");
//binaryRem(31,311);
//console.log("next");
//binaryRem(5,6);
//console.log("next");
//binaryRem(3,7);
//console.log("2/17");
//binaryRem(6,7);
binaryRem(4,21);