function calculator() {
    var individualCharacters = [];
    var openBrackets = 0;
    var possibleOperands = ["+", "-", "*", "/"];
    var lastResult = "", equalPressedLast = false;
    var returnPayload = {};

    this.parseEntry = function (singleEntry) {
        var lastEntry = null;
        var executableCharacters = [];

        if (equalPressedLast) {
            equalPressedLast = false;
            if (possibleOperands.indexOf(singleEntry) == -1) {
                this.reset();
            }
        }

        lastEntry = individualCharacters[individualCharacters.length - 1];

        //Solving continous operator dilemma
        if (possibleOperands.indexOf(singleEntry) != -1 && possibleOperands.indexOf(lastEntry) != -1) {
            if (singleEntry == "-" && lastEntry != "+") {
                individualCharacters.push(singleEntry);
            } else {
                if (possibleOperands.indexOf(individualCharacters[individualCharacters.length - 2]) != -1) {
                    individualCharacters.splice(individualCharacters.length - 1, 1);
                }
                individualCharacters[individualCharacters.length - 1] = singleEntry;
            }
            //Numbers are pushed
        } else if (!isNaN(singleEntry) || possibleOperands.indexOf(singleEntry) != -1) {
            individualCharacters.push(singleEntry);
        } else if (singleEntry == "(" && (possibleOperands.indexOf(lastEntry) != -1 || !individualCharacters.length || lastEntry == "(")) {
            openBrackets++;
            individualCharacters.push(singleEntry);
        } else if ((singleEntry == ")" || lastEntry != "(") && openBrackets > 0) {
            openBrackets--;
            individualCharacters.push(singleEntry);
        }
        //avoid adding multiple dots in single integer.
        else if (singleEntry == "." && lastEntry != "." && individualCharacters.length) {
            var dotIndex = individualCharacters.lastIndexOf(".");
            var combinedString = individualCharacters.join("");
            var regex = /[\/\+\-\*]/g;
            var operatorIndex = -1;
            while (regex.test(combinedString) == true) {
                operatorIndex = regex.lastIndex;
            }
            if ((operatorIndex == -1 && dotIndex == -1) || operatorIndex > dotIndex) {
                individualCharacters.push(singleEntry);
            }
        }

        executableCharacters = JSON.parse(JSON.stringify(individualCharacters));

        var bracketsInexecutable = openBrackets;
        while (executableCharacters[executableCharacters.length - 1] == "(") {
            executableCharacters.splice(executableCharacters.length - 1, 1);
            bracketsInexecutable--;
        }

        if (possibleOperands.indexOf(executableCharacters[executableCharacters.length - 1]) != -1) {
            if (possibleOperands.indexOf(executableCharacters[executableCharacters.length - 2]) != -1) {
                executableCharacters.splice(executableCharacters.length - 2, 2);
            } else {
                executableCharacters.splice(executableCharacters.length - 1, 1);
            }
        }

        for (bracketCounter = 0; bracketCounter < bracketsInexecutable; bracketCounter++) {
            executableCharacters.push(")");
        }

        returnPayload.evaluatedExpression = executableCharacters.join("");
        returnPayload.actualExpression = individualCharacters.join("");
        lastResult =  eval(returnPayload.evaluatedExpression);
        lastResult = returnPayload.result = lastResult != undefined ? lastResult : "";

        return returnPayload;
    }

    //Resets the memory
    this.reset = function () {
        individualCharacters = [];
        openBrackets = 0;
    }

    //Reset memory and set it to the final value
    this.equalPressed = function () {
        var parsedResult = "";
        var calculatorContext = this;
        this.reset();
        ("" + lastResult).split("").forEach(function (singleEntry) {
            parsedResult = calculatorContext.parseEntry(singleEntry);
        });
        equalPressedLast = true;
        return parsedResult;
    }

    //This function can be used to evaluate any expression.
    /*
    *console.log(calculator1.evaluateExpression("2+4.5"));
    */
    this.evaluateExpression = function (expression) {
        var regex = /^[0-9\/\+\-\*\.\(\)]+$/;
        var parsedResult = "";
        var calculatorContext = this;
        if (!regex.test(expression)) {
            console.error("Expression contains non-acceptable characters.");
            return { "error": "Expression contains non-acceptable characters." };
        }
        ("" + expression).split("").forEach(function (singleEntry) {
            parsedResult = calculatorContext.parseEntry(singleEntry);
        });
        return parsedResult;
    }
}