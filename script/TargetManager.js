TargetManager = function (game) {
    var MAX_BAD_X = 2;
    var MIN_BAD_X = -2;
    var MAX_BAD_Y = 8;
    var MIN_BAD_Y = 4;
    var MAX_GOOD_X = 12.5;
    var MIN_GOOD_X = -12.5;
    var MAX_GOOD_Y = 11.5;
    var MIN_GOOD_Y = 1.5;

    scene = game.scene;
    target = scene.getMeshByName("target");
    targetDurTimer = new Timer(750, scene, moveTarget);

    this.disableTarget = function () {
        game.targetsHit++;
        targetDurTimer.reset();
        target.material.diffuseColor = new BABYLON.Color3(0, 0, 0);

        //short delay for visual feedback upon shooting target
        var shotTimer = new Timer(100, scene, moveTarget);
        shotTimer.start();
    }

    function moveTarget() {
        game.totalTargets ++;
        target.visibility = 0;
        target.position = getNextPosition();
        var delayTimer = new Timer(500, scene, startTarget);
        delayTimer.start();
    }

    function startTarget() {
        console.log("targets hit: ", game.targetsHit, "total targets: ", game.totalTargets)
        targetDurTimer.reset()
        target.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        target.visibility = 1;
        targetDurTimer.start();
    }

    //return Babylon vector3
    function getNextPosition() {
        var x = 0;
        var y = 0;
        while ((x < MAX_BAD_X && x > MIN_BAD_X) ||  (y < MAX_BAD_Y && y > MIN_BAD_Y)) {
                x = Math.random() * Math.abs(MAX_GOOD_X - MIN_GOOD_X) - MAX_GOOD_X;
                y = Math.random() *  Math.abs(MAX_GOOD_Y - MIN_GOOD_Y) + MIN_GOOD_Y;
        }
        return new BABYLON.Vector3(x , y, target.position.z);
    }

}




