//returns the natural number if it is a natural number
//returns NaN otherwise
function math_natural(value) {
    const rounded = math_round(value);
    return rounded === value && value > 0
        ? value
        : NaN;
}

math_natural(3.5);