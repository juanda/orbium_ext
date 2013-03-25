Ext.define('Orbium.world.World', {
    bodies: [],
    worldStatus: "STOPPED",
    constructor: function(world) {

        Orbium.app.consoleLog('constructor Orbium.World');
        Orbium.app.consoleLog(world);

        that = this;
        // Create scene, camera and renderer
        (function() {
            var config = {veloCamara: 1};
            that.veloCamara = (config.veloCamara || 1);

            var container = world.getViewer();

            that.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);            
            that.camera.position.z = 30;

            that.scene = new THREE.Scene();

            that.renderer = new THREE.CanvasRenderer();
            that.renderer.setSize(window.innerWidth, window.innerHeight);

            container.appendChild(that.renderer.domElement);

            // To monitor performance (fps)
            if (Orbium.app.debug) {
                that.stats = new Stats();
                that.stats.domElement.style.position = 'absolute';
                that.stats.domElement.style.top = '30px';
                container.appendChild(that.stats.domElement);
            }

            that.renderer.render(that.scene, that.camera);
        }());

        // Create the physics engine
        (function() {
            that.timeStep = 1 / 60;
            that.physicsWorld = new CANNON.World();
            that.physicsWorld.gravity.set(0, -9.8, 0);
            that.physicsWorld.broadphase = new CANNON.NaiveBroadphase();
            that.physicsWorld.solver.iterations = 10;
        }());

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
        this.renderer.render(this.scene, this.camera);
    },
    animate: function() {

        this.requestAnimationId = requestAnimationFrame(this.animate.bind(this));

        this.updatePhysics();
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
    updatePhysics: function() {
        // Step the physics world
        this.physicsWorld.step(this.timeStep);

        // Copy coordinates from Cannon.js to Three.js
        for (k in this.bodies) {
            this.bodies[k].physics.position.copy(this.bodies[k].mesh.position);
            this.bodies[k].physics.quaternion.copy(this.bodies[k].mesh.quaternion);
        }

    },
    startAnimation: function() {
        this.animate();
        this.worldStatus = "RUNNING";
    },
    stopAnimation: function() {
        cancelAnimationFrame(this.requestAnimationId);

        // Reset world state
        for (k in this.bodies) {
            this.bodies[k].mesh.position.y = this.bodies[k].mesh.position.y0;
            this.bodies[k].mesh.position.x = this.bodies[k].mesh.position.x0;
        }

        this.worldStatus = "STOPPED";
        this.render();
    },
    pauseAnimation: function() {
        cancelAnimationFrame(this.requestAnimationId);
        this.worldStatus = "PAUSED";
    },
    addCube: function() {
        
        var body={};
        
        var shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        var mass = 1;
        body.physics = new CANNON.RigidBody(mass, shape);
        body.physics.angularVelocity.set(0, 0, 3);
        body.physics.angularDamping = 0;

        this.physicsWorld.add(body.physics);

        var geometry = new THREE.CubeGeometry(2, 2, 2);
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        body.mesh = new THREE.Mesh(geometry, material);
        body.mesh.useQuaternion = true;
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


