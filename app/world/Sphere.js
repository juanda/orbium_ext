Ext.define('Orbium.world.Sphere', {
    extend: 'Orbium.world.BaseBody',
    createPhysicBody: function() {

        var m = this.cannonToThreeMultiplier;

        var shape = new CANNON.Sphere(this.parameters.geometry.radius / m);

        // Shape on plane       
        this.physics = new CANNON.RigidBody(this.parameters.physicsParams.mass, shape);

        this.setPhysicParams();

    },
    createMeshBody: function() {
        var geometry = new THREE.SphereGeometry(this.parameters.geometry.radius, 20, 20);

        this.createMesh(geometry);
    }   
});


