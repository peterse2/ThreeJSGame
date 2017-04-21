let scene, camera, renderer;
let geometry, material;
let treeTrans, treeScale, treeRot;
let groundTrans, groundRot, groundScale;
let boardTrans, boardRot, boardScale;
let daggerTrans, daggerRot, daggerScale;
let mouse = [.5, .5];
let phi = 0, theta = 0;
let target = new THREE.Vector3();
let trees = [];
let treesCF = [];
let grounds = [];
let groundsCF = [];
let boards = [];
let boardsCF = [];
let dagger, daggerCF, isDagger;
let daggerX, daggerY, daggerZ, daggerDir;
let newDaggerX, newDaggerY, newDaggerZ;
let time;
let text2 = document.createElement('div');
let text = document.createElement('div');
let points = 0;
let TREESPEED = -25;
let BOARDSPEED = -25;
const NUMTREES = 20;
let NUMBOARDS = 4;
let loader = new THREE.TextureLoader();
var gameOver = false;
target.x = 100 * Math.sin( phi ) * Math.cos( theta );
target.y = 100 * Math.cos( phi );
target.z = 100 * Math.sin( phi ) * Math.sin( theta );

init();
animate();
function init() {
    scene = new THREE.Scene();
    window.addEventListener('resize', onResize, false);
    window.addEventListener('keydown', onKeypress, false);
    window.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'mousemove', onMouseMove, false );
    const globalAxes = new THREE.AxisHelper(200);
    scene.add(globalAxes);
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position = new THREE.Vector3(0, 0, 0);
    camera.target = target;

    isDagger = false;

    text2.style.position = 'absolute';
    text2.style.width = 100;
    text2.style.height = 100;
    text2.style.backgroundColor = "White";
    text2.innerHTML = "Score: " + points;
    text2.style.top = 10 + 'px';
    text2.style.left = 10 + 'px';
    document.body.appendChild(text2);

    for(i = 0; i < NUMTREES; i++) {
        let temp = new Tree();
        trees.push(temp);
        let tempCF = new THREE.Matrix4();
        let t = Math.floor(Math.random() * (1000 - 500) + 500);
        if (i%2 === 0) {
            t = t*-1;
        }
        tempCF.multiply(new THREE.Matrix4().makeTranslation(t,0,10000-i*1000));
        treesCF.push(tempCF);
        scene.add(temp);
    }
    treeTrans = new THREE.Vector3();
    treeScale = new THREE.Vector3();
    treeRot = new THREE.Quaternion();

    const lightOne = new THREE.DirectionalLight(0xFFFFFF);
    lightOne.position.set(0,1,-1).normalize();
    scene.add(lightOne);
    const ambLight = new THREE.AmbientLight(0x909090);
    scene.add(ambLight);

    const groundTex = loader.load("Images/grass.jpg");
    groundTex.repeat.set(3.8,6);
    groundTex.wrapS = THREE.RepeatWrapping;
    groundTex.wrapT = THREE.RepeatWrapping;
    const groundMat = new THREE.MeshPhongMaterial({ map: groundTex});

    const skyTex =loader.load("Images/sky.jpg");
    skyTex.repeat.set(3.8,6);
    skyTex.wrapS = THREE.RepeatWrapping;
    skyTex.wrapT = THREE.RepeatWrapping;
    const skyMat = new THREE.MeshPhongMaterial({ map: skyTex});
    const skyGeo = new THREE.BoxGeometry(5000,10,15000,10,10,10);
    const sky = new THREE.Mesh(skyGeo, skyMat);
    let skyCF = new THREE.Matrix4();
    let skyTrans = new THREE.Matrix4();
    let skyRot = new THREE.Quaternion();
    let skyScale = new THREE.Matrix4();
    skyCF.multiply(new THREE.Matrix4().makeTranslation(0,1000,5000));
    skyCF.multiply(new THREE.Matrix4().makeRotationX(Math.PI));
    skyCF.decompose(skyTrans, skyRot, skyScale);
    sky.position.copy(skyTrans);
    sky.quaternion.copy(skyRot);
    sky.scale.copy(skyScale);
    scene.add(sky);
    const wall1Tex =loader.load("Images/forest.jpg");
    wall1Tex.repeat.set(10,1);
    wall1Tex.wrapS = THREE.RepeatWrapping;
    wall1Tex.wrapT = THREE.RepeatWrapping;
    const wall1Mat = new THREE.MeshPhongMaterial({ map: wall1Tex});
    const wall1Geo = new THREE.BoxGeometry(20000,2,2000,20,20,20);
    const wall1 = new THREE.Mesh(wall1Geo, wall1Mat);
    let wall1CF = new THREE.Matrix4();
    let wall1Trans = new THREE.Matrix4();
    let wall1Rot = new THREE.Quaternion();
    let wall1Scale = new THREE.Matrix4();
    wall1CF.multiply(new THREE.Matrix4().makeTranslation(2500,0,0));
    wall1CF.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/2));
    wall1CF.multiply(new THREE.Matrix4().makeRotationY(-Math.PI/2));
    wall1CF.decompose(wall1Trans, wall1Rot, wall1Scale);
    wall1.position.copy(wall1Trans);
    wall1.quaternion.copy(wall1Rot);
    wall1.scale.copy(wall1Scale);
    scene.add(wall1);
    const wall2Tex =loader.load("Images/forest.jpg");
    wall2Tex.repeat.set(10,1);
    wall2Tex.wrapS = THREE.RepeatWrapping;
    wall2Tex.wrapT = THREE.RepeatWrapping;
    const wall2Mat = new THREE.MeshPhongMaterial({ map: wall2Tex});
    const wall2Geo = new THREE.BoxGeometry(20000,20,2000,20,20,20);
    const wall2 = new THREE.Mesh(wall2Geo, wall2Mat);
    let wall2CF = new THREE.Matrix4();
    let wall2Trans = new THREE.Matrix4();
    let wall2Rot = new THREE.Quaternion();
    let wall2Scale = new THREE.Matrix4();
    wall2CF.multiply(new THREE.Matrix4().makeTranslation(-2500,0,0));
    wall2CF.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/2));
    wall2CF.multiply(new THREE.Matrix4().makeRotationY(Math.PI/2));
    wall2CF.decompose(wall2Trans, wall2Rot, wall2Scale);
    wall2.position.copy(wall2Trans);
    wall2.quaternion.copy(wall2Rot);
    wall2.scale.copy(wall2Scale);
    scene.add(wall2);
    const wall3Tex =loader.load("Images/forest.jpg");
    wall3Tex.repeat.set(5,1);
    wall3Tex.wrapS = THREE.RepeatWrapping;
    wall3Tex.wrapT = THREE.RepeatWrapping;
    const wall3Mat = new THREE.MeshPhongMaterial({ map: wall3Tex});
    const wall3Geo = new THREE.BoxGeometry(8000,20,2000,20,20,20);
    const wall3 = new THREE.Mesh(wall3Geo, wall3Mat);
    let wall3CF = new THREE.Matrix4();
    let wall3Trans = new THREE.Matrix4();
    let wall3Rot = new THREE.Quaternion();
    let wall3Scale = new THREE.Matrix4();
    wall3CF.multiply(new THREE.Matrix4().makeTranslation(0,0,9000));
    wall3CF.multiply(new THREE.Matrix4().makeRotationZ(Math.PI));
    wall3CF.multiply(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    wall3CF.decompose(wall3Trans, wall3Rot, wall3Scale);
    wall3.position.copy(wall3Trans);
    wall3.quaternion.copy(wall3Rot);
    wall3.scale.copy(wall3Scale);
    scene.add(wall3);

    const groundGeo = new THREE.BoxGeometry(5000,10,10000, 10,10,10);
    for(i = 0; i < 3; i++) {
        let ground = new THREE.Mesh (groundGeo, groundMat);
        let groundCF = new THREE.Matrix4();
        groundCF.multiply(new THREE.Matrix4().makeTranslation(0,-300+i*2,10000*i));
        grounds.push(ground);
        groundsCF.push(groundCF);
        scene.add(ground);
    }
    groundTrans = new THREE.Vector3();
    groundRot = new THREE.Quaternion();
    groundScale = new THREE.Vector3();

    boardTrans = new THREE.Vector3();
    boardRot = new THREE.Quaternion();
    boardScale = new THREE.Vector3();

    daggerTrans = new THREE.Vector3();
    daggerRot = new THREE.Quaternion();
    daggerScale = new THREE.Vector3();

    for(i = 0; i < NUMBOARDS; i++) {
        let board = new Target();
        let t = Math.floor(Math.random() * (500 - 250) + 250);
        if (i%2 === 0) {
            t = t*-1;
        }
        let boardCF = new THREE.Matrix4();
        boardCF.multiply(new THREE.Matrix4().makeTranslation(t,0,3333*(i+1)));
        boards.push(board);
        boardsCF.push(boardCF);
        scene.add(board);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function animate() {
    if (points >= 2000) {
        text.innerHTML = "YOU WIN!";
        text.style.top = window.innerHeight/2 + 'px';
        text.style.left = window.innerWidth/2 + 'px';
        text.style.backgroundColor = "Red";
        text.style.position = 'absolute';
        text.style.backgroundColor = "White";
        document.body.appendChild(text);
        TREESPEED = 0;
        BOARDSPEED = 0;
        gameOver = true;
    }
    BOARDSPEED -= .01;
    requestAnimationFrame( animate );
    text2.innerHTML = points;
    camera.target.x = Math.sin(.5 * Math.PI * (mouse[0] - .5));
    camera.target.y = Math.sin(.25 * Math.PI * (mouse[1] - .5));
    camera.target.z = Math.cos(.5 * Math.PI * (mouse[0] - .5));
    camera.lookAt( camera.target );
    let t = Math.floor(Math.random() * (1000 - 500)+ 500);
    if (t % 2 === 0) {
        t = t * -1;
    }
    for(i = 0; i<NUMTREES; i++) {

        if(trees[i].position.z < -100) {
            treesCF[i] = new THREE.Matrix4();
            treesCF[i].multiply(new THREE.Matrix4().makeTranslation(t,0,10000-(i*100)+t));
        }
        treesCF[i].multiply(new THREE.Matrix4().makeTranslation(0,0,TREESPEED));
        treesCF[i].decompose (treeTrans, treeRot, treeScale);  // decompose the coord frame
        trees[i].position.copy(treeTrans);   /* apply the transformation */
        trees[i].quaternion.copy(treeRot);
        trees[i].scale.copy (treeScale);
        if (i >= 0 && i < 3) {
            if (grounds[i].position.z < -5000) {
                groundsCF[i] = new THREE.Matrix4();
                groundsCF[i].multiply(new THREE.Matrix4().makeTranslation(0,-300,10000));
            }
            groundsCF[i].multiply(new THREE.Matrix4().makeTranslation(0,0,TREESPEED));
            groundsCF[i].decompose(groundTrans, groundRot, groundScale);
            grounds[i].position.copy(groundTrans);
            grounds[i].quaternion.copy(groundRot);
            grounds[i].scale.copy(groundScale);
        }
        if (i >= 0 && i < NUMBOARDS) {
            if (boards[i].position.z < -500) {
                text.innerHTML = "YOU LOSE!";
                text.style.top = window.innerHeight/2 + 'px';
                text.style.left = window.innerWidth/2 + 'px';
                text2.style.top = window.innerHeight/2+50 + 'px';
                text2.style.left = window.innerWidth/2 + 'px';
                text.style.backgroundColor = "Red";
                text.style.position = 'absolute';
                text.style.backgroundColor = "White";
                document.body.appendChild(text);
                TREESPEED = 0;
                BOARDSPEED = 0;
                gameOver = true;
                // boardsCF[i] = new THREE.Matrix4();
                // boardsCF[i].multiply(new THREE.Matrix4().makeTranslation(t,0,10000-(i*100)+t));
            }
            boardsCF[i].multiply(new THREE.Matrix4().makeTranslation(0,0,BOARDSPEED));
            boardsCF[i].decompose(boardTrans, boardRot, boardScale);
            boards[i].position.copy(boardTrans);
            boards[i].quaternion.copy(boardRot);
            boards[i].scale.copy(boardScale);
            }
        }
    if (isDagger) {
        if(time > 75) {
            points -= 50;
            scene.remove(dagger);
            isDagger = false;
        }
        for(i = 0; i < NUMBOARDS; i++) {
            if (Math.abs(boards[i].position.x-dagger.position.x) < 200 &&
                Math.abs(boards[i].position.y-dagger.position.y) < 200 &&
                Math.abs(boards[i].position.z-dagger.position.z) < 100) {
                scene.remove(dagger);
                boardsCF[i] = new THREE.Matrix4().makeTranslation(t,0,11000-(i*100)+t);
                isDagger = false;
                points+=100;
            }
        }

        newDaggerX = time*daggerDir.x*100;
        newDaggerY = time*daggerDir.y*100;//*-(.01)*t^2;
        newDaggerZ = time*daggerDir.z*100+100;
        dagger.position.x = newDaggerX;
        dagger.position.y = newDaggerY;
        dagger.position.z = newDaggerZ;
        daggerCF.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/20));
        daggerCF.decompose(daggerTrans, daggerRot, daggerScale);
        dagger.quaternion.copy(daggerRot);
        time+=1;
    }
    renderer.render( scene, camera );
}

