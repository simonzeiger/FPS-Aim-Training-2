//used in MenuInputManager
const DEF_SENS = 4;
Player = function (game) {
    
    this.currentSens = 4;
    const DEF_YAW = 0.022;
    this.currentYaw = DEF_YAW;
    const DEF_PITCH = 0.022;
    var currentPitch = DEF_PITCH;
    const DEGREE_RAD_CONV = 57.2958;
    this.invertYRot = false;
    this.invertXRot = false;
    const CAMERA_INIT_Z = -2;

    var camera;
    var isJumping = false;
    var noclip = false;
    var scene = game.scene;
    var canvas = game.canvas;

    var _this = this;

    //"constructor"
    (function Player() {
        createCamera();
        handleMouse();
    })();

    function createCamera() {
        // Need a free camera for collisions
        camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 4, -4), scene);

        // This targets the camera to scene origin
        camera.setTarget(new BABYLON.Vector3(0, 4, 0));

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);


        if (!noclip) {
            camera.applyGravity = true;
            camera.checkCollisions = true;
        }

        camera.speed = 1;
        camera.keysUp = [87]; // W
        camera.keysLeft = [65]; // A
        camera.keysDown = [83]; // S
        camera.keysRight = [68]; // D
        camera._needMoveForGravity = true;

        camera.inertia = .75;
        camera.fov = 1.309;
        updateSens(DEF_SENS, DEF_YAW);
        camera.ellipsoid = new BABYLON.Vector3(1.5, 2, 1.5); 

        // Enable Collisions
        scene.collisionsEnabled = true;

    }

    //used in MenuInputManager
    this.updateSensitivity = function (sens, yaw) {
        updateSens(sens, yaw);
    }

    function updateSens(sens, yaw){
        
        currentPitch = yaw;
        if (!_this.invertXRot) {
            camera.angularSensibilityX = DEGREE_RAD_CONV / (currentPitch * sens);
        } else {
           camera.angularSensibilityX = DEGREE_RAD_CONV / (-currentPitch * sens);
        }

        if (!_this.invertYRot) {
            camera.angularSensibilityY = DEGREE_RAD_CONV / (yaw * sens);
        } else {
            camera.angularSensibilityY = DEGREE_RAD_CONV / (-yaw * sens);
        }
        _this.currentSens = sens;
        _this.currentYaw = yaw;
    }

    function handleMouse() {
        handlePicking();
        handlePointerLock();
    }

    function handlePicking() {
        var isLocked = false;

        // On click event, request pointer lock
        scene.onPointerDown = function (evt) {

            //true/false check if we're locked, faster than checking pointerlock on each single click.
            if (!isLocked) {
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }
            }

            var pickResult = scene.pick(scene.getEngine().getRenderWidth() / 2, scene.getEngine().getRenderHeight() / 2);
            var pickName = pickResult.pickedMesh.name;
            if (pickResult.pickedMesh != null) {


                if (pickName == "target" && pickResult.pickedMesh.visibility != 0) {
                    game.targetManager.disableTarget();
                } else if (pickName == "p4" || pickName == "p8" || pickName == "p12") {
                    camera.position = new BABYLON.Vector3(0, 4, -4);
                } else if (pickName == "p1" || pickName == "p9" || pickName == "p13") {
                    camera.position = new BABYLON.Vector3(0, 6, CAMERA_INIT_Z - SIZE * 1.25);
                } else if (pickName == "p2" || pickName == "p6" || pickName == "p14") {
                    camera.position = new BABYLON.Vector3(0, 8, CAMERA_INIT_Z - 2 * SIZE * 1.25);
                } else if (pickName == "p3" || pickName == "p7" || pickName == "p11") {
                    camera.position = new BABYLON.Vector3(0, 10, CAMERA_INIT_Z - 3 * SIZE * 1.25);
                } else if (pickName == "st") {
                    game.world.startStop();
                }
            }

        };
    }

    function handlePointerLock() {

        // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
        var pointerlockchange = function (event) {

            var controlEnabled = document.pointerLockElement || document.mozPointerLockElement
                || document.webkitPointerLockElement || document.msPointerLockElement || false;

            // If the user is already locked
            if (!controlEnabled) {
                camera.detachControl(canvas);
                isLocked = false;
            } else {
                camera.attachControl(canvas);
                isLocked = true;
            }
        };

        //Attach events to the document
        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    }

    window.addEventListener('keyup', (event) => {
        switch (event.keyCode) {
            case 78:
                noclip = !noclip;
                if (noclip) {
                    camera.applyGravity = false;
                    //Then apply collisions and gravity to the active camera
                    camera.checkCollisions = false;
                } else {
                    camera.applyGravity = true;
                    //Then apply collisions and gravity to the active camera
                    camera.checkCollisions = true;
                }
                break;
            
        }
    });
}


