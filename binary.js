// JavaScript source code

function binary(num, den) {
    let denominators = [];
    let binaryRep = [];
    let remainders = []; //better if hashtable/map
    let rem = 0;
    //need to do binary division first

    while (remainders.indexOf(rem) === -1) {
        remainders.push(num);
        if (num < den) {
            num = num * 2;
            binaryRep.push(0);

        } else {
            num = (num - den) * 2;
            binaryRep.push(1);
        }
        rem = num;
        console.log(num + "/" + den + " " + remainders + " " + binaryRep);
    }
    let noOfRepeats = remainders.length - remainders.indexOf(rem);

    let counter = 0;
    let repeating = [];
    for (counter = 0; counter < noOfRepeats; counter++) {
        //add non-repeating into denominators
        if (binaryRep[counter] === 1) {
            denominators.push(Math.pow(2,counter));
        }
        //add repeating into another list
        if (counter + noOfRepeats < binaryRep.length)  {
            repeating.push(binaryRep[counter + noOfRepeats]);
        } else {
            repeating.push(binaryRep[counter])
        }
        console.log(denominators + " " + repeating);
    }

    //Egyptian fractions for repeating part, the repeating part is from [noOfRepeats] to [noOfRepeats * 2 - 1]
    for (counter = 0; counter < noOfRepeats; counter++) {
        if (repeating[counter] === 1) {
            denominators.push(Math.pow(2,noOfRepeats+counter) - Math.pow(2,counter));
            //denominators.push(Math.pow(2,counter)*(Math.pow(2,noOfRepeats) - 1));
        }
    }

    denominators.forEach(print);

    function print(value) {
        console.log("1/" + value + " ");
    }
}

//console.log("5/22 ="); //101 and 10110
//binary(5,22); //1/8,1/16,1/32,1/128,1/2046,1/8184,1/16368,1/32736,1/130944
//https://www.ics.uci.edu/~eppstein/numth/egypt/binary.html
binary(4,21);
//binary(5,6);
//binary(6,7);
