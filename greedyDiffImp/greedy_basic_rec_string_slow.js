/* Greedy method using things from chapter 1
 * naming of elements with const
 * recursive calling function (greedy function)
 * iterative calling function (find_den function)
 * returns a string with space as delimiter (use comma instead - csv, xml, ascii) */
function greedy(num, den) {
    if (num === 0) {
        return "";
    } else {
        //largest unit fraction = the integer value that is at least den / num
        const unit_fraction_den = find_den(num, den);
        return unit_fraction_den + " " +  greedy(num * unit_fraction_den - den, den * unit_fraction_den);
        //return unit_fraction_den + greedy(num * unit_fraction_den - den, den * unit_fraction_den); //without whitespace
    }
}
/* finding biggest unit fraction (uf) smaller than num / den by brute force
 * when denominator of uf increases, value of uf shrinks
 * stops when num / den >= 1 / uf => num * uf >= den */
function find_den(num, den) {
    function iter(num, den, ufDen) {
        return ufDen * num < den
            ? iter(num, den, ufDen + 1)
            : ufDen;
    }
    return iter(num, den, 1);
}

console.log(greedy(4, 21));
console.log(greedy(3, 7));
