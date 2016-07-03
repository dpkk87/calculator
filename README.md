# Calculator
Minimal calculator program

#Example

1. To evaluate expression

var calculator1 = new calculator();
calculator1.evaluateExpression("4+2*6");

Output:

{
evaluatedExpression: "4+2*6", 
actualExpression: "4+2*6", 
result: 16
}

2. Evaluate each entry in to calculator

var calculator1 = new calculator();
var result = calculator1.parseEntry("4");
var result = calculator1.parseEntry("+");
var result = calculator1.parseEntry("2");
var result = calculator1.parseEntry("*");
var result = calculator1.parseEntry("6");

Final Output:

{
evaluatedExpression: "4+2*6", 
actualExpression: "4+2*6", 
result: 16
}

calculator1.equalPressed();

{
evaluatedExpression: "16", 
actualExpression: "16", 
result: 16
}

calculator1.reset();

resets the expression back from nothing.




