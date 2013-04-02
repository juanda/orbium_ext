Ext.define('Orbium.world.BaseBody', {
    cannonToThreeMultiplier: 2,
    constructor: function(params) {

        var defaultParams = {
            physicsParams: {
                mass: 1
            },
            geometry: {
                radius: 1
            },
            initialConditions: {
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                velocity: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }
        };
        if(typeof this.parameters === 'undefined'){
            this.parameters = {};
        }
        Ext.Object.merge(this.parameters, defaultParams);

        if (typeof params !== 'undefined') {
            Ext.Object.merge(this.parameters, params);
        }

        this.physics = {};
        this.mesh = {};

    },
    initialize: function() {
        this.initPhysics();
        this.initMesh();

    },
    initPhysics: function() {
        throw "the method initPhysics is not implemented by this object";

    },
    initMesh: function() {
        throw "the method initMesh is not implemented by this object";
    },
    addToWorld: function(world) {

        world.physicsWorld.add(this.physics);
        world.scene.add(this.mesh);

    }
});