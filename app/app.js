var mundo;
Ext.application({
    requires: ['Orbium.view.Viewport', 'Ext.ComponentQuery'],
    name: 'Orbium',
    appFolder: 'app',
    controllers: ['Toolbar', 'World'],
    launch: function() {
        
        Ext.create('Orbium.view.Viewport');
   
    }
});


//var container, stats;
//
//var camera, scene, renderer;
//
//var cube;
//
//container = document.getElementById('kk');
//
//
//var info = document.createElement('div');
//info.style.position = 'absolute';
//info.style.top = '10px';
//info.style.width = '100%';
//info.style.textAlign = 'center';
//info.innerHTML = 'Drag to spin the cube';
//container.appendChild(info);
//
//camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
//camera.position.y = 150;
//camera.position.z = 500;
//
//scene = new THREE.Scene();
//
//// Cube
//
//var geometry = new THREE.CubeGeometry(200, 200, 200);
//
//for (var i = 0; i < geometry.faces.length; i++) {
//
//    geometry.faces[ i ].color.setHex(Math.random() * 0xffffff);
//
//}
//
//var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
//
//cube = new THREE.Mesh(geometry, material);
//cube.position.y = 150;
//scene.add(cube);
//
//renderer = new THREE.CanvasRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//
//container.appendChild(renderer.domElement);
//
//stats = new Stats();
//stats.domElement.style.position = 'absolute';
//stats.domElement.style.top = '0px';
//container.appendChild(stats.domElement);
//
//renderer.render(scene, camera);
//
//
//
//
//
