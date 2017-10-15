
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
    var ground = BABYLON.Mesh.CreateGround("ground1", SIZE * 2, SIZE * 2, 1, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);
    ground.material.backFaceCulling = false;
    ground.receiveShadows = true;    
    ground.checkCollisions = true;

    var wall1 = createWall("wall1", [0, SIZE / 2, SIZE], [0,0,0]);
    //make wall1 cast a shadow
    shadowGenerator.getShadowMap().renderList.push(wall1);

    var wall2 = createWall("wall2", [SIZE, SIZE / 2, 0], [0, Math.PI / 2,0]);
    wall2.receiveShadows = true;    
    
    
    var wall3 = createWall("wall3", [-SIZE, SIZE / 2, 0], [0, - Math.PI / 2,0]);
    shadowGenerator.getShadowMap().renderList.push(wall3);

    var target = BABYLON.Mesh.CreateDisc("target", 0.75, 25, scene);
    target.material = new BABYLON.StandardMaterial("textureyo", scene);
    target.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
    target.position = new BABYLON.Vector3(SIZE/2, 5, SIZE - .1);
    target.material.backFaceCulling = false;
    target.visibility = 1;
    target.isPickable = true;

    function createWall(id, position, rotation) {
        var wall = BABYLON.MeshBuilder.CreatePlane(id, {height: SIZE, width: SIZE * 2}, scene);
        wall.material = new BABYLON.StandardMaterial("wallMat", scene);
        wall.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);
        wall.material.backFaceCulling = false;
        wall.position = new BABYLON.Vector3(position[0], position[1], position[2]);
        wall.rotation = new BABYLON.Vector3(rotation[0], rotation[1], rotation[2]);
        wall.checkCollisions = true;
        return wall;
      
      }

}



