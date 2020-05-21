function splitting (num, den) {
    let denominators = [];
    let counter = 0;
    while (counter < num) {
        denominators.push(den);
        counter++;
    }
    //console.log("length of denominators is: " + denominators.length);
    var duplicate = true;

    while (duplicate) {
        denominators.sort(function(a,b){return a-b});
        duplicate = false;
        for (counter = 0; counter < denominators.length - 1; counter++) {
            if (denominators[counter] === denominators[counter+1]) {
                duplicate = true;
                console.log(denominators[counter] + " in " +  counter + " same as " + denominators[counter+1]);
                break;
            }
        }
        if (duplicate) {
            denominators[counter + 1] = denominators[counter] + 1;
            denominators.push(denominators[counter] * (denominators[counter] + 1));
        }
    }

    denominators.sort(function(a,b){return a-b});
    denominators.forEach(print);

    function print(value) {
        console.log("1/" + value + " ");
    }
}

//console.log("5/6: ");
//splitting(5,6);
//console.log("4/:");
splitting(3,35);
//splitting(10,39);
