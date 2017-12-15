//global varible used in player and world class
const SIZE = 15;
//used in MenuInputManager and Player
const DEF_SENS = 4;

window.addEventListener('DOMContentLoaded', function () {
        
    new Game();
});

Game = function () {
    this.canvas = document.getElementById('renderCanvas');
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    var _this = this;

    this.world = new World(this);
    this.player = new Player(this);
    this.targetManager = new TargetManager(this);
    var menuInputManager = new MenuInputManager(this);
    menuInputManager.setUpMenu();

    this.engine.runRenderLoop(function () {
        _this.scene.render();
    });

    window.addEventListener('resize', function () {
        if (!_this.engine.isFullscreen) _this.engine.resize();
    });

    window.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            
            case 70:
                if (!_this.engine.isFullscreen) {
                    _this.launchFullScreen();
                    //_this.engine.setSize(1920, 1080);    //remove for production?              
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
                break;
           
        }

    });

    this.launchFullScreen =  function(){
        
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
    };

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
        _this.engine.resize();
    }

};

