Ext.define('Orbium.world.World', {
    bodies: [],
    worldStatus: "STOPPED",
    extend: 'Ext.util.Observable',
//    listeners: {
//        
//    },
    constructor: function(world) {

        var me = this;

        this.callParent();

        // These events aren't use yet
        this.addEvents("startAnimation", "pauseAnimation", "stopAnimation");

        this.bodyMenu = Ext.create('Orbium.view.BodyMenu');

        this.initScene(world);
        this.createMaterialsAndMeshes();
        this.initPhysicsWorld();
        this.startMainLoop();
        this.loop.setPaused(true);

        // This is to store the bodies added to the world
        this.bodyStore = Ext.create('Ext.data.Store', {
            model: 'Orbium.model.Body',
            proxy: {
                type: 'localstorage',
                id: 'bodies'
            }
        });

        this.on({
            startAnimation: me.disableToolbarBody,
            stopAnimation: me.enableToolbarBody,
            pauseAnimation: me.disableToolbarBody
        });

    },
    createMaterialsAndMeshes: function() {
        // Create a material for the mesh
        var materialWall = new CubicVR.Material({
            textures: {
                color: new CubicVR.Texture("images/6583-diffuse.jpg")
            }
        });

        // Add a box to mesh, size 1.0, apply material and UV parameters
        var boxMesh = CubicVR.primitives.box({
            size: 1.0,
            material: materialWall,
            uvmapper: {
                projectionMode: CubicVR.enums.uv.projection.CUBIC,
                scale: [1, 1, 1]
            }
        });

        // triangulate and buffer object to GPU, remove unused data
        boxMesh.prepare();

        var sphereMesh = new CubicVR.Mesh({
            primitive: {
                type: "sphere",
                radius: 1,
                lat: 24,
                lon: 24,
                material: {
                    color: [80 / 255, 200 / 255, 120 / 255],
                    specular: [1, 1, 1],
                    shininess: 0.9,
                    env_amount: 1.0,
                    textures: {
                        color: "images/2576-diffuse.jpg",
                        normal: "images/2576-normal.jpg",
                        bump: "images/2576-bump.jpg",
                        envsphere: "images/fract_reflections.jpg"
                    }
                },
                uv: {
                    projectionMode: "spherical",
                    projectionAxis: "y",
                    wrapW: 5,
                    wrapH: 2.5
                }
            },
            compile: true
        });

        sphereMesh.prepare();


        //Create several meshes to use when adding bodies
        // Create the Box Mesh
        this.meshes = {
            boxMesh: boxMesh,
            sphereMesh: sphereMesh
        };

    },
    initScene: function(world) {

        var me = this;

        // Init CubicVR
        var gl = CubicVR.init();
        if (!gl) {
            alert("Sorry, no WebGL support.");
            return;
        }
        ;

        // Get the DOM Element of the world
        //var container = worldContainer;
        var canvas = CubicVR.getCanvas();
        world.getEl().appendChild(canvas);

        // New scene with our canvas dimensions and camera with FOV 80

        var camera = new CubicVR.Camera({
            name: "the_camera",
            fov: 80.0,
            position: [0.0, 0.0, -20.0],
            lookat: [0.0, 0.0, 0.0],
            width: canvas.width,
            height: canvas.height
        });

        // Create the Light

        var light = new CubicVR.Light({
            type: CubicVR.enums.light.type.DIRECTIONAL,
            specular: [1, 1, 1],
            direction: [0.5, -1, 0.5]
        });

        // Create the Scene
        this.scene = new CubicVR.Scene();

        this.scene.bind(camera);
        this.scene.bind(light);

        // Add the default scene camera to the resize list to update on browser resize
        CubicVR.addResizeable(camera);

        // initialize a mouse view controller
        mvc = new CubicVR.MouseViewController(canvas, this.scene.camera);

        // To monitor performance (fps)
        if (Orbium.app.debug) {
            var canvas = CubicVR.getCanvas();
            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.top = 5;
            this.stats.domElement.style.left = canvas.width - 100;
            world.getEl().appendChild(this.stats.domElement);
        }
        // Right button detection to activate body menu.
//        world.getEl().on({
////            click: me.selectBody,
//            //contextmenu: me.showBodyContexMenu,
//            click: me.kk,
//            startAnimation: me.kk,
//            scope: this// Important. Ensure "this" is correct during handler execution
//
//        });

//        Ext.EventManager.onWindowResize(this.onWindowResize, this);

    },
    initPhysicsWorld: function() {
        this.physicsWorld = new CubicVR.ScenePhysics();
    },
    startMainLoop: function() {
        var me = this;
        // Start our main drawing loop, it provides a timer and the gl context as parameters
        this.loop = CubicVR.MainLoop(function(timer, gl) {
            var seconds = timer.getSeconds();

            if (!timer.paused_state)
                me.physicsWorld.stepSimulation(timer.getLastUpdateSeconds());
            // perform any per-frame operations here
            // perform any drawing operations here
            me.scene.render();

            if (me.stats) {
                me.stats.update();
            }
        });
    },
    enableToolbarBody: function() {
        var toolbarBodies = Ext.ComponentQuery.query('orbiumtoolbarbodies');
        toolbarBodies[0].enable();
    },
    disableToolbarBody: function() {
        var toolbarBodies = Ext.ComponentQuery.query('orbiumtoolbarbodies');
        toolbarBodies[0].disable();
    },
    startAnimation: function() {
        this.loop.setPaused(false);
        this.worldStatus = "RUNNING";
        this.fireEvent("startAnimation");
    },
    stopAnimation: function() {

        this.loop.setPaused(true);

        this.bodyStore.each(function() {
            this.physics.setPosition([this.data.position_x, this.data.position_y, this.data.position_z]);
            this.physics.setLinearVelocity([this.data.velocity_x, this.data.velocity_y, this.data.velocity_z]);
            this.mesh.position = [this.data.position_x, this.data.position_y, this.data.position_z];
        });

        this.scene.render();

        this.worldStatus = "STOPPED";

        this.fireEvent("stopAnimation");
    },
    pauseAnimation: function() {
        this.loop.setPaused(true);
        this.worldStatus = "PAUSED";
        this.fireEvent("pauseAnimation");
    },
    addBody: function(body) {
        console.log(body);
        this.bodyStore.add(body);
        //this.physicsWorld.add(body.physics);           
        this.scene.bind(body.mesh);

        this.physicsWorld.bindRigidBody(body.physics);
    },
    addGroundPlane: function(body) {

        //this.bodyStore.add(body);
        this.physicsWorld.add(body.physics);
        this.scene.add(body.mesh);

        console.log(this);
        this.renderer.render(this.scene, this.camera);
    },
    indexOfBodyWithMeshId: function(id) {
        // id is a body mesh index

        var indexBody = null;

        var me = this;
        this.bodyStore.each(function() {
            if (this.mesh.id === id) {
                indexBody = me.bodyStore.indexOf(this);
            }
        });

        return indexBody;
    },
    selectBody: function(e) {

        // e.browserEvent.clientX goes from 0 to window.innerWidth and
        // e.browserEvent.clientY goes from 0 to window.innerHeight, so
        // mouse.x goes from -1 to 1 and the same for mouse.y
        // The mouse position must be corrected by the canvas offset due
        // to other dom elements (like the toolbar). The correction are
        // this.renderer.domElement.offsetLeft and this.renderer.domElement.offsetTop
        mouse = {
            x: ((e.browserEvent.clientX - this.renderer.domElement.offsetLeft) / window.innerWidth) * 2 - 1,
            y: -((e.browserEvent.clientY - this.renderer.domElement.offsetTop) / window.innerHeight) * 2 + 1
        };

        var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        this.projector.unprojectVector(vector, this.camera);

        var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

        var intersects = raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {

            var intersected = intersects[ 0 ].object;

            // Revert color to old selected body

            if (this.itemSelected) {
                this.itemSelected.material.color.setHex(0xff0000);
            }
            if (this.itemSelected && intersected.id !== this.itemSelected.id
                    || !this.itemSelected) {
                this.itemSelected = intersected;
                this.itemSelected.material.color.setHex(0x000000);

                this.itemSelected.mouseX = e.browserEvent.clientX;
                this.itemSelected.mouseY = e.browserEvent.clientY;
            } else {
                this.itemSelected = null;
            }

            this.renderer.render(this.scene, this.camera);

//            if (this.intersected != intersects[ 0 ].object) {
//
//                if (this.intersected)
//                    this.intersected.material.emissive.setHex(this.intersected.currentHex);
//
//                this.intersected = intersects[ 0 ].object;
//                this.intersected.currentHex = this.intersected.material.emissive.getHex();
//                this.intersected.material.emissive.setHex(0xff0000);

//            }

        } else {

            this.intersected = null;

        }
    },
    showBodyContexMenu: function(e) {

        if (!this.itemSelected)
            return;

        this.bodyMenu.setPagePosition(this.itemSelected.mouseX, this.itemSelected.mouseY);
        this.bodyMenu.show();
    },
    onWindowResize: function() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);

    }
});