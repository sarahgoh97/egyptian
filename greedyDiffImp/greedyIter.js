//always return results
//console.log is side effect: visualising, debugging
//best practices for naming variables in JS (put in report max 1 pg)
    //and in general (eg. comments, indentation, place to declare vars)
    //explain options and choice (+ EF examples)

//Greedy Iterative Method
//in the usual sense of the word iterative it builds up
    //it builds up to the final part when it reaches the original frac
//book actually considers the recursive method iterative
function greedy(num, den) {
    function iter(num, den, currNum, currDen) {
        if (currNum !== 0 && num * currDen === den * currNum) { //num / den = currNum / currDen
            console.log(" ");
            return 0;
        } else {
            //need to check for num / den - currNum / currDen
            const newNum = num * currDen - currNum * den;
            const newDen = den * currDen;
            const unit_fraction_den = Math.ceil(newDen / newNum); //also the idea of math library functions used
            console.log(unit_fraction_den);
            //new sum = currNum / currDen + 1 / unit_fraction_den
            return iter(num, den,
                currNum * unit_fraction_den + currDen, currDen * unit_fraction_den);
        }
    }

    //conditional statements to check whether inputs are valid
    if (num >= den) {
        console.log("This is not a proper fraction, please choose a numerator smaller than the denominator");
        return false;
    }
    if (num < 0 || den < 0) {
        console.log("Please use positive integers for both the numerators and denominators");
        return false;
    }

    return iter(num, den, 0, 1); //starts with 0/1
}


greedy(1,2);

greedy(4,21);
greedy(3,7);