
window.addEventListener('DOMContentLoaded', function () {
    new Game();
});

Game = function () {
    this.canvas = document.getElementById('renderCanvas');
    engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(engine);
    this.targetsHit = 0;
    this.totalTargets = 0;

    /* Debug layer not working
    BABYLON.DebugLayer.InspectorURL = 'http://preview.babylonjs.com/inspector/babylon.inspector.bundle.js';
    this.scene.debugLayer.show();*/

    var world = new World(this);
    var player = new Player(this);
    this.targetManager = new TargetManager(this);

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener('resize', function () {
        engine.resize();
    });

}

