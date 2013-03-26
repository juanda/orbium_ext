Ext.define('Orbium.world.World', {
    bodies: [],
    worldStatus: "STOPPED",
    constructor: function(world) {

        Orbium.app.consoleLog('constructor Orbium.World');
        Orbium.app.consoleLog(world);

        this.initScene(world);
        this.initPhysicsWorld();

    },
    initPhysicsWorld: function() {
        this.timeStep = 1 / 60;
        this.physicsWorld = new CANNON.World();
        this.physicsWorld.gravity.set(0, -5, 0);
        this.physicsWorld.broadphase = new CANNON.NaiveBroadphase();
        this.physicsWorld.solver.iterations = 10;
    },
    initScene: function(world) {
        var config = {veloCamara: 1};
        this.veloCamara = (config.veloCamara || 1);

        var container = world.getViewer();

        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 30;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        container.appendChild(this.renderer.domElement);

        // To monitor performance (fps)
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
//        for (k in this.bodies) {
//            this.bodies[k].position.y -= Math.random() * 2;
//        }
        Orbium.app.consoleLog("requestAnimationId: " + this.requestAnimationId);
        Orbium.app.consoleLog("stepnumber: " + this.physicsWorld.time);
        this.renderer.render(this.scene, this.camera);
    },
    updatePhysics: function() {
        // Step the physics world
        this.physicsWorld.step(this.timeStep);

        // Copy coordinates from Cannon.js to Three.js
        for (k in this.bodies) {
            this.bodies[k].physics.position.copy(this.bodies[k].mesh.position);
            this.bodies[k].physics.quaternion.copy(this.bodies[k].mesh.quaternion);
        }

    },
    animate: function() {

        this.requestAnimationId = requestAnimationFrame(this.animate.bind(this));

        this.updatePhysics();
        this.render();
        if (this.stats) {
            this.stats.update();
        }

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

        for (k in this.bodies) {
            // reset physical position and copy on associated mesh
            this.bodies[k].physics.position.x = this.bodies[k].initialConditions.x0;
            this.bodies[k].physics.position.y = this.bodies[k].initialConditions.y0;
            this.bodies[k].physics.position.z = this.bodies[k].initialConditions.z0;
            this.bodies[k].physics.position.copy(this.bodies[k].mesh.position);

            // reset physical quaternion and copy on associated mesh
            this.bodies[k].physics.velocity.x = this.bodies[k].initialConditions.vx0;
            this.bodies[k].physics.velocity.y = this.bodies[k].initialConditions.vy0;
            this.bodies[k].physics.velocity.z = this.bodies[k].initialConditions.vz0;

            //¿Qué pasa con el cuaternión cuando reseteamos?
            this.bodies[k].physics.quaternion.x = 0;
            this.bodies[k].physics.quaternion.y = 0;
            this.bodies[k].physics.quaternion.z = 0;

            this.bodies[k].physics.quaternion.copy(this.bodies[k].mesh.quaternion);
        }

        this.worldStatus = "STOPPED";
        this.render();
    },
    pauseAnimation: function() {
        cancelAnimationFrame(this.requestAnimationId);
        this.worldStatus = "PAUSED";
    },
    addCube: function() {

        var body = {};

        var config = {
            geometry: {
                width: 2,
                height: 2,
                depth: 2
            },
            position: {
                x0: 10,
                y0: 0,
                z0: 0,
            },
            velocity: {
                vx0: 0,
                vy0: 0,
                vz0: 0,
            },
            angularVelocity: {
                wx0: 0,
                wy0: 0,
                wz0: 0
            }
        };

        body.initialConditions = config;

        // Create the physics part of the body object
        var shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        var mass = 1;
        body.physics = new CANNON.RigidBody(mass, shape);

        body.physics.position.x = 10;
        body.physics.angularVelocity.set(config.wx0, config.wy0, config.wz0);
        body.physics.angularDamping = 0;

        this.physicsWorld.add(body.physics);

        var geometry = new THREE.CubeGeometry(2, 2, 2);
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        body.mesh = new THREE.Mesh(geometry, material);
        body.mesh.useQuaternion = true;

        body.physics.position.x = config.x0;
        body.physics.position.copy(body.mesh.position);

        this.scene.add(body.mesh);

        this.bodies.push(body);

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
            vz0: 0,
            m: 1
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

        this.bodies.push(body);

        this.scene.add(body);
        this.render();
    }
})


