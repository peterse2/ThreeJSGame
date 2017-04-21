class Dagger {
    constructor(){
        const BHILT_RADIUS = 10;
        const HILT_BOTTOM_RADIUS = 6;
        const HILT_TOP_RADIUS = 8;
        const HILT_HEIGHT = 100;
        const GUARD_HEIGHT = 20;
        const GUARD_WIDTH = 100;
        const GUARD_DEPTH = 20;
        const BLADE_HEIGHT = 300;
        const BLADE_BOTTOM_RADIUS = 10;
        const BLADE_TOP_RADIUS = 0;
        var loader = new THREE.TextureLoader();
        const hiltTex = loader.load("Images/hilt.jpg");
        const hiltMat = new THREE.MeshPhongMaterial({ map: hiltTex});
        const steelTex = loader.load("Images/steel2.jpg");
        const steelMat = new THREE.MeshPhongMaterial({ map: steelTex});
        const goldTex = loader.load("Images/gold.jpg");
        const goldMat = new THREE.MeshPhongMaterial({ map: goldTex});

        let bHiltGeo = new THREE.SphereGeometry(BHILT_RADIUS);
        //let bHiltMat = new THREE.MeshBasicMaterial( {color: 0xDDB118, wireframe: false} );
        let bHilt = new THREE.Mesh(bHiltGeo, goldMat);
        bHilt.scale.set(2, 2, 1);


        let hiltGeo = new THREE.CylinderGeometry(HILT_TOP_RADIUS, HILT_BOTTOM_RADIUS, HILT_HEIGHT, 62);
        //let hiltMat = new THREE.MeshBasicMaterial( {color: 0xA52A2A, wireframe: false} );
        hiltTex.repeat.set(1,3);
        hiltTex.wrapS = THREE.RepeatWrapping;
        hiltTex.wrapT = THREE.RepeatWrapping;
        let hilt = new THREE.Mesh(hiltGeo, hiltMat);
        hilt.translateY((BHILT_RADIUS/2) + HILT_HEIGHT/2);
        hilt.scale.set(2, 1, 1);

        let guardGeo = new THREE.BoxGeometry(GUARD_WIDTH, GUARD_HEIGHT, GUARD_DEPTH);
        //let guardMat = new THREE.MeshBasicMaterial( {color: 0xDDB118, wireframe: false});
        let guard = new THREE.Mesh(guardGeo, goldMat);
        guard.translateY((BHILT_RADIUS/2) + (HILT_HEIGHT) + (GUARD_HEIGHT/2));

        let bladeGeo = new THREE.CylinderGeometry(BLADE_TOP_RADIUS, BLADE_BOTTOM_RADIUS, BLADE_HEIGHT, 4);
        //let bladeMat = new THREE.MeshBasicMaterial( {color: 0x939393, wireframe: false});
        steelTex.repeat.set(2,1);
        steelTex.wrapS = THREE.RepeatWrapping;
        steelTex.wrapT = THREE.RepeatWrapping;
        let blade = new THREE.Mesh(bladeGeo, steelMat);
        blade.translateY((BHILT_RADIUS/2) + (HILT_HEIGHT) + (GUARD_HEIGHT) + (BLADE_HEIGHT/2));
        blade.scale.set(2, 1, 1);

        let dagger = new THREE.Group();
        dagger.add(bHilt);
        dagger.add(hilt);
        dagger.add(guard);
        dagger.add(blade);

        return dagger;
    }


}
