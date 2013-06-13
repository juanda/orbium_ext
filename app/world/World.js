Ext.define('Orbium.world.World', {
    bodies: [],
    worldStatus: "STOPPED",
    extend: 'Ext.util.Observable',
    constructor: function(world) {

        this.callParent();

        // These events aren't use yet
        this.addEvents("startAnimation", "pauseAnimation", "stopAnimation");

        this.intersected = null;
        this.itemSelected = null;
        this.bodyMenu = Ext.create('Orbium.view.BodyMenu');

        this.initScene(world);
        this.initPhysicsWorld();

        // This is to store the bodies added to the world
        this.bodyStore = Ext.create('Ext.data.Store', {
            model: 'Orbium.model.Body',
            proxy: {
                type: 'localstorage',
                id: 'bodies'
            }
        });

    },
    initScene: function(worldContainer) {

        var me = this;

        // Needed to compute intersections and select object by picking with 
        // the mouse
        this.projector = new THREE.Projector();


        // Get the DOM Element of the world
        var container = worldContainer;

        // Create the THREE scene
        this.scene = new THREE.Scene();

        // Create the renderer 
        // TODO: Autodetect canvas available to use the correct one
        //this.renderer = new THREE.WebGLRenderer();
        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 30;

        // To monitor performance (fps)
        if (Orbium.app.debug) {
            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.top = '30px';
            container.appendChild(this.stats.domElement);
        }

        // Right button detection to activate body menu.
        container.on({
            click: me.selectBody,
            contextmenu: me.showBodyContexMenu,
            scope: this// Important. Ensure "this" is correct during handler execution

        });
        Ext.EventManager.onWindowResize(this.onWindowResize, this);

        this.renderer.render(this.scene, this.camera);
    },
    initPhysicsWorld: function() {
        this.timeStep = 1 / 60;
        this.physicsWorld = new CANNON.World();
        this.physicsWorld.gravity.set(0, -9.8, 0);
        this.physicsWorld.broadphase = new CANNON.NaiveBroadphase();
        this.physicsWorld.solver.iterations = 10;
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
        this.bodyStore.each(function() {
            this.physics.position.copy(this.mesh.position);
            this.physics.quaternion.copy(this.mesh.quaternion);
        });
    },
    animate: function() {

        this.requestAnimationId = requestAnimationFrame(this.animate.bind(this));

        this.updatePhysics();
        this.render();

        if (this.stats) {
            this.stats.update();
        }

        // deltaCamera tunning to get a camera constant velocity
//        var time;
//        var now = new Date().getTime();
//
//        this.repeat = now - (time || now);
//        time = now;
//
//        this.deltaCamera = this.veloCamara * this.repeat / 10;

    },
    startAnimation: function() {
        this.animate();
        this.worldStatus = "RUNNING";
        this.fireEvent("startAnimation");
    },
    stopAnimation: function() {
        cancelAnimationFrame(this.requestAnimationId);

        console.log(this);
        // Reset world state

        this.bodyStore.each(function() {
            this.setPhysicParams();
            this.physics.initQuaternion.copy(this.physics.quaternion);
            this.physics.quaternion.copy(this.mesh.quaternion);
        });

        this.worldStatus = "STOPPED";
        this.updatePhysics();
        this.render();
        this.fireEvent("stopAnimation");
    },
    pauseAnimation: function() {
        cancelAnimationFrame(this.requestAnimationId);
        this.worldStatus = "PAUSED";
        this.fireEvent("pauseAnimation");
    },
    addBody: function(body) {

        this.bodyStore.add(body);
        this.physicsWorld.add(body.physics);
        this.scene.add(body.mesh);

        console.log(this);
        this.renderer.render(this.scene, this.camera);
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