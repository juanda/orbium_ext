Ext.define('Orbium.world.World', {
    balls: [],
    worldStatus: "STOPPED",
    constructor: function(world) {

        Orbium.app.consoleLog('constructor Orbium.World');
        Orbium.app.consoleLog(world);

        var config = {veloCamara: 1};
        this.veloCamara = (config.veloCamara || 1);

        var container = world.getViewer();

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.y = 150;
        this.camera.position.z = 500;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        container.appendChild(this.renderer.domElement);

        if (Orbium.app.debug) {
            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.top = '30px';
            container.appendChild(this.stats.domElement);
        }

        this.renderer.render(this.scene, this.camera);

    },
    render: function() {
        var btnAddBall = Ext.ComponentQuery.query('orbiumtoolbar button[action=addBall]');

        if (this.worldStatus != "STOPPED") {
            btnAddBall[0].disable();
        } else {
            btnAddBall[0].enable();
        }
        for (k in this.balls) {
            this.balls[k].position.y -= Math.random() * 2;
        }
        Orbium.app.consoleLog("requestAnimationId: " + this.requestAnimationId);
        this.renderer.render(this.scene, this.camera);
    },
    animate: function() {

        this.requestAnimationId = requestAnimationFrame(this.animate.bind(this));

        console.log("hola");
        this.render();
//        if (this.stats) {
//            stats.update();
//        }

        // deltaCamera tunning to get a camera constant velocity
        var time;
        var now = new Date().getTime();

        this.repeat = now - (time || now);
        time = now;

        this.deltaCamera = this.veloCamara * this.repeat / 10;

    },
    startAnimation: function() {
        this.animate();
        this.worldStatus = "RUNNING";
    },
    stopAnimation: function() {
        cancelAnimationFrame(this.requestAnimationId);

        // Reset world state
        for (k in this.balls) {
            this.balls[k].position.y = this.balls[k].position.y0;
            this.balls[k].position.x = this.balls[k].position.x0;
        }

        this.worldStatus = "STOPPED";
        this.render();
    },
    pauseAnimation: function() {
        cancelAnimationFrame(this.requestAnimationId);
        this.worldStatus = "PAUSED";
    },
    addCube: function() {
        var geometry = new THREE.CubeGeometry(100, 200, 300);

        for (var i = 0; i < geometry.faces.length; i++) {

            geometry.faces[ i ].color.setHex(Math.random() * 0xffffff);

        }

        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});

        var cube = new THREE.Mesh(geometry, material);
        cube.position.y = 100;
        cube.position.z = 100;
        this.scene.add(cube);
        this.renderer.render(this.scene, this.camera);
    },
    addBall: function() {

        var params = {
            r: 20,
            x0: Math.random() * 300,
            y0: Math.random() * 300,
            z0: Math.random() * 100,
            vx0: 0,
            vy0: 0,
            vz0: 0
        };

        var geometry = new THREE.SphereGeometry(params.r, 20, 20);

        var material = new THREE.MeshBasicMaterial({color: 0xff0000});

        var body = new THREE.Mesh(geometry, material);
        body.position.y0 = params.y0;
        body.position.x0 = params.x0;
        body.position.z0 = params.z0;
        //body.velocity.x0 = params.vx0;

        body.position.y = body.position.y0;
        body.position.x = body.position.x0;
        body.position.z = body.position.z0;

        this.balls.push(body);

        this.scene.add(body);
        this.render();
    }
})


