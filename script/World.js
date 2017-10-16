World = function (game) {

    var SIZE = 15;

    //set the global variable for ease of use
    var scene = game.scene;

    var dirLight = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(2, -6, -4.75), scene);
    dirLight.position = new BABYLON.Vector3(0, 40, 0);
    dirLight.intensity = 2;
    var shadowGenerator = new BABYLON.ShadowGenerator(2048, dirLight);
    shadowGenerator.bias = 0.000005;

    var hemiLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 1.2;

    //background color
    scene.clearColor = new BABYLON.Color3(0.192, .302, .475);

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground1 = BABYLON.Mesh.CreateGround("ground1", SIZE * 2, SIZE * 2, 1, scene);
    ground1.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground1.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);
    ground1.material.backFaceCulling = false;
    ground1.receiveShadows = true;
    ground1.checkCollisions = true;

    var wall1 = BABYLON.MeshBuilder.CreatePlane("wall1", { height: SIZE - (SIZE * .05), width: SIZE * 2 }, scene);
    wall1.material = new BABYLON.StandardMaterial("wallMat", scene);
    wall1.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);
    wall1.material.backFaceCulling = false;
    wall1.position = new BABYLON.Vector3(0, SIZE / 2 - (SIZE * .05), SIZE);
    wall1.checkCollisions = true;
    //make wall1 cast a shadow
    shadowGenerator.getShadowMap().renderList.push(wall1);

    var wall2 = createWall("wall2", [SIZE, SIZE / 2, 0], [0, Math.PI / 2, 0]);
    wall2.receiveShadows = true;

    var wall3 = createWall("wall3", [-SIZE, SIZE / 2, 0], [0, - Math.PI / 2, 0]);
    shadowGenerator.getShadowMap().renderList.push(wall3);

    var ground2 = BABYLON.Mesh.CreateGround("ground1", SIZE * 2, SIZE * 1.5, 1, scene);
    ground2.position.y = 2;
    ground2.position.z = -SIZE * 1.75;
    ground2.material = ground1.material;
    ground2.receiveShadows = true;
    ground2.checkCollisions = true;

    var littleWall2 = BABYLON.MeshBuilder.CreateBox("lw2", { height: 4.4, width: SIZE * 2, depth: 1}, scene);
    littleWall2.material = new BABYLON.StandardMaterial("lwallMat", scene);
    littleWall2.material.diffuseColor = new BABYLON.Color3(.75, .75, .75);
    littleWall2.material.backFaceCulling = false;
    littleWall2.position.z = -SIZE;    
    littleWall2.position.y = 2.2;
    littleWall2.receiveShadows = true;
    littleWall2.checkCollisions = true;

    function createWall(id, position, rotation) {
        var wall = BABYLON.MeshBuilder.CreatePlane(id, { height: SIZE - (SIZE * .05), width: SIZE * 5 }, scene);
        wall.material = wall1.material;
        wall.position = new BABYLON.Vector3(position[0], position[1] - (SIZE * .05), position[2]);
        wall.rotation = new BABYLON.Vector3(rotation[0], rotation[1] , rotation[2]);
        wall.checkCollisions = true;
        return wall;

    }

    var scoreBoard =  BABYLON.MeshBuilder.CreatePlane("sb", {height: 9, width: 18}, scene);
    scoreBoard.material = new BABYLON.StandardMaterial("sbMat", scene);
    scoreBoard.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    
    scoreBoard.material.backFaceCulling = false;
    scoreBoard.position = new BABYLON.Vector3(0, 18.5, SIZE);
    
    

    var target = BABYLON.Mesh.CreateDisc("target", 0.75, 25, scene);
    target.material = new BABYLON.StandardMaterial("textureyo", scene);
    target.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
    target.position = new BABYLON.Vector3(0, 6, SIZE - .1);
    target.material.backFaceCulling = false;
    target.visibility = 1;
    target.isPickable = true;

    var circleThing = BABYLON.MeshBuilder.CreatePlane("circleThing", 6, scene);
    circleThing.material = new BABYLON.StandardMaterial("circleThingTexture", scene);
    circleThing.material.diffuseTexture = new BABYLON.Texture("assets/circlething.png", scene);
    circleThing.material.diffuseTexture.hasAlpha = true;
    circleThing.material.backFaceCulling = false;
    circleThing.scaling.x = 2.25;
    circleThing.scaling.y = 2.25;
    circleThing.position = new BABYLON.Vector3(0, SIZE / 2.5, SIZE - .1);

    var hitsText = BABYLON.MeshBuilder.CreatePlane("ht", {width: 8, height: 8}, scene);
    hitsText.material = new BABYLON.StandardMaterial("htt", scene);
    hitsText.position = new BABYLON.Vector3(0, 20,  SIZE - .1);
    
    hitsText.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
    hitsText.material.diffuseTexture.drawText("000", 100, 800, "500px arial", "white", "transparent");  
    hitsText.material.diffuseTexture.hasAlpha = true;
    hitsText.material.specularColor = new BABYLON.Color3(0, 0, 0);
    hitsText.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    hitsText.material.backFaceCulling = false;

    var missesText = BABYLON.MeshBuilder.CreatePlane("mt", {width: 10, height: 10}, scene);
    missesText.material = new BABYLON.StandardMaterial("mtt", scene);
    missesText.position = new BABYLON.Vector3(0, 14.5,  SIZE - .1);

    missesText.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
    missesText.material.diffuseTexture.drawText("000.... shots failed", 110, 350, "100px arial", "white", "transparent");
    missesText.material.diffuseTexture.hasAlpha = true;
    missesText.material.specularColor = new BABYLON.Color3(0, 0, 0);
    missesText.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    missesText.material.backFaceCulling = false;

  


   

}



