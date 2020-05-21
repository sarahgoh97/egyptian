//currently just continued
function continued(num, den) {
    console.log("Egyptian fractions for " + num + "/" + den);

    let denominators = [];
    let integerParts = [];
    let numerator = num;
    let denominator = den;
    let remainder = 0;
    let largestInt = 0;     //keep track of largest value of a[i]

    while (numerator > 1) { //find continued fraction
        let a = Math.floor(numerator/denominator);
        integerParts.push(a);
        if (a > largestInt) {
            largestInt = a;
        }
        if (numerator < denominator) {
            remainder = numerator;
            numerator = denominator;
            denominator = remainder;
        } else {
            remainder = numerator % denominator;
            numerator = denominator;
            denominator = remainder;
        }
    }
    if (integerParts.length % 2 === 0) { //if its even number, change a[n] to a[n] - 1 and 1
        if (largestInt === integerParts[integerParts.length-1]) {
            largestInt = Math.max(largestInt - 1, 1);
        }
        integerParts[integerParts.length-1] = integerParts[integerParts.length-1] - 1;
        integerParts.push(1);
    }
    console.log(integerParts + " largest is:" + largestInt);

    let conNums = [];
    let conDens = [];
    //initialising to find convergents, index will -2 to match integerParts
    conNums.push(0);
    conNums.push(1);
    conDens.push(1);
    conDens.push(0);
    //find convergent: h[i]/k[i] :h[i] and k[i] and k[-1] = h[0] = 0, h[=1] = k[0] = 1
    //h[n] = a[i]h[i-1] + h[i-2]; k[i] = a[i]k[i-1] + k[i-2]
    for (let counter = 0; counter < integerParts.length; counter++) {
        //let numIndex = conNums.length;
        //let denIndex = conDens.length;
        conNums.push(conNums[counter+1] * integerParts[counter] + conNums[counter]);
        conDens.push(conDens[counter+1] * integerParts[counter] + conDens[counter]);
    }
    console.log(conNums);
    console.log(conDens);

    let secConNums = [];
    let secConDens = [];

    for (let counter = 0; counter <= largestInt; counter++) {
        secConNums.push([]);
        secConDens.push([]);
    }

    //find secondary convergent: use a table to store for 0 to max a[i]
    for (let counter = 0; counter <= largestInt; counter++) {
        for (let index = 2; index < conNums.length; index++) { //conNums and conDens have same length
            secConNums[counter].push(conNums[index-1] + conNums[index] * counter);
            secConDens[counter].push(conDens[index-1] + conDens[index] * counter);
        }
    }
    console.log("-------------------SEC----------------");
    console.log(secConNums);
    console.log(secConDens);


    //put secondary convergent in list with primary
    //when the primary number [i] too big, replace with secondary list from i-1 to i+1 and remove i
    for (let counter = 2; counter < conNums.length - 1; counter++) {
        if (conNums[counter] / conDens[counter] > conNums[counter + 1] / conDens[counter + 1]) { //if (counter === tooBig + 2)

            for (let index = 1; index <= largestInt; index++) {
                if (conDens[counter+1] > secConDens[index][counter-2]) {
                    denominators.push(secConDens[index][counter - 2]);
                }
            }
        } else {
            denominators.push(conDens[counter]);
        }
    }

    denominators.push(den);
    console.log(denominators);

    for (let counter = 0; counter < denominators.length - 1; counter++) {
        denominators[counter] = denominators[counter] * denominators[counter+1];
    }
    denominators.pop();

    //console.log(denominators);
    //denominators is from multiplying through the list

    denominators.sort(function(a,b){return a-b});
    denominators.forEach(print);

    function print(value) {
        console.log("1/" + value + " ");
    }
}

continued(18,23);
continued(5,6);
continued(3,7);
continued(7,15);
continued(6,7);