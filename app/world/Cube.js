Ext.define('Orbium.world.Cube', {
    extend: 'Orbium.world.BaseBody',
    
    createPhysicBody: function() {
        var m = this.cannonToThreeMultiplier;
        var shape = new CANNON.Box(
                new CANNON.Vec3(this.parameters.geometry.width / m,
                this.parameters.geometry.height / m,
                this.parameters.geometry.depth / m)
                );

        this.physics = new CANNON.RigidBody(this.parameters.physicsParams.mass, shape);

        this.setPhysicParams();        
    },
    createMeshBody: function() {
        var geometry = new THREE.CubeGeometry(
                this.parameters.geometry.width,
                this.parameters.geometry.height,
                this.parameters.geometry.depth
                );
        this.createMesh(geometry);
    }

});


