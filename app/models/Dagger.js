class Dagger {
    constructor(){

        var hiltTex = new THREE.CylinderGeometry(5, 5, 50, 100);
        var hiltMat = new THREE.MeshBasicMaterial( {color: 0xA52A2A} );
        var hilt = new THREE.Mesh(hiltTex, hiltMat);


        var guardTex = new THREE.BoxGeometry(30, 1, 1);
        var guardMat = new THREE.MeshBasicMaterial( {color: 0xA52A2A});
        var guard = new THREE.Mesh(guardTex, guardMat);
        guard.translateY(48);

        var bladeTex = new THREE.ConeGeometry(1, 50, 5);
        var bladeMat = new THREE.MeshBasicMaterial( {color: 0xC0C0C0});
        var blade = new THREE.Mesh(bladeTex, bladeMat);
        guard.translateY(49);

        var dagger = new THREE.group();
        dagger.add(hilt);
        dagger.add(guard);
        dagger.add(blade);

        return dagger;
    }


}
