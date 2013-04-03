Ext.define('Orbium.world.World', {
    bodies: [],
    worldStatus: "STOPPED",
    cannonToThreeMultiplier: 2,
    constructor: function(world) {

        Orbium.app.consoleLog('constructor Orbium.World');
        Orbium.app.consoleLog(world);

        this.initScene(world);
        this.initPhysicsWorld();

    },
    initPhysicsWorld: function() {
        this.timeStep = 1 / 60;
        this.physicsWorld = new CANNON.World();
        this.physicsWorld.gravity.set(0, -9.8, 0);
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

//        this.renderer = new THREE.WebGLRenderer();
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
        var toolbarBodies = Ext.ComponentQuery.query('orbiumtoolbarbodies');

        if (this.worldStatus != "STOPPED") {
            toolbarBodies[0].disable();
        } else {
            toolbarBodies[0].enable();
        }
        
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
            this.bodies[k].physics.position.x = this.bodies[k].parameters.initialConditions.position.x;
            this.bodies[k].physics.position.y = this.bodies[k].parameters.initialConditions.position.y;
            this.bodies[k].physics.position.z = this.bodies[k].parameters.initialConditions.position.z;
            this.bodies[k].physics.position.copy(this.bodies[k].mesh.position);

            // reset physical quaternion and copy on associated mesh
            this.bodies[k].physics.velocity.x = this.bodies[k].parameters.initialConditions.velocity.x;
            this.bodies[k].physics.velocity.y = this.bodies[k].parameters.initialConditions.velocity.y;
            this.bodies[k].physics.velocity.z = this.bodies[k].parameters.initialConditions.velocity.z;

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
        var parameters = {
            physicsParams: {
                mass: 1,
                angularDamping: 0
            },
            geometry: {
                width: 5,
                height: 5,
                depth: 5
            },
            initialConditions: {
                position: {
                    x: 0,
                    y: -10,
                    z: 0
                },
                velocity: {
                    x: 10,
                    y: 20,
                    z: 0
                },
                angularVelocity: {
                    x: 0,
                    y: 0,
                    z: 10
                }
            }
        };

        var body = Ext.create('Orbium.world.Cube', parameters);

        body.addToWorld(this);

        // Add to bodies collection
        this.bodies.push(body);

        // render
        this.renderer.render(this.scene, this.camera);
    },
    addCubeold: function() {

        var body = {};

        var parameters = {
            physicsParams: {
                mass: 1,
                angularDamping: 0
            },
            geometry: {
                width: 2,
                height: 2,
                depth: 2
            },
            initialConditions: {
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                velocity: {
                    x: 10,
                    y: 10,
                    z: 0
                },
                angularVelocity: {
                    x: 10,
                    y: 10,
                    z: 10
                }
            }

        };

        body.parameters = parameters;

        var m = this.cannonToThreeMultiplier;

        // Create the physics part of the body object
        var shape = new CANNON.Box(
                new CANNON.Vec3(body.parameters.geometry.width / m,
                body.parameters.geometry.height / m,
                body.parameters.geometry.depth / m)
                );
        var mass = body.parameters.physicsParams.mass;
        body.physics = new CANNON.RigidBody(mass, shape);

        body.physics.position.x = body.parameters.initialConditions.position.x;
        body.physics.position.y = body.parameters.initialConditions.position.y;
        body.physics.position.z = body.parameters.initialConditions.position.z;

        body.physics.velocity.x = body.parameters.initialConditions.velocity.x;
        body.physics.velocity.y = body.parameters.initialConditions.velocity.y;
        body.physics.velocity.z = body.parameters.initialConditions.velocity.z;

        body.physics.angularVelocity.set(
                body.parameters.initialConditions.angularVelocity.x,
                body.parameters.initialConditions.angularVelocity.y,
                body.parameters.initialConditions.angularVelocity.z
                );
        body.physics.angularDamping = body.parameters.physicsParams.angularDamping;

        this.physicsWorld.add(body.physics);

        // Create de visual (mesh) part of the phisical body
        var geometry = new THREE.CubeGeometry(
                body.parameters.geometry.width,
                body.parameters.geometry.width,
                body.parameters.geometry.width
                );
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        body.mesh = new THREE.Mesh(geometry, material);
        body.mesh.useQuaternion = true;

        // Add to viewew scene
        this.scene.add(body.mesh);

        body.physics.position.copy(body.mesh.position);



        // Add to bodies collection
        this.bodies.push(body);

        // render
        this.renderer.render(this.scene, this.camera);
    },
    addSphere: function() {
        var parameters = {
            physicsParams: {
                mass: 1,
                angularDamping: 0
            },
            geometry: {
                radius: 10,
            },
            initialConditions: {
                position: {
                    x: 0,
                    y: 30,
                    z: -30
                },
                velocity: {
                    x: -10,
                    y: 20,
                    z: 0
                },
                angularVelocity: {
                    x: 0,
                    y: 0,
                    z: 10
                }
            }
        };

        var body = Ext.create('Orbium.world.Sphere', parameters);

        body.addToWorld(this);

        // Add to bodies collection
        this.bodies.push(body);

        // render
        this.renderer.render(this.scene, this.camera);
    },
    addBall2: function() {

        var body = {};

        var config = {
            physicsParams: {
                mass: 1,
                angularDamping: 0
            },
            geometry: {
                radius: 1
            },
            initialConditions: {
                position: {
                    x: 0,
                    y: 10,
                    z: 0
                },
                velocity: {
                    x: -25,
                    y: 0,
                    z: 0
                },
                angularVelocity: {
                    x: 10,
                    y: 10,
                    z: 10
                }
            }

        };

        body.parameters = config;

        var m = this.cannonToThreeMultiplier;

        var shape = new CANNON.Sphere(body.parameters.geometry.radius / m);

        // Shape on plane       
        body.physics = new CANNON.RigidBody(body.parameters.physicsParams.mass, shape);

        body.physics.position.x = body.parameters.initialConditions.position.x;
        body.physics.position.y = body.parameters.initialConditions.position.y;
        body.physics.position.z = body.parameters.initialConditions.position.z;

        body.physics.velocity.x = body.parameters.initialConditions.velocity.x;
        body.physics.velocity.y = body.parameters.initialConditions.velocity.y;
        body.physics.velocity.z = body.parameters.initialConditions.velocity.z;

        this.physicsWorld.add(body.physics);

        var geometry = new THREE.SphereGeometry(body.parameters.geometry.radius, 20, 20);

        var material = new THREE.MeshBasicMaterial({color: 0xff0000});

        body.mesh = new THREE.Mesh(geometry, material);
        body.mesh.useQuaternion = true;

        body.physics.position.copy(body.mesh.position);


        // Add to viewew scene
        this.scene.add(body.mesh);

        // Add to bodies collection
        this.bodies.push(body);

        // render
        this.renderer.render(this.scene, this.camera);
    }
})


