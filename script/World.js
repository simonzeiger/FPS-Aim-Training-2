World = function (game) {

    //set the global variable for ease of use
    var scene = game.scene;
    var _this = this;

    var shadowGenerator;

    var targetSize = 1; //def 1

    var target;
    
    //"constructor"
    (function Wolrd() {
        //set gravity
        scene.gravity = new BABYLON.Vector3(0, -1, 0);

        //background color
        scene.clearColor = new BABYLON.Color3(0.192, .302, .475);
        var hemiLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        hemiLight.intensity = 1.2;

        var dirLight = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(2, -6, -4.75), scene);
        dirLight.position = new BABYLON.Vector3(0, 40, 0);
        dirLight.intensity = 2;

        shadowGenerator = new BABYLON.ShadowGenerator(3096, dirLight);
        shadowGenerator.bias = 0.000005;


        createMeshes();

    })();

    function createMeshes() {
        createBuilding();
        createOther();
    }

    function createBuilding() {
        // built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground1 = BABYLON.Mesh.CreateGround("ground1", SIZE * 2, SIZE * 2, 1, scene);
        ground1.material = new BABYLON.StandardMaterial("groundMat", scene);
        ground1.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);
        ground1.material.backFaceCulling = false;
        ground1.receiveShadows = true;
        ground1.checkCollisions = true;

        var ground2 = BABYLON.Mesh.CreateGround("ground2", SIZE * 2, SIZE * 1.25, 1, scene);
        ground2.position.y = 2;
        ground2.position.z = -SIZE * 1.65;
        ground2.material = ground1.material;
        ground2.receiveShadows = true;
        ground2.checkCollisions = true;

        var ground3 = ground2.createInstance("ground3");
        ground3.position.y = 4;
        ground3.position.z = -SIZE * 1.65 - SIZE * 1.25;
        ground3.receiveShadows = true;
        ground3.checkCollisions = true;

        var ground4 = ground2.createInstance("ground4");
        ground4.position.y = 6;
        ground4.position.z = -SIZE * 1.65 - 2 * (SIZE * 1.25);
        ground4.receiveShadows = true;
        ground4.checkCollisions = true;

        var wall1 = BABYLON.MeshBuilder.CreatePlane("wall1", { height: SIZE - (SIZE * .05), width: SIZE * 2 }, scene);
        wall1.material = new BABYLON.StandardMaterial("wallMat", scene);
        wall1.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        wall1.material.backFaceCulling = false;
        wall1.position = new BABYLON.Vector3(0, SIZE / 2 - (SIZE * .05), SIZE);
        wall1.checkCollisions = true;
        //make wall1 cast a shadow
        shadowGenerator.getShadowMap().renderList.push(wall1);

        var wall2 = createWall("wall2", [SIZE, SIZE / 2, 0], [0, Math.PI / 2, 0]);
        wall2.receiveShadows = true;

        var wall3 = createWall("wall3", [-SIZE, SIZE / 2, 0], [0, - Math.PI / 2, 0]);
        shadowGenerator.getShadowMap().renderList.push(wall3);

        function createWall(id, position, rotation) {
            var wall = BABYLON.MeshBuilder.CreatePlane(id, { height: 6, width: SIZE * 2.05 + SIZE * 1.25 * 3 }, scene);
            wall.material = new BABYLON.StandardMaterial("wall23Mat", scene);
            wall.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);
            wall.material.backFaceCulling = false;
            wall.position = new BABYLON.Vector3(position[0], 3, -SIZE * 1.875);
            wall.rotation = new BABYLON.Vector3(rotation[0], rotation[1], rotation[2]);
            wall.checkCollisions = true;
            return wall;

        }

        var littleWall1 = BABYLON.MeshBuilder.CreateBox("lw1", { height: 4.4, width: SIZE * 2 - .05, depth: .5 }, scene);
        littleWall1.material = new BABYLON.StandardMaterial("lwallMat", scene);
        littleWall1.material.diffuseColor = new BABYLON.Color3(.35, .35, .35);
        littleWall1.material.backFaceCulling = false;
        littleWall1.position.z = SIZE * .1;
        littleWall1.receiveShadows = true;
        littleWall1.checkCollisions = true;
        shadowGenerator.getShadowMap().renderList.push(littleWall1);

        var littleWallInstances = [];

        for (var i = 0; i < 3; i++) {
            littleWallInstances[i] = littleWall1.createInstance("lw" + (i + 1));
            littleWallInstances[i].position.z = -SIZE - i * (SIZE * 1.25);
            littleWallInstances[i].position.y = 2.2 + i * 2;
            littleWallInstances[i].checkCollisions = true;
            shadowGenerator.getShadowMap().renderList.push(littleWallInstances[i]);
        }

        var scoreBoard = BABYLON.MeshBuilder.CreatePlane("sb", { height: 9, width: 18 }, scene);
        scoreBoard.material = new BABYLON.StandardMaterial("sbMat", scene);
        scoreBoard.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);

        scoreBoard.material.backFaceCulling = false;
        scoreBoard.position = new BABYLON.Vector3(0, 18.375, SIZE);
    }

    this.updateTargetSize = function(size){
        
        target.scaling.x = size;
        target.scaling.y = size;
        
    }

    function createOther() {

        //start/stop
        var start = BABYLON.MeshBuilder.CreatePlane("st", { width: 2, height: 1.5 }, scene);
        start.material = new BABYLON.StandardMaterial("texturebruh", scene);
        start.position = new BABYLON.Vector3(5.5, 1.2, 1.2);
        start.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
        start.material.specularColor = new BABYLON.Color3(0, 0, 0);
        start.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        start.material.backFaceCulling = false;
        start.material.diffuseTexture.drawText("Start!", 145, 600, "315px arial", "#595959", "#D3D3D3");

        (function createPanels() {
            var panel = [];
            var count = 1;
            var color = "grey";

            for (var i = 0; i < 16; i++) {

                color = "grey"
                if (i == 0 || i == 5 || i == 10 || i == 15) {
                    var color = "white";
                }

                panel[i] = new BABYLON.MeshBuilder.CreatePlane("p" + i, { height: 2, width: 2 }, scene);
                panel[i].material = new BABYLON.StandardMaterial("panelMat", scene);
                panel[i].material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
                panel[i].material.diffuseTexture.drawText(count, 80, 475, "600px arial", color, "transparent");
                panel[i].material.diffuseTexture.hasAlpha = true;
                panel[i].material.specularColor = new BABYLON.Color3(0, 0, 0);
                panel[i].material.emissiveColor = new BABYLON.Color3(1, 1, 1);
                panel[i].material.backFaceCulling = false;

                if (i >= 12) {
                    panel[i].position = new BABYLON.Vector3(-3 + 2 * (count - 1), 7.25, -SIZE * 3.5 - .3);
                } else if (i >= 8) {
                    panel[i].position = new BABYLON.Vector3(-3 + 2 * (count - 1), 5.3, -SIZE * 2.25 - .5);
                } else if (i >= 4) {
                    panel[i].position = new BABYLON.Vector3(-3 + 2 * (count - 1), 3.3, -SIZE - .5);
                } else {
                    panel[i].position = new BABYLON.Vector3(-3 + 2 * (count - 1), 1.2, 1.2);
                }

                count++;
                if (count > 4) count = 1;

            }


            var startInstance1 = start.createInstance("st");
            startInstance1.position = new BABYLON.Vector3(5.5, 3.3, -SIZE - .5);
            var startInstance2 = start.createInstance("st");
            startInstance2.position = new BABYLON.Vector3(5.5, 5.3, -SIZE * 2.25 - .5);

            var startInstance3 = start.createInstance("st");
            startInstance3.position = new BABYLON.Vector3(5.5, 7.25, -SIZE * 3.5 - .3);


        })();

        _this.startStop = function () {
            if (!game.targetManager.start) {
                start.material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
                start.material.diffuseTexture.drawText("Stop!", 145, 600, "315px arial", "#595959", "#D3D3D3");
                game.targetManager.begin();

            } else {
                start.material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
                start.material.diffuseTexture.drawText("Start!", 145, 600, "315px arial", "#595959", "#D3D3D3");
                game.targetManager.end();
            }
            game.targetManager.start = !game.targetManager.start;
        }

        target = BABYLON.Mesh.CreateDisc("target", targetSize, 25, scene);
        target.material = new BABYLON.StandardMaterial("textureyo", scene);
        target.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        target.position = new BABYLON.Vector3(3, 11.25, SIZE - .1);
        target.material.backFaceCulling = false;
        target.visibility = 0;
        target.isPickable = true;

        var circleThing = BABYLON.MeshBuilder.CreatePlane("circleThing", 6, scene);
        circleThing.material = new BABYLON.StandardMaterial("circleThingTexture", scene);
        circleThing.material.diffuseTexture = new BABYLON.Texture("assets/circlething.png", scene);
        circleThing.material.diffuseColor = new BABYLON.Color3(2, 2, 2);
        circleThing.material.diffuseTexture.hasAlpha = true;
        circleThing.material.backFaceCulling = false;
        circleThing.scaling.x = 2.25;
        circleThing.scaling.y = 2.25;
        circleThing.position = new BABYLON.Vector3(0, SIZE / 2.5, SIZE - .1);

        var hitsText = BABYLON.MeshBuilder.CreatePlane("ht", { width: 8, height: 8 }, scene);
        hitsText.material = new BABYLON.StandardMaterial("htt", scene);
        hitsText.position = new BABYLON.Vector3(0, 20, SIZE - .1);

        hitsText.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
        hitsText.material.diffuseTexture.drawText("000", 100, 800, "500px arial", "white", "transparent");
        hitsText.material.diffuseTexture.hasAlpha = true;
        hitsText.material.specularColor = new BABYLON.Color3(0, 0, 0);
        hitsText.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        hitsText.material.backFaceCulling = false;

        var missesText = BABYLON.MeshBuilder.CreatePlane("mt", { width: 10, height: 10 }, scene);
        missesText.material = new BABYLON.StandardMaterial("mtt", scene);
        missesText.position = new BABYLON.Vector3(0, 14.5, SIZE - .1);

        missesText.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
        missesText.material.diffuseTexture.drawText("000", 110, 350, "100px arial", "white", "transparent");
        missesText.material.diffuseTexture.hasAlpha = true;
        missesText.material.specularColor = new BABYLON.Color3(0, 0, 0);
        missesText.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        missesText.material.backFaceCulling = false;

        var shotsFailedText = BABYLON.MeshBuilder.CreatePlane("sFT", { width: 10, height: 10 }, scene);
        shotsFailedText.material = new BABYLON.StandardMaterial("mtt", scene);
        shotsFailedText.position = new BABYLON.Vector3(1.8, 14.5, SIZE - .1);

        shotsFailedText.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
        shotsFailedText.material.diffuseTexture.drawText(".... shots failed", 110, 350, "100px arial", "white", "transparent");
        shotsFailedText.material.diffuseTexture.hasAlpha = true;
        shotsFailedText.material.specularColor = new BABYLON.Color3(0, 0, 0);
        shotsFailedText.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        shotsFailedText.material.backFaceCulling = false;
    }

}



