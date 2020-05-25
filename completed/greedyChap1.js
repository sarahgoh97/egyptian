// JavaScript source code

function greedy(num, den) { //easier version of greedy
    if (num === 0) {
        return num;
    }
    else {
        const biggest = Math.ceil(den / num);
        const newNum = num * biggest - den;
        const newDen = den * biggest;
        console.log("1/" + biggest);
        if (newNum > 0)
            console.log("+");
        greedy(newNum, newDen);
        return 0;
    }
}

//console.log("6/14 =");
//greedy(6, 14);
//console.log("5/6 =");
//greedy(5,6);
//console.log("11/12 = ");
//greedy (11,12);
//console.log("got same? ");
//greedy (10,39);
greedy(8,11);