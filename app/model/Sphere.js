Ext.define('Orbium.model.Sphere', {
    extend: 'Orbium.model.Body',
    fields: [
        {name: 'geometry_radius', type: 'number'}
    ],
    createPhysicBody: function() {

        var m = this.cannonToThreeMultiplier;

        var shape = new CANNON.Sphere(this.data.geometry_radius / m);

        // Shape on plane       
        this.physics = new CANNON.RigidBody(this.data.physicParams_mass, shape);

        this.setPhysicParams();

    },
    createMeshBody: function() {
        var geometry = new THREE.SphereGeometry(this.data.geometry_radius, 20, 20);

        this.createMesh(geometry);
    }
});

