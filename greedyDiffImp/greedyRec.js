//Greedy Recursive Method
//only uses constants and parameters in function
//uses library function with dot operator
function greedy(num, den) {
    /*
    if (num >= den) {
        console.log("This is not a proper fraction, please choose a numerator smaller than the denominator");
        return false;
    }
    if (num < 0 || den < 0) {
        console.log("Please use positive integers for both the numerators and denominators");
        return false;
    }
     */
    if (num === 0) {
        console.log(" ");
        return 0;
    } else { //always possible when numerator is not 0
        //only integer values w/o division and w/o math lib funcs
        //int division func + remainder func
        const unit_fraction_den = Math.ceil(den/num); //func for int div or directly here
        // next step of greedy is not necessarily the next unit fraction,
        // but the next step for int div
        console.log(unit_fraction_den); //just output result
        //fractions explanation
        greedy(num * unit_fraction_den - den, den * unit_fraction_den);
    }
}
//steps
//1. compute den
//2. call greedy with new parameters
//options for what to return
    //string? array? ll? set?
        //prob with string: no longer a number + needs to be parsed + bigger prob without space
    //string without space -> see need some way to show -> string with comma/space

//explain method in report (like a hypothesis) (this is example)
//5/6 = 1/2 + 1/3 = 3/6 + 2/6
//cut into halves until they get 6 halves (3 pizzas)
//cut into thirds until they get 6 thirds (2 pizzas)
//then they give one of each to each person (since there are 6)
//does this always work? does it depend on order? or why order not impt?
greedy(4,21);
greedy(3,7);
greedy(5,3);

//see how greedy and martin book link