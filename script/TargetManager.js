var scene;
var target;
TargetManager = function (game) {
    scene = game.scene;
    target = scene.getMeshByName("target");
}

TargetManager.prototype = {
    destroy: function (){
        target.visibility = 0;
    }
};
 