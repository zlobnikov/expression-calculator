function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    const spaced = expr.trim().replace(/(\D)/g, ' $1 ');
    const result = spaced.trim().split(/\s+/);

    checkBrackets(result);
    calcInBrackets(result);

    multiplyOrDivide(result);
    sumOrSubtract(result);

    return result[0];
}

function checkBrackets(expr) {
    let counter = 0;

    for (let i = 0; i < expr.length; ++i) {
        if (counter < 0) throw 'ExpressionError: Brackets must be paired';
        else if (expr[i] === '(') ++counter;
        else if (expr[i] === ')') --counter;
    }

    if (counter !== 0) throw 'ExpressionError: Brackets must be paired';
}

function calcInBrackets(expr) {
    let start;

    for (let i = 0; i < expr.length; ++i) {
        if (expr[i] === '(') start = i;
        else if (expr[i] === ')') {
            const insideBrackets = expr.slice(start + 1, i);
            // don't take brackets

            multiplyOrDivide(insideBrackets);
            sumOrSubtract(insideBrackets);

            expr.splice(start, i + 1 - start, insideBrackets[0]);

            i = -1;
            // reset index and don't forget about increment
        }
    }
    return expr;
}

function multiplyOrDivide(expr) {
    for (let i = 1; i < expr.length - 1; ++i) {
        if (expr[i] === '*') {
            expr.splice(i - 1, 3, expr[i - 1] * expr[i + 1]);
            --i;

        } else if (expr[i] === '/') {
            if (expr[i + 1] === '0') throw 'TypeError: Division by zero.';
            expr.splice(i - 1, 3, expr[i - 1] / expr[i + 1]);
            --i;
        }
    }
}

function sumOrSubtract(expr) {
    for (let i = 1; i < expr.length - 1; ++i) {
        if (expr[i] === '+') {
            expr.splice(i - 1, 3, +expr[i - 1] + +expr[i + 1]);
            --i;

        } else if (expr[i] === '-') {
            expr.splice(i - 1, 3, expr[i - 1] - expr[i + 1]);
            --i;
        }
    }
}

module.exports = {
    expressionCalculator
}