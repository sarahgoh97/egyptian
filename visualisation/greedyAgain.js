// First lets create our drawing surface out of existing SVG element
// If you want to create new surface just provide dimensions
// like s = Snap(800, 600);
var s = Snap("#svg");
var counter = 0;
var denominators = [];
var size = 50;

function greedyCall(inputN, inputD) {
    var num = inputN;
    var den = inputD;
    counter = 0;
    //document.write(inputN + "/" + inputD);
    if (den - num > 0 && num > 0 && den > 1) {
        if (den > 20 && den < 50) {
            size = 30;
        } else if (den < 20) {
            size = 50;
        }
        greedy(num, den);
    } else {
        var reject = s.text(20,50,"Please give a proper fraction where the denominator is greater than the numerator that is positive.");
        reject.attr({
            fontSize:'1.5em',
            stroke: '#000',
            opacity: 1
        });

        setTimeout( function() {
            reject.animate({
                opacity: 0
            }, 100);
        }, 2000);
    }
}
function greedy(num, den) { //easier version of greedy
    //document.write("The fraction is " + num + "/" + den + ": ");
    createBar(num, den, counter);
    greedyStart(num, den, den, 0, 50);
    var answer = s.text(130, -30, "The denominators are: " + denominators);
    answer.attr({
        fontSize: '2em'
    });
    setTimeout(function() {
        answer.animate({
            y: 150
        },200);
    },6200 + counter * 8000);

    setTimeout(function() {
        answer.animate({
            y: -30
        },200);
    },8000 + counter * 8000);
    counter++;
    denominators.splice(0,denominators.length);
}

function createBar(num, den, counter) {
    let startX = 50;
    let startY = 0;
    let startWidth = den * size;
    let startHeight = 50;
    var originalFraction = s.rect(startX, startY, 0, startHeight);
    //document.write(startX + " " + startY+ " " + width + " " + height);

    originalFraction.attr({
        fill: "#99f",
        stroke: "#000",
        strokeWidth: 2
    });

    var numerator = s.text(-30, 70, num);
    var denominator = s.text(-30, 100, den);

    var fraction = s.group(numerator, denominator);
    var digits = Math.ceil(Math.log10(den));


    var fracLine = s.line(0, 75, 0, 75);

    fracLine.attr({
        stroke: "#000",
        strokeWidth: 1.5
    });

    fraction.attr({
       fontSize: '2em'
    });

    var startLine = 20 - digits;
    var endLine = 38 + digits;

    setTimeout(function(){
        originalFraction.animate({
            width: startWidth
        },1000);
        numerator.animate({
            x: 20
        },1000);
        denominator.animate({
            x: 20 - digits
        },1000);
        fracLine.animate({
            x1: startLine,
            x2: endLine
        },1000);
    }, 20 + counter * 8000);


    const numberOfLines = den - 1;
    //var divider = s.line(startX + index * 50, startY, startX + index * 50, startY + 50);
    let lines = s.group();

    for (let index = 1; index <= numberOfLines; index++) {
        lines.add(s.line(startX + index * size, startY, startX + index * size, startY));
        //document.write("NUMBER OF LINES = " + index);
    }

    lines.attr({
       stroke: "black",
       strokeWidth: 2
    });
    setTimeout(function() {
        lines.selectAll('line').animate({
        y2: startY+50
    }, 500);
    }, 1020 + counter * 8000);

    let remainder = den - num;
    let blank = s.rect(startX + startWidth - remainder*size, startY, remainder * size, startHeight);
    blank.attr({
        fill: '#faf1ff',
        stroke: "#000",
        opacity: 0
    });
    setTimeout(function(){
        blank.animate({
            opacity: 1
        },500);
    }, 1020 + counter * 8000);

    setTimeout(function() {
        blank.animate({
            opacity: 0
        },300);
        lines.selectAll('line').animate({
            y2: startY
        },300);
        originalFraction.animate({
            opacity: 0
        }, 300);
        blank.remove();
        lines.remove();
        originalFraction.remove();
    }, 8000 + counter * 8000);
    setTimeout(function() {
        numerator.animate({
            x: -30
        },300);
        denominator.animate({
            x: -30
        },300);
        fracLine.animate({
            x2: startLine
        },300);
        numerator.remove();
        denominator.remove();
    }, 8000 + counter * 8000);

}

