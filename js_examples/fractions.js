function make_frac(num, den) {
    //checking for natural numbers for num and den
    //checking for num smaller than den maybe?
    console.log(num + "/" + den);
    return pair(num, den);
}
function num(frac) {
    return head(frac);
}
function den(frac) {
    return tail(frac);
}

function print_frac(frac) {
    display(num(frac));
    display("-");
    display(den(frac));
}

function pair(first, second) {
    return {first, second};
}

make_frac(-2>> 23,3);

