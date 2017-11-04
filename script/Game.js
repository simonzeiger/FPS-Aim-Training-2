//global varible used in player and world class
const SIZE = 15;

window.addEventListener('DOMContentLoaded', function () {
    new Game();
});

Game = function () {
    this.canvas = document.getElementById('renderCanvas');
    engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(engine);
    _this = this;
    var isFullscreen = false;


    /* Debug layer not working
    BABYLON.DebugLayer.InspectorURL = 'http://preview.babylonjs.com/inspector/babylon.inspector.bundle.js';
    this.scene.debugLayer.show();*/

    this.world = new World(this);
    var player = new Player(this);
    this.targetManager = new TargetManager(this);

    engine.runRenderLoop(function () {
        _this.scene.render();
    });

    window.addEventListener('resize', function () {
        if(!isFullscreen) engine.resize();
    });

    window.addEventListener('keyup', (event) => {
        switch (event.keyCode) {

            case 70:
                if(!isFullscreen){
                    isFullscreen = true;
                    launchFullScreen();
                  //  engine.setSize(1280, 1024);                    
                } else {
                    isFullscreen = false;
                    quitFullscreen();
                }
                break;
        }

    });

    function launchFullScreen() {
        var element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    function quitFullscreen() {
        var element = document;
        if (element.exitFullscreen) { 
            element.exitFullscreen(); 
        }
        else if (element.mozCancelFullScreen) {
            element.mozCancelFullScreen();
        } else if (element.webkitCancelFullScreen) {
            element.webkitCancelFullScreen();
        } else if (element.msExitFullscreen) {
            element.msExitFullscreen();
        }
    } 

}

