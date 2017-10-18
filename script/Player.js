Player = function (game) {
    var sensMultip = 0.022;
    var camera;
    var isJumping = false;
    var noclip = false;
    scene = game.scene;
    canvas = game.canvas;


    (function createCamera() {
        // Need a free camera for collisions
        camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 4, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);


        if (!noclip) {
            camera.applyGravity = true;
            //Then apply collisions and gravity to the active camera
            camera.checkCollisions = true;
        }

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

        // Enable Collisions
        scene.collisionsEnabled = true;

    })();



    window.addEventListener('keyup', (event) => {
        switch (event.keyCode) {
            case 78:
                console.log("noclip");
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
            var pickName = pickResult.pickedMesh.name;
            if (pickResult.pickedMesh != null) {

                if (pickName == "target" && pickResult.pickedMesh.visibility != 0) {
                    game.targetManager.disableTarget();
                } else if(pickName == "p0" || pickName == "p4" || pickName == "p8" || pickName == "p12"){
                    camera.position = new BABYLON.Vector3(0, 4, -10);
                } else if(pickName == "p1" || pickName == "p5" || pickName == "p9" || pickName == "p13"){
                    camera.position = new BABYLON.Vector3(0, 6, -10 - SIZE * 1.25);
                } else if(pickName == "p2" || pickName == "p6" || pickName == "p10" || pickName == "p14"){
                    camera.position = new BABYLON.Vector3(0, 8, -10 - 2 * SIZE * 1.25);
                }  else if(pickName == "p3" || pickName == "p7" || pickName == "p11" || pickName == "p15"){
                    camera.position = new BABYLON.Vector3(0, 10, -10 - 3 * SIZE * 1.25);
                } else if(pickName == "st"){
                   game.world.startStop();
                }
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

}



