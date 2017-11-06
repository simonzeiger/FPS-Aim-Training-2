//global varible used in player and world class
const SIZE = 15;

window.addEventListener('DOMContentLoaded', function () {
    new Game();
});

Game = function () {
    this.canvas = document.getElementById('renderCanvas');
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    var _this = this;
    var isFullscreen = false;


    /* Debug layer not working
    BABYLON.DebugLayer.InspectorURL = 'http://preview.babylonjs.com/inspector/babylon.inspector.bundle.js';
    this.scene.debugLayer.show();*/

    this.world = new World(this);
    this.player = new Player(this);
    this.targetManager = new TargetManager(this);
    var menuInputManager = new MenuInputManager(this);
    menuInputManager.setUpMenu();

    this.engine.runRenderLoop(function () {
        _this.scene.render();
    });

    window.addEventListener('resize', function () {
        if (!isFullscreen) _this.engine.resize();
    });

    window.addEventListener('keyup', (event) => {
        switch (event.keyCode) {

            case 70:
                if (!isFullscreen) {

                    _this.launchFullScreen();
                    _this.engine.setSize(1920, 1080);    //remove for production?              
                } else {

                    quitFullscreen();
                }
                break;
            case 77:
                var form = $("#form");
                form.toggle();

                $('#big').toggle();

                if (form.is(":visible")) {
                    document.exitPointerLock = document.exitPointerLock ||
                        document.mozExitPointerLock ||
                        document.webkitExitPointerLock;

                    // Attempt to unlock
                    document.exitPointerLock();

                } else {
                    menuInputManager.reset();
                }
        }

    });

    this.launchFullScreen =  function(){
        isFullscreen = true;
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
        isFullscreen = false;
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
        _this.engine.resize();
    }

    

    

}

