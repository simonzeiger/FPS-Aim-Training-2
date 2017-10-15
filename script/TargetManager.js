
TargetManager = function (game) {
    scene = game.scene;
    target = scene.getMeshByName("target");
    this.targetDurTimer = new Timer(750, scene, moveTarget);
    
    this.disableTarget = function (){
        target.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        var delayTimer = new Timer(100, scene, moveTarget);
        delayTimer.start();
    }

    function moveTarget(){
        target.visibility = 0;
        //move target
        startTarget();
    }
    
    function startTarget(){
        target.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        target.visibility = 1;
        //this.targetDurTimer.start;
    }
    
}




