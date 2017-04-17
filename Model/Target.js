/**
 * Created by emilypeterson on 4/16/17.
 */
class Target{
    constructor(){
        const TARGET_RADIUS = 200;
        const TARGET_THICKNESS = 30;
        const targetGeo = new THREE.CylinderGeometry(TARGET_RADIUS, TARGET_RADIUS, TARGET_THICKNESS, 62, 1);
        const targetMat = new THREE.MeshPhongMaterial({color: 0x840006});
        const target = new THREE.Mesh (targetGeo, targetMat);
        target.rotateX(Math.PI/3);

        const targetGroup = new THREE.Group();
        targetGroup.add (target);

        const ringInterval = TARGET_RADIUS/3;

        const ring1Geo = new THREE.CylinderGeometry(TARGET_RADIUS-(ringInterval), TARGET_RADIUS-(ringInterval), TARGET_THICKNESS, 62, 1);
        const ring1Mat = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ring1.translateZ(.1);
        ring1.rotateX(Math.PI/3);
        targetGroup.add (ring1);

        const ring2Geo = new THREE.CylinderGeometry(TARGET_RADIUS-(ringInterval*2), TARGET_RADIUS-(ringInterval*2), TARGET_THICKNESS, 62, 1);
        const ring2Mat = new THREE.MeshPhongMaterial({color: 0x840006});
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.translateZ(.2);
        ring2.rotateX(Math.PI/3);
        targetGroup.add (ring2);

        /*const numRings = 4;
         const ringInterval = TARGET_RADIUS/numRings;
         let ringMat = null;

         for (let k = 1; k <= numRings; k ++) {
         const ringGeo = new THREE.CylinderGeometry(TARGET_RADIUS-(ringInterval*k), TARGET_RADIUS-(ringInterval*k), TARGET_THICKNESS, 62, 1);
         if(k%2 == 0){
         ringMat = new THREE.MeshPhongMaterial({color: 0x840006});
         }else{
         ringMat = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
         }

         const ring = new THREE.Mesh(ringGeo, ringMat);
         ring.rotateX(Math.PI/3);
         //ring.translateZ(35);
         targetGroup.add (ring);
         }*/

        return targetGroup;
    }
}
