function pairing (num, den) {
    let denominators = [];
    let counter = 0;
    while (counter < num) {
        denominators.push(den);
        counter++;
    }

    var duplicate = true;

    while (duplicate) {
        denominators.sort(function(a,b){return a-b});
        if (denominators[0] === 0)
            denominators.shift();
        duplicate = false;
        //denominators.forEach(print);
        for (counter = 0; counter < denominators.length - 1; counter++) {
            if (denominators[counter] !== 0 && denominators[counter] === denominators[counter+1]) {
                duplicate = true;
                console.log(denominators[counter] + " in " +  counter + " same as " + denominators[counter+1]);
                break;
            }
        }
        if (!duplicate)
            break;
        if (denominators[counter] % 2 === 0) {
            denominators[counter] = denominators[counter]/2;
            denominators[counter+1] = 0;
        } else {
            denominators[counter] = (denominators[counter] + 1) / 2;
            denominators[counter+1] = (denominators[counter+1] * (denominators[counter+1] + 1)) / 2;
        }
        console.log("changed into " + denominators[counter] + " and " + denominators[counter+1]);
        //denominators[counter] = denominators[counter] + 1;
        //denominators.push(denominators[counter]*(denominators[counter]+1));
    }

    denominators.sort(function(a,b){return a-b});
    denominators.forEach(print);

    function print(value) {
        if (value != 0)
            console.log("1/" + value + " ");
    }
}
//console.log("18/23: ");
//pairing(18,23); //1/2 + 1/6 + 1/12 + 1/35 + 1/276 + 1/2415
//console.log("5/6: ");
//pairing(5,6);
//console.log("11/12: ")
//pairing(11,12);
pairing(4,15);