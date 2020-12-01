// JavaScript source code

function greedy(num, den) { 
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

greedy(8,11);