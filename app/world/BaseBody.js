Ext.define('Orbium.world.BaseBody', {
    cannonToThreeMultiplier: 2,
    constructor: function(params) {
        
        this.parameters = params;

        this.physics = {};
        this.mesh = {};
        
        this.initialize();

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