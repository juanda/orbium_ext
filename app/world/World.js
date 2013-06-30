Ext.define('Orbium.world.World', {
    extend: 'Ext.util.Observable',
    constructor: function(world) {

        var me = this;

        this.callParent();

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

        // Animation events
        this.addEvents("startAnimation", "pauseAnimation", "stopAnimation");

        this.on({
            startAnimation: me.disableToolbarBody,
            stopAnimation: me.enableToolbarBody,
            pauseAnimation: me.disableToolbarBody
        });

    },
    createMaterialsAndMeshes: function() {

        var texture = new CubicVR.Texture("images/2282-diffuse.jpg");
        var textureSelected = new CubicVR.Texture("images/4734-diffuse.jpg");
        // Create a material for the mesh
        var materialWall = new CubicVR.Material({
            textures: {
                color: texture
            }
        });

        // Add a box to mesh, size 1.0, apply material and UV parameters

        this.boxMesh = function() {
            var boxMesh = new CubicVR.Mesh({
                primitive: {
                    type: "box",
                    size: 1,
                    material: {
                        textures: {
                            color: texture
                        }
                    },
                    uv: {
                        projectionMode: CubicVR.enums.uv.projection.CUBIC,
                    }
                },
                compile: true
            });
            // triangulate and buffer object to GPU, remove unused data
            boxMesh.prepare();
            return boxMesh;
        };

        this.sphereMesh = function() {
            var sphereMesh = new CubicVR.Mesh({
                primitive: {
                    type: "sphere",
                    radius: 1,
                    lat: 24,
                    lon: 24,
                    material: {
                        textures: {
                            color: texture
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
            
            return sphereMesh;
        };
        this.textures = {
            normal: texture,
            selected: textureSelected
        };

        // Floor
        var material3 = new CubicVR.Material({
          specular:[1,1,1],
          shininess: 0.9,
          env_amount: 1.0,
          textures: {
            color:  new CubicVR.Texture("images/6583-diffuse.jpg"),
          }
        });
        var floorMesh = CubicVR.primitives.box({
          size: 1.0,
          material: material3,
          uvmapper: {
            projectionMode: CubicVR.enums.uv.projection.CUBIC,
            scale: [0.1, 0.1, 0.1]
          }
        }).prepare();

        this.floorObject = new CubicVR.SceneObject({
          mesh: floorMesh,
          scale: [50, 0.2, 50],
          position: [0, -5, 0],
        });

        this.rigidFloor = new CubicVR.RigidBody(this.floorObject, {
          type: CubicVR.enums.physics.body.STATIC,
          mass: 0,
          restitution: 0.9999,
          collision: {
            type: CubicVR.enums.collision.shape.BOX,
            size: this.floorObject.scale,            
          }
        });

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
        this.mvc = new CubicVR.MouseViewController(canvas, this.scene.camera);

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
        world.getEl().on({
            click: me.selectBody,
            contextmenu: me.showBodyContexMenu,
            scope: this// Important. Ensure "this" is correct during handler execution

        });
    },
    initPhysicsWorld: function() {
        this.physicsWorld = new CubicVR.ScenePhysics();
    },
    startMainLoop: function() {
        var me = this;
        // Start our main drawing loop, it provides a timer and the gl context as parameters
        this.loop = CubicVR.MainLoop(function(timer, gl) {
            me.timer = timer;
            var seconds = timer.getSeconds();

            if (!timer.paused_state)
                me.physicsWorld.stepSimulation(timer.getLastUpdateSeconds());
            // perform any per-frame operations here
            // perform any drawing operations here
            me.scene.render();

            // Update status monitor
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
        this.fireEvent("startAnimation");
    },
    resetAnimation: function() {
        this.loop.setPaused(true);

        this.physicsWorld.reset();
        
        this.bodyStore.each(function() {
            this.setInitParams(); // this is each body in the store
        });

        this.scene.render();

        this.fireEvent("stopAnimation");
    },
    pauseAnimation: function() {
        this.loop.setPaused(true);        
        this.fireEvent("pauseAnimation");
    },
    addBody: function(body) {
        this.bodyStore.add(body);
        body.mesh.kbody = this.bodyStore.indexOf(body);        

        this.scene.bind(body.mesh, true); // second argument = pickable
        this.physicsWorld.bindRigidBody(body.physics);
    },
    selectBody: function(e) {

        var me = this;

        var rayTest = me.scene.bbRayTest(me.scene.camera.position, me.mvc.getMousePosition(), 3);


        var changeTexture = true;
        if (rayTest.length > 0) {
            if (me.objectSelected) {
                me.objectSelected.obj.getMesh().materials[0].setTexture(this.textures.normal);

                if (me.objectSelected.obj === rayTest[0].obj)
                    changeTexture = false;
            }
            me.objectSelected = null;
            if (changeTexture) {

                me.objectSelected = rayTest[0];
                me.objectSelected.obj.mousePosition = me.mvc.getMousePosition();
                me.objectSelected.obj.getMesh().materials[0].setTexture(this.textures.selected);
            }
        }
    },
    showBodyContexMenu: function(e) {

        if (!this.objectSelected)
            return;
        
        this.bodyMenu.setPagePosition(this.objectSelected.obj.mousePosition[0], this.objectSelected.obj.mousePosition[1]);
        this.bodyMenu.show();
    },
    addFloor: function(){        
        this.scene.bindSceneObject(this.floorObject);
        this.physicsWorld.bindRigidBody(this.rigidFloor);  
        //this.physicsWorld.reset();      
    },
    removeFloor: function(){
        this.scene.removeSceneObject(this.floorObject);
        this.physicsWorld.remove(this.rigidFloor);
        //this.physicsWorld.reset();
    }
});