function onResize() {
    const height = window.innerHeight - 100;
    const width = window.innerWidth - 8;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize (width, height);
}

const moveZpos = new THREE.Matrix4().makeTranslation (0, 0, 50);
const moveZneg = new THREE.Matrix4().makeTranslation (0, 0, -50);
const rotYpos = new THREE.Matrix4().makeRotationY (THREE.Math.degToRad(5));
const rotXpos = new THREE.Matrix4().makeRotationX (THREE.Math.degToRad(5));
const rotYneg = new THREE.Matrix4().makeRotationY (THREE.Math.degToRad(-5));
const rotXneg = new THREE.Matrix4().makeRotationX (THREE.Math.degToRad(-5));

function onMouseMove(ev) {
    mouse[0] = -ev.clientX / -window.innerWidth;
    mouse[1] = -ev.clientY / -window.innerHeight;

}

function onDocumentMouseDown( event ) {
    event.preventDefault();

    if(isDagger || gameOver)
        return;
    isDagger = true;
    dagger = new Dagger();
    time = 0;
    daggerCF = new THREE.Matrix4();
    daggerX = event.clientX - window.innerWidth/2;
    daggerY = event.clientY - window.innerHeight/2;
    daggerZ = 1000;
    daggerDir = new THREE.Vector3(daggerX, daggerY, daggerZ).normalize();
    daggerCF.multiply(new THREE.Matrix4().makeTranslation(daggerX+100, daggerY, daggerZ+1000));
    daggerCF.multiply(new THREE.Matrix4().makeRotationX(Math.PI/2));
    daggerCF.multiply(new THREE.Matrix4().makeRotationZ(-(event.clientX/900)*(Math.PI/4) + (Math.PI/4)));
    daggerCF.multiply(new THREE.Matrix4().makeRotationY(Math.PI/2));
    daggerCF.decompose(daggerTrans, daggerRot, daggerScale);
    dagger.position.copy(daggerTrans);
    dagger.quaternion.copy(daggerRot);
    dagger.scale.copy(daggerScale);
    scene.add(dagger);
}

function onKeypress(event) {
    const key = event.keyCode || event.charCode;
    switch (key) {
        case 37: {// left arrow
            camera.matrixAutoUpdate = false;
            camera.matrixWorld.multiply(rotYpos);
            scene.updateMatrixWorld(true);
            break;
        }
        case 38: {// up arrow
            camera.matrixAutoUpdate = false;
            camera.matrixWorld.multiply(moveZneg);
            scene.updateMatrixWorld(true);
            break;
        }
        case 39: { // right arrow
            camera.matrixAutoUpdate = false;
            camera.matrixWorld.multiply(rotYneg);
            scene.updateMatrixWorld(true);
            break;
        }
        case 40: { // down arrow
            camera.matrixAutoUpdate = false;
            camera.matrixWorld.multiply(moveZpos);
            scene.updateMatrixWorld(true);
            break;
        }
        case 49: { //1
            camera.matrixAutoUpdate = false;
            camera.matrixWorld.multiply(rotXneg);
            scene.updateMatrixWorld(true);
            break;
        }
        case 48: { //0
            camera.matrixAutoUpdate = false;
            camera.matrixWorld.multiply(rotXpos);
            scene.updateMatrixWorld(true);
            break;
        }
    }
}
