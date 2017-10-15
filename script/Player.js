Player = function (game) {
    var sensMultip = 0.022;
    var camera;
    var isJumping = false;
    scene = game.scene;
    canvas = game.canvas;
    var jumpTimer = new Timer(300, scene, stopJumping);
    

    (function createCamera() {
        // Need a free camera for collisions
        camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 4, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        //Then apply collisions and gravity to the active camera
        camera.checkCollisions = true;
        camera.applyGravity = true;
        scene.gravity = new BABYLON.Vector3(0, -1, 0);
        camera.speed = 2;
        camera.keysUp = [87]; // W
        camera.keysLeft = [65]; // A
        camera.keysDown = [83]; // S
        camera.keysRight = [68]; // D
        camera._needMoveForGravity = true;

        camera.inertia = .75;
        camera.fov = 1.29154;
        camera.angularSensibility = 500;
        camera.ellipsoid = new BABYLON.Vector3(1, 2, 1); //not working properly
        camera.checkCollisions = true;

        // Enable Collisions
        scene.collisionsEnabled = true;

        return camera;
    })();

   /* fucking around with jump code 
   window.addEventListener("keypress", onKeyUp, false); function onKeyUp(event) {
        switch (event.keyCode) {
            case 32:
                isJumping = true;
                jumpTimer.start();
                break;
        }
    }*/

    (function handleMouse() {

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

           

            if (pickResult.pickedMesh != null && pickResult.pickedMesh.name == "target" && pickResult.pickedMesh.visibility != 0) {
                game.targetManager.disableTarget();
            }

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
    })();

    /*function stopJumping(){
        isJumping = false;
        jumpTimer.reset();
        camera.inertia = .75;
    }

   /* scene.registerBeforeRender( function (){
        if(isJumping){
            camera.position.y += (.0005 * scene.getEngine().getDeltaTime()) * jumpTimer.currentTime;
            camera.inertia = .9;
        }
    });*.
}



