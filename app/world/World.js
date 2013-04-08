Ext.define('Orbium.world.World', {
    bodies: [],
    worldStatus: "STOPPED",
    cannonToThreeMultiplier: 2,
    extend: 'Ext.util.Observable',
    constructor: function(world) {

        Orbium.app.consoleLog('constructor Orbium.World');
        Orbium.app.consoleLog(world);

        this.callParent();
        this.addEvents("startAnimation", "pauseAnimation", "stopAnimation");

        this.INTERSECTED = null;

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

        var me = this;

        this.projector = new THREE.Projector();
        this.INTERSECTED = null;

        var config = {veloCamara: 1};
        this.veloCamara = (config.veloCamara || 1);

        var container = world.getViewer();

        this.world = world;

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

        world.getEl().on({
            click: me.selectBody,
           
            scope: this // Important. Ensure "this" is correct during handler execution
        });
        Ext.EventManager.onWindowResize(this.onWindowResize,this);

        this.renderer.render(this.scene, this.camera);
    },
    render: function() {
        var toolbarBodies = Ext.ComponentQuery.query('orbiumtoolbarbodies');

        if (this.worldStatus != "STOPPED") {
            toolbarBodies[0].disable();
        } else {
            toolbarBodies[0].enable();
        }

        //Orbium.app.consoleLog("requestAnimationId: " + this.requestAnimationId);
        //Orbium.app.consoleLog("stepnumber: " + this.physicsWorld.time);
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
        this.fireEvent("startAnimation");
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
        this.fireEvent("stopAnimation");
    },
    pauseAnimation: function() {
        cancelAnimationFrame(this.requestAnimationId);
        this.worldStatus = "PAUSED";
        this.fireEvent("pauseAnimation");
    },
    addCube: function(params) {
        console.log(params);
        var parameters = {
            physicsParams: {
                mass: parseFloat(params.mass),
                angularDamping: parseFloat(params.angularDamping)
            },
            geometry: {
                width: parseFloat(params.width),
                height: parseFloat(params.height),
                depth: parseFloat(params.depth)
            },
            initialConditions: {
                position: {
                    x: parseFloat(params.position_x),
                    y: parseFloat(params.position_y),
                    z: parseFloat(params.position_z)
                },
                velocity: {
                    x: parseFloat(params.velocity_x),
                    y: parseFloat(params.velocity_y),
                    z: parseFloat(params.velocity_z)
                },
                angularVelocity: {
                    x: parseFloat(params.angularVelocity_x),
                    y: parseFloat(params.angularVelocity_y),
                    z: parseFloat(params.angularVelocity_z)
                }
            }
        };

        var body = Ext.create('Orbium.world.Cube', parameters);

        console.log(body);

        body.addToWorld(this);

        // Add to bodies collection
        this.bodies.push(body);

        // render
        this.renderer.render(this.scene, this.camera);
    },
    addSphere: function(params) {

        console.log(params);
        var parameters = {
            physicsParams: {
                mass: parseFloat(params.mass),
                angularDamping: parseFloat(params.angularDamping)
            },
            geometry: {
                radius: parseFloat(params.radius)
            },
            initialConditions: {
                position: {
                    x: parseFloat(params.position_x),
                    y: parseFloat(params.position_y),
                    z: parseFloat(params.position_z)
                },
                velocity: {
                    x: parseFloat(params.velocity_x),
                    y: parseFloat(params.velocity_y),
                    z: parseFloat(params.velocity_z)
                },
                angularVelocity: {
                    x: parseFloat(params.angularVelocity_x),
                    y: parseFloat(params.angularVelocity_y),
                    z: parseFloat(params.angularVelocity_z)
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
    },
    selectBody: function(e) {

        mouse = {
            x: (e.browserEvent.clientX / window.innerWidth) * 2 - 1,
            y: -(e.browserEvent.clientY / window.innerHeight) * 2 + 1
        };

        var vector = new THREE.Vector3(mouse.x, mouse.y, 1);

        console.log(vector);

        this.projector.unprojectVector(vector, this.camera);
        console.log(vector);

        var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

        var intersects = raycaster.intersectObjects(this.scene.children);

        console.log(this.scene.children);
        console.log(intersects);

        if (intersects.length > 0) {

            console.log('Te pillé');

//            if (this.INTERSECTED != intersects[ 0 ].object) {
//
//                if (this.INTERSECTED)
//                    this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
//
//                this.INTERSECTED = intersects[ 0 ].object;
//                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
//                this.INTERSECTED.material.emissive.setHex(0xff0000);

//            }

        } else {

            if (this.INTERSECTED)
                this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

            this.INTERSECTED = null;

        }
    },
    onWindowResize: function() {
       
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.renderer.render(this.scene, this.camera);

    }
});


