var scene, camera, renderer;
var geometry, material;
var treeCF, treeTrans, treeScale, treeRot;

init();
animate();

function init() {

    scene = new THREE.Scene();
    window.addEventListener('resize', onResize, false);
    window.addEventListener('keydown', onKeypress, false);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;


    treeCF = new THREE.Matrix4();
    treeTrans = new THREE.Vector3();
    treeScale = new THREE.Vector3();
    treeRot = new THREE.Quaternion();

    const lightOne = new THREE.DirectionalLight(0xFFFFFF);
    lightOne.position.set(0,1,1).normalize();
    scene.add(lightOne);

    myTree = new Tree();
    scene.add( myTree );


    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {
    requestAnimationFrame( animate );
    ///const rotZ1 = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(1));
    //treeCF.multiply (rotZ1);
    // you can continue with other transformations here
    //
    // only have to call decompose() once! (after all the transformations are applied)
    treeCF.decompose (treeTrans, treeRot, treeScale);  // decompose the coord frame

    myTree.position.copy(treeTrans);   /* apply the transformation */
    myTree.quaternion.copy(treeRot);
    myTree.scale.copy (treeScale);



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
            const angle = 50 / 158;
            treeCF.multiply (new THREE.Matrix4().makeRotationZ (-angle));
            break;
        case 76:  /* j */
            treeCF.multiply(rotYneg);
            break;
    }
}
