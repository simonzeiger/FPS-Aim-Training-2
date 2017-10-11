var camera;
var sensMultip = 0.022;
var sensitivity = 1.6;

Player = function (game) {

    camera = createCamera(game.scene, game.canvas);
    
    initPointerLock(game.scene, game.canvas);
   
}

//camera work will go here
function createCamera(scene, canvas) {

    // Need a free camera for collisions
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 4, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;
    scene.gravity = new BABYLON.Vector3(0, -1, 0);
    camera.speed = 2; // (copied from old proj) should be either 0 or 1 in the future, once inertia is settled out
    camera.keysUp = [87]; // W
    camera.keysLeft = [65]; // A
    camera.keysDown = [83]; // S
    camera.keysRight = [68]; // D

    camera.inertia = .75; //in future make player have some inertia but without retarded mouse movement
    camera.fov = 1.29154;
    camera.angularSensibility = 500;
    camera.ellipsoid = new BABYLON.Vector3(1, 2, 1);



    // Enable Collisions
    scene.collisionsEnabled = true;

    return camera;
}

function initPointerLock(scene, canvas) {

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

        //continue with shooting requests or whatever :P
        //evt === 0 (left mouse click)
        //evt === 1 (mouse wheel click (not scrolling))
        //evt === 2 (right mouse click)
    };

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