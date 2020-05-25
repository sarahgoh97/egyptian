//Harmonic Iteration Method

function harmonic (num, den, harm) {
    //keep increasing
    var result = "Unit fractions of " + num + "/" + den + " starting from 1/" + harm + " are: ";

    //console.log("Taking in " + num + "/" + den + " and starting from 1/" + harm);
    var denominators = [];
    var harmNum = 0; let harmDen = 1;
    //var result = '';
    while (harmNum/harmDen + 1/harm <= num/den) {
        harmNum = harmNum * harm + harmDen;
        harmDen = harm * harmDen;
        denominators.push(harm);
        harm = harm + 1;
        console.log("Harmonics: " + harm + " " + harmNum + "/" + harmDen);
    }

    if (harmNum/harmDen == num/den) {
        denominators.forEach(print);
        console.log("no need greedy For the fraction " + num + "/" + den + ": the UFs are " + result);
        return 0;
    }
    //num/den - harmNum/harmDen
    let remainderNum = num * harmDen - harmNum * den;
    let remainderDen = harmDen * den;
    console.log(remainderNum + "/" + remainderDen);

    while (remainderNum > 0) { //similar to greedy part
        let biggest = Math.ceil(remainderDen/remainderNum);
        denominators.push(biggest);
        remainderNum = remainderNum * biggest - remainderDen;
        remainderDen = remainderDen * biggest;
    }

    denominators.forEach(print);
    console.log("For the fraction " + num + "/" + den + ": the UFs are " + result);
    return 0;

    function print(value) {
        result = result + "1/" + value + " ";
    }

}



harmonic(5, 6, 2); // 1/2, 1/3
harmonic(4, 21, 14); // 1/3, 1/11, 1/231
//harmonic(3,11,12); // 1/4, 1/6, 1/84
//harmonic(18, 23, 5);