function greedyStart(num, den, original, iteration, prevStop) {
    if (num === 0) {
        return num;
    }
    else {
        const biggest = Math.ceil(den / num);
        const newNum = num * biggest - den;
        const newDen = den * biggest;
        denominators.push(biggest);
        //document.write("1/" + biggest);
        prevStop = drawGreedy(biggest, original, iteration, prevStop);

        if (newNum > 0)
            //document.write(" +");
        greedyStart(newNum, newDen, original, iteration+1, prevStop);
        return 0;
    }

    function drawGreedy(den, original, iteration, prevStop) {
        var startX = 50;
        var startY = 180;
        var startWidth = original * size;
        var startHeight = 50;
        const space = startWidth / den;

        let fracs = s.group();

        var first = s.rect(startX, startY, 0, startHeight);

        first.attr({
            fill: '#abffa5',
            stroke: '#000',
            strokeWidth: 1,
            opacity: 0.6
        });

        for (let index = 1; index < den; index++) {
            fracs.add(s.rect(startX + index * space, startY, 0, startHeight));
        }

        fracs.attr({
            fill: '#abffa5',
            stroke: '#000',
            strokeWidth: 1,
            opacity: 0.6
        });

        var numerator = s.text(-50, 250, '1');
        var denominator = s.text(-50, 270, den);

        var fraction = s.group(numerator, denominator);
        var fracLine = s.line(0, 255, 0, 255);

        fracLine.attr({
            stroke: "#000",
            strokeWidth: 1.5
        });

        fraction.attr({
            fontSize: '1em'
        });

        //show frac
        setTimeout(function() {
            fracs.selectAll('rect').animate({
                width: space
            }, 300);
            first.animate({
                width: space
            }, 300);
            numerator.animate({
                x: startX + space/2
            }, 300);
            denominator.animate({
                x: startX + space/2
            }, 300);
            fracLine.animate({
                x1: startX + space/2 - 3,
                x2: startX + space/2 + 12
            },300);
        }, 2020 + counter * 8000 + iteration * 1000);

        setTimeout(function() {
            fracs.selectAll('rect').animate({
                width: 0
            }, 300);
        }, 2500 + counter * 8000 + iteration * 1000);
        //move up
        setTimeout(function () {
            first.animate({
                x: prevStop,
                y: 0
            }, 300);
            numerator.animate({
                x: prevStop + space/2,
                y: 80
            }, 300);
            denominator.animate({
                x: prevStop + space/2,
                y: 100
            }, 300);
            fracLine.animate({
                x1: prevStop + space/2 - 3,
                x2: prevStop + space/2 + 12,
                y1: 85,
                y2: 85
            }, 300);
        },3000 + counter * 8000 + iteration * 1000);
        setTimeout(function() {
            first.animate({
                opacity: 0
            }, 300);
        }, 8000 + counter * 8000);
        setTimeout(function () {
            numerator.animate({
                opacity: 0
            }, 300);
            denominator.animate({
                opacity: 0
            }, 300);
            fracLine.animate({
                opacity: 0
            }, 300);
        },8000 + counter * 8000);

        return prevStop + space;
    }
}

//document.write("-------------------------------------------------------------- \n");
//greedy(5,6);

//document.write("-------------------------------------------------------------- \n");
//greedy(3,7);

//document.write("-------------------------------------------------------------- \n");
//greedy(6,7);


/*
        const numberOfLines = den - 1;
        //var divider = s.line(startX + index * 50, startY, startX + index * 50, startY + 50);
        let lines = s.group();

        for (let index = 1; index <= numberOfLines; index++) {
            lines.add(s.line(startX + index * space, startY, startX + index * space, startY));
            //document.write("NUMBER OF LINES = " + index);
        }

        lines.attr({
            stroke: "black",
            strokeWidth: 2
        });
        setTimeout(function() {
            lines.selectAll('line').animate({
                y2: startY+50
            }, 500);
        }, 2020 + counter * 7000 + iteration * 3000);*/