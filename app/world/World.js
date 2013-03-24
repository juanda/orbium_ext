Ext.define('Orbium.world.World', {
    constructor: function(world) {

        console.log(world);

        var container = world.getViewer();

        var stats;       

        var cube;
       

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.y = 150;
        this.camera.position.z = 500;

        this.scene = new THREE.Scene();

// Cube

        var geometry = new THREE.CubeGeometry(200, 200, 200);

        for (var i = 0; i < geometry.faces.length; i++) {

            geometry.faces[ i ].color.setHex(Math.random() * 0xffffff);

        }

        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});

        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 150;
        this.scene.add(cube);

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        container.appendChild(this.renderer.domElement);

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '30px';
        container.appendChild(stats.domElement);

        this.renderer.render(this.scene, this.camera);
        console.log('constructor Orbium.World');
    }
})


