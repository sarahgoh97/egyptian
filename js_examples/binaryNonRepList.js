function make_frac(num, den) {
    return pair(num, den);
}
function num(frac) {
    return head(frac);
}
function den(frac) {
    return tail(frac);
}

function get_binary(frac) {
    return getNonRep(frac);
//    const non_rep = getNonRep(frac);
//    const rep = getRep(frac, rep);
//return append(non_rep, rep);
}

function getNonRep(frac) {
    function iter(num, den, rem, binary) {
        if(contains(rem, num)) {
            return binary;
        } else {
            rem = is_null(rem)
                ? list(num)
                : append(rem, list(num));
            const new_num = num < den
                ? num * 2
                : (num - den) * 2;
            binary = num < den
                ? is_null(binary)
                    ? list(0)
                    : append(binary, list(0))
                : is_null(binary)
                    ? list(1)
                    : append(binary, list(1));
            return iter(new_num, den, rem, binary);
        }
    }
    return iter(num(frac), den(frac), null, null);
}

function contains(seq, val) {
    return is_null(seq)
        ? false
        : head(seq) === val
            ? true
            : contains(tail(seq), val);
}

get_binary(make_frac(5,22));

