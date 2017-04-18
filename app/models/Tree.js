
/**
 * Created by emilypeterson on 4/12/17.
 */
class Tree {
    constructor(){
        const TREE_TOP_RADIUS  = 70;
        const TREE_BOTTOM_RADIUS  = 100;
        const TREE_HEIGHT = 600;
        const BRANCH_RADIUS = 50;
        const BRANCH_HEIGHT = 200;
        const LEAVES1_RADUIS = 300;
        const LEAVES2_RADUIS = 200;
        //const barkMat =  new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Images/bark.jpg') } );
        //const leaves3Mat =  new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Images/leaves6.jpg') });
        const leavesTex = new THREE.ImageUtils.loadTexture("Images/leaves12.jpg");
        leavesTex.repeat.set(3.8,6);
        leavesTex.wrapS = THREE.RepeatWrapping;
        leavesTex.wrapT = THREE.RepeatWrapping;
        const leaves3Mat = new THREE.MeshPhongMaterial({ map: leavesTex});

        const barkTex = new THREE.ImageUtils.loadTexture("Images/bark2.jpg");
        barkTex.repeat.set(2,2);
        barkTex.wrapS = THREE.RepeatWrapping;
        barkTex.wrapT = THREE.RepeatWrapping;
        const barkMat = new THREE.MeshPhongMaterial({ map: barkTex});

        const trunkGeo = new THREE.CylinderGeometry(TREE_TOP_RADIUS, TREE_BOTTOM_RADIUS, TREE_HEIGHT, 100);
        const trunk = new THREE.Mesh (trunkGeo, barkMat);

        const branchGeo = new THREE.CylinderGeometry(BRANCH_RADIUS, BRANCH_RADIUS, BRANCH_HEIGHT, 100);
        const branch = new THREE.Mesh (branchGeo, barkMat);
        branch.translateY(60);
        branch.translateX(-100);
        branch.rotateZ(Math.PI/6);
        branch.translateZ(15);
        branch.rotateX(Math.PI/15);


        const leavesGeo = new THREE.SphereGeometry(LEAVES1_RADUIS, 7, 11, 0, 6.3, 0, 6.5);
        const leaves = new THREE.Mesh (leavesGeo, leaves3Mat);
        leaves.translateY(420);
        //leaves.translateX(-50);

        const leaves2Geo = new THREE.SphereGeometry(LEAVES2_RADUIS, 7, 11, 0, 6.3, 0, 6.5);
        const leaves2 = new THREE.Mesh (leaves2Geo, leaves3Mat);
        leaves2.translateY(300);
        leaves2.translateX(-200);
        leaves2.translateZ(100);

        const treeGroup = new THREE.Group();
        treeGroup.add (trunk);
        treeGroup.add (branch);
        treeGroup.add(leaves);
        treeGroup.add(leaves2);

        return treeGroup;
    }
}



