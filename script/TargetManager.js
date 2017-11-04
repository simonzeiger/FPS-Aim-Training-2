TargetManager = function (game) {
    const MAX_BAD_X = 2;
    const MIN_BAD_X = -2;
    const MAX_BAD_Y = 8;
    const MIN_BAD_Y = 4;
    const MAX_GOOD_X = 12.5;
    const MIN_GOOD_X = -12.5;
    const MAX_GOOD_Y = 11.25;
    const MIN_GOOD_Y = 1.75;

    //used in world class
    this.start = false;

    var maxTargets = 25;
    var delay = .5;
    var tarDuration = .75;

    var targetsHit = 0;
    var totalTargets = 0;

    var scene = game.scene;

    var target = scene.getMeshByName("target");

    var targetDurTimer = new Timer(tarDuration * 1000, scene, moveTarget);

    //short delay for visual feedback upon shooting target
    var shotTimer = new Timer(100, scene, moveTarget);

    var delayTimer = new Timer(delay * 1000, scene, startTarget);

    var targetSoundEnabled = false;

    var targetDing;
    if(targetSoundEnabled) targetDing = new BABYLON.Sound("tDing", "assets/ding.wav", scene);
    

    this.disableTarget = function () {
        targetsHit++;
        scene.getMeshByName("ht").material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
        scene.getMeshByName("ht").material.diffuseTexture.drawText(scoreString(targetsHit), 100, 800, "500px arial", "white", "transparent");

        targetDurTimer.reset();
        delayTimer.reset();

        target.material.diffuseColor = new BABYLON.Color3(0, 0, 0);

        shotTimer.reset();
        shotTimer.start();
        if(targetSoundEnabled) targetDing.play();
    }

    function moveTarget() {

        totalTargets++;

        scene.getMeshByName("mt").material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
        scene.getMeshByName("mt").material.diffuseTexture.drawText(scoreString(totalTargets - targetsHit),
            110, 350, "100px arial", "white", "transparent");

        target.visibility = 0;
        target.position = getNextPosition();

        if (totalTargets < maxTargets) {
            delayTimer.reset();

            delayTimer.start();
        } else {
            game.world.startStop();
        }

    }

    function startTarget() {

        targetDurTimer.reset()
        target.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        target.visibility = 1;
        targetDurTimer.start();

    }

    //return Babylon vector3
    function getNextPosition() {
        var x = 0;
        var y = 0;
        while ((x < MAX_BAD_X && x > MIN_BAD_X) || (y < MAX_BAD_Y && y > MIN_BAD_Y)) {
            x = Math.random() * Math.abs(MAX_GOOD_X - MIN_GOOD_X) - MAX_GOOD_X;
            y = Math.random() * Math.abs(MAX_GOOD_Y - MIN_GOOD_Y) + MIN_GOOD_Y;
        }
        return new BABYLON.Vector3(x, y, target.position.z);
    }

    function scoreString(count) {
        if (count >= 0 && count < 10)
            return "00" + count;
        else if (count >= 10 && count < 100)
            return "0" + count;
        else
            return count + "";
    }

    this.begin = function () {
        scene.getMeshByName("ht").material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
        scene.getMeshByName("ht").material.diffuseTexture.drawText("000", 100, 800, "500px arial",
            "white", "transparent");
        scene.getMeshByName("mt").material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
        scene.getMeshByName("mt").material.diffuseTexture.drawText("000", 110, 350, "100px arial",
         "white", "transparent");

        totalTargets = 0;
        targetsHit = 0;
        target.position = getNextPosition();
        delayTimer.start();
    }

    this.end = function () {
        targetDurTimer.reset();
        delayTimer.reset();
        shotTimer.reset();
        target.visibility = 0;
    }

}




