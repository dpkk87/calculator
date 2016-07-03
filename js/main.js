var calculator1 = new calculator();
function send(entry) {
    var result = calculator1.parseEntry(entry);
    document.getElementById("displayInput").innerHTML = result.actualExpression;
    document.getElementById("displayOutput").innerHTML = result.result;
}

function reset(resetOutput) {
    calculator1.reset();
    document.getElementById("displayInput").innerHTML = "";
    if (resetOutput) {
        document.getElementById("displayOutput").innerHTML = "";
    }
}

function equalPressed(){
    var result = calculator1.equalPressed();
    document.getElementById("displayInput").innerHTML = result.actualExpression;
    document.getElementById("displayOutput").innerHTML = "";
}
