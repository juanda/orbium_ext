Ext.define('Orbium.model.Cube', {
    extend: 'Orbium.model.Body',
    fields: [
        {name: 'geometry_width', type: 'number'},
        {name: 'geometry_height', type: 'number'},
        {name: 'geometry_depth', type: 'number'}               
    ] ,
    createPhysicBody: function() {
        
        var m = this.cannonToThreeMultiplier;
        var shape = new CANNON.Box(
                new CANNON.Vec3(this.data.geometry_width / m,
                this.data.geometry_height / m,
                this.data.geometry_depth / m)
                );

        this.physics = new CANNON.RigidBody(this.data.physicParams_mass, shape);

        this.setPhysicParams();
    },
    createMeshBody: function() {
        var geometry = new THREE.CubeGeometry(
                this.data.geometry_width,
                this.data.geometry_height,
                this.data.geometry_depth
                );
        this.createMeshFromGeometry(geometry);
    }
});

