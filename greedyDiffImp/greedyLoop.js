//Greedy Iterative Method
//in the usual sense of the word iterative it builds up
    //it builds up to the final part when it reaches the original frac
//book actually considers the recursive method iterative
//using loops
function greedy(num, den) {
    if (!checkValid(num, den)) { //change to error message?
        return;
    }
    //continue only if valid fraction
    //while loops
    var result = "Unit fractions of " + num + "/" + den + " are: ";
    result = result + greedyWhileLoop(num, den);
    console.log(result);
    //do while loops
    result = "Unit fractions of " + num + "/" + den + " are: ";
    result = result + greedyDoWhileLoop(num, den);
    console.log(result);

    //for loops do not make sense
    result = "Unit fractions of " + num + "/" + den + " are: ";
    result = result + greedyForLoop(num, den);
    console.log(result);
}

//checks if fraction given is valid
function checkValid(num, den) {
    if (num === 1) {
        console.log("This is already a unit fraction: " + num + "/" + den);
        return false;
    }
    if (num >= den) {
        console.log("This is not a proper fraction, please choose a numerator smaller than the denominator");
        return false;
    }
    if (num < 0 || den < 0) {
        console.log("Please use positive integers for both the numerators and denominators");
        return false;
    }
    return true;
}
//this is returning smth diff from greedyRec - string
function greedyWhileLoop(num, den) {
    var result = "";
    while (num > 0) {
        var biggest = Math.ceil(den / num);
        var result = result + "1/" + biggest;
        num = num * biggest - den;
        den = den * biggest;
        if (num !== 0) {
            result = result + ", ";
        }
    }
    return result;
}

function greedyDoWhileLoop(num, den) {
    var result = "";
    do {
        var biggest = Math.ceil(den / num);
        result = result + "1/" + biggest;
        num = num * biggest - den;
        den = den * biggest;
        if (num !== 0) {
            result = result + ", ";
        }
    } while (num > 0);
    return result;
}
//doesnt make sense but it can work
function greedyForLoop(num, den) {
    var result = "";
    var tempNum;
    for (tempNum = num; tempNum > 0; tempNum--) {
        var biggest = Math.ceil(den / num);
        result = result + "1/" + biggest;
        num = num * biggest - den;
        den = den * biggest;
        if (num !== 0) {
            result = result + ", ";
        }
        tempNum = num + 1; //because for loop will decrement it
    }
    return result;
}

greedy(4,21);
greedy(3,7);