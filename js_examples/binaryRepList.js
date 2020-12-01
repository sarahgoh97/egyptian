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
    const nonRepeatingLists = getNonRep(frac);
    const nonRepeatingBinary = head(nonRepeatingLists);
    const remainders = head(tail(nonRepeatingLists));
    const last_remainder = head(tail(tail(nonRepeatingLists)));
    const length_of_nonRep = length(nonRepeatingBinary);
    const first_index_repeated = index(remainders, last_remainder);

    const no_of_reps = length_of_nonRep - first_index_repeated;
    const start_of_rep = pointer(nonRepeatingBinary, no_of_reps);
    return getRep(nonRepeatingBinary, first_index_repeated,
        no_of_reps);
    //keep nonrep for length of rep, or until repeat starts
//    const rep = getRep(frac, rep);
//return append(non_rep, rep);
}

function getNonRep(frac) {
    function iter(num, den, rem, binary) {
        if(contains(rem, num)) {
            return list(binary, rem, num);
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

function getRep(nonRepeatingBinary, first_rep, no_of_reps) {
    function iter(nonRepeatingBinary, next, no_of_reps, counter) {
        return counter >= no_of_reps
            ? nonRepeatingBinary
            : iter(append(nonRepeatingBinary,
                list(head(next))),
                tail(next),
                no_of_reps, counter + 1);
    }
    const start_of_rep = pointer(nonRepeatingBinary, first_rep);
    const starting_length = length(nonRepeatingBinary);
    return iter(nonRepeatingBinary, start_of_rep,
        no_of_reps * 2 - starting_length, 0);
}


function pointer(seq, idx) {
    function iter(seq, idx, counter) {
        return counter >= idx
            ? seq
            : iter(tail(seq), idx, counter + 1);
    }
    return iter(seq, idx, 0);
}

function contains(seq, val) {
    return is_null(seq)
        ? false
        : head(seq) === val
            ? true
            : contains(tail(seq), val);
}

function index(seq, val) {
    function iter(seq, val, idx) {
        return is_null(seq)
            ? -1
            : head(seq) === val
                ? idx
                : iter(tail(seq), val, idx + 1);
    }
    return iter(seq, val, 0);
}


get_binary(make_frac(5,22));

