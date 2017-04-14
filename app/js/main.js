var scene, camera, renderer;
var geometry, material;
var treeCF, treeTrans, treeScale, treeRot;

var ray, brush, objectHovered,
    mouse3D, isMouseDown = false, onMouseDownPosition,
    radious = 1600, onMouseDownTheta = 45, onMouseDownPhi = 60,
    isShiftDown = false;
var mouse = [.5, .5];
var objects = {};
var phi = 0, theta = 0;
var target = new THREE.Vector3();
var trees = [];
var treesCF = [];
const TREESPEED = -25;
const NUMTREES = 20;

target.x = 10 * Math.sin( phi ) * Math.cos( theta );
target.y = 10 * Math.cos( phi );
target.z = 10 * Math.sin( phi ) * Math.sin( theta );


init();
animate();

function init() {

    scene = new THREE.Scene();
    window.addEventListener('resize', onResize, false);
    window.addEventListener('keydown', onKeypress, false);
    const globalAxes = new THREE.AxisHelper(200);
    scene.add(globalAxes);
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position = new THREE.Vector3(0, 0, 0);
    camera.target = target;
    // const eyePos = new THREE.Vector3 (1000, 300, 400);
    // const cameraPose = new THREE.Matrix4().lookAt (
    //     eyePos,
    //     new THREE.Vector3 (0, 0, 200),
    //     new THREE.Vector3 (0, 0, 1)
    // );
    // cameraPose.setPosition (eyePos);
    // camera.matrixAutoUpdate = false;
    // camera.matrixWorld.copy (cameraPose);
    window.addEventListener( 'mousemove', onMouseMove, false );
    for(i = 0; i < NUMTREES; i++) {
        let temp = new Tree();
        trees.push(temp);
        let tempCF = new THREE.Matrix4();
        let t = Math.floor(Math.random() * (1000 - 500) + 500);
        if (i%2 == 0) {
            t = t*-1;
        }
        tempCF.multiply(new THREE.Matrix4().makeTranslation(t,0,10000-i*1000));
        treesCF.push(tempCF);
        scene.add(temp);
    }

    treeTrans = new THREE.Vector3();
    treeScale = new THREE.Vector3();
    treeRot = new THREE.Quaternion();

    //treeCF.multiply(new THREE.Matrix4().makeRotationX(1.5));
    //treeCF.multiply(new THREE.Matrix4().makeTranslation(-1000,0,10000));
    const lightOne = new THREE.DirectionalLight(0xFFFFFF);
    lightOne.position.set(0,0,-1).normalize();
    scene.add(lightOne);



    scene.add( trees );

    const groundTex = new THREE.ImageUtils.loadTexture("Images/leaves12.jpg");
    groundTex.repeat.set(3.8,6);
    groundTex.wrapS = THREE.RepeatWrapping;
    groundTex.wrapT = THREE.RepeatWrapping;
    const groundMat = new THREE.MeshPhongMaterial({ map: groundTex});

    const groundGeo = new THREE.BoxGeometry(1000,10,10000, 10,10,10);
    const ground = new THREE.Mesh (groundGeo, groundMat);
    scene.add(ground);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );

    camera.target.x = Math.sin(.5 * Math.PI * (mouse[0] - .5));
    camera.target.y = Math.sin(.25 * Math.PI * (mouse[1] - .5));
    camera.target.z = Math.cos(.5 * Math.PI * (mouse[0] - .5));
    camera.lookAt( camera.target );

    for(i = 0; i<NUMTREES; i++) {
        if(trees[i].position.z < -100) {
            treesCF[i] = new THREE.Matrix4();
            let t = Math.floor(Math.random() * (1000 - 500)+ 500);
            if (i % 2 == 0) {
                t = t * -1;
            }
            treesCF[i].multiply(new THREE.Matrix4().makeTranslation(t,0,10000-i*100));
        }
        treesCF[i].multiply(new THREE.Matrix4().makeTranslation(0,0,TREESPEED));

        treesCF[i].decompose (treeTrans, treeRot, treeScale);  // decompose the coord frame

        trees[i].position.copy(treeTrans);   /* apply the transformation */
        trees[i].quaternion.copy(treeRot);
        trees[i].scale.copy (treeScale);
    }




    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;

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
const rotYneg = new THREE.Matrix4().makeRotationY (THREE.Math.degToRad(-5));

function onMouseMove(ev) {
    mouse[0] = ev.clientX / window.innerWidth;
    mouse[1] = ev.clientY / window.innerHeight;
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
        case 73: { /* i */
            //frameCF.multiply(moveZpos);
            /* travel distance: 50, wheel radius 158 */
            const angle = 50 / 150;
            treeCF.multiply (new THREE.Matrix4().makeRotationZ (angle));
            break;
        }
        case 74:  /* j */
            treeCF.multiply(rotYpos);
            break;
        case 75:  /* k */
            //frameCF.multiply(moveZneg);
            // const angle = 50 / 158;
            // treeCF.multiply (new THREE.Matrix4().makeRotationZ (-angle));
            treeCF.multiply(new THREE.Matrix4().makeTranslation (0,0,10));
            break;
        case 76:  /* j */
            treeCF.multiply(rotYneg);
            break;
    }
}
