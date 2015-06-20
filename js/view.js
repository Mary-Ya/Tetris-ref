window.onload = function() {
    round = new Round();
    display = new Display(round.pausedScene);
};

Display = function(firstScene) {
    // display appers when window loaded
    // first scene displaying
    this.scene(firstScene);
    this.message("PRESS SPACE TO START");

};

Display.prototype.scene = function(sceneToView) {
    // to output the array
    var sceneBlocks = sceneToView.get();
    var output = document.querySelector("#scene");
    output.innerHTML = "";
    //console.log(output);
    for (i = 0; i < 20; i++) {
        var line = document.createElement("div");
        var thisLine = output.appendChild(line);
        for (j = 0; j < 10; j++) {
            var newDiv = document.createElement("div");
            newDiv.className = "pixel";
            if (sceneBlocks[i][j] !== 0) {
                //newDiv.style.backgroundColor = colorList[a[i][j] - 1]; // DON'T WORK IN IE
                newDiv.style.background = colorList[sceneBlocks[i][j] - 1];
            };
            thisLine.appendChild(newDiv);
        };
    };
};

Display.prototype.message = function(text) {
    var sceneDiv = document.querySelector("#scene");
    var messageDiv = document.createElement("div");
    messageDiv.className = "panel message";
    messageDiv.innerHTML = text;
    messageDiv.setAttribute('align', 'center');
    sceneDiv.appendChild(messageDiv);
};

Display.prototype.info = function(block, text) {
    var output = document.querySelector(block);
    output.innerHTML = text;
};


Display.prototype.nextTetro = function() {
    var names = ["I", "T", "J", "L", "O", "Z", "S"];
    var inThisBar = "";
    if (round.step < 7) {
        inThisBar = names[tetroBar[round.step + 1]];
    } else {
        inThisBar = names[nextTetroBar[tetroBar[0]]];
    }
    display.info("#nextFigure", "Next figure: " + inThisBar);
    var speedToView = 1000 - round.speed;
    display.info("#speed", "Speed: " + speedToView);
    display.info("#scores", "Score: " + round.scores);
};

Display.prototype.fade = function(scene) {

    if (round.over == false) {
        scene.colorRandomly();
        display.scene(scene);
        display.message("PAUSED PRESS SPACE TO CONTINUE");
        console.log("Paused");
    };
};
