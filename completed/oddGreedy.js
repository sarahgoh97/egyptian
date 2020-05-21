// JavaScript source code
function oddGreedy(num, den, prev) {
    if (num === 0) {
        return num;
    }
    else {
        var biggest = Math.ceil(den / num);
        if (biggest % 2 === 0)
            biggest += 1;
        if (biggest - prev === 0)
            biggest += 2;
        var newNum = num * biggest - den;
        var newDen = den * biggest;
        console.log("1/" + biggest);
        if (newNum > 0)
            console.log("+");
        oddGreedy(newNum, newDen, biggest);
        return 0;
    }
}

//console.log("10/39 =");
//oddGreedy(10, 39, 0);
//console.log('next');
//oddGreedy(5, 6, 1);
//console.log('next');
oddGreedy(4, 21, 1);