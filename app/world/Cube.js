Ext.define('Orbium.world.Cube', {
    extend: 'Orbium.world.BaseBody',
    
    initPhysics: function() {
        var m = this.cannonToThreeMultiplier;
        var shape = new CANNON.Box(
                new CANNON.Vec3(this.parameters.geometry.width / m,
                this.parameters.geometry.height / m,
                this.parameters.geometry.depth / m)
                );

        this.physics = new CANNON.RigidBody(this.parameters.physicsParams.mass, shape);

        this.physics.position.x = this.parameters.initialConditions.position.x;
        this.physics.position.y = this.parameters.initialConditions.position.y;
        this.physics.position.z = this.parameters.initialConditions.position.z;

        this.physics.velocity.x = this.parameters.initialConditions.velocity.x;
        this.physics.velocity.y = this.parameters.initialConditions.velocity.y;
        this.physics.velocity.z = this.parameters.initialConditions.velocity.z;

        this.physics.angularVelocity.x = this.parameters.initialConditions.angularVelocity.x;
        this.physics.angularVelocity.y = this.parameters.initialConditions.angularVelocity.y;
        this.physics.angularVelocity.z = this.parameters.initialConditions.angularVelocity.z;


        this.physics.angularDamping = this.parameters.physicsParams.angularDamping;
    },
    initMesh: function() {
        var geometry = new THREE.CubeGeometry(
                this.parameters.geometry.width,
                this.parameters.geometry.height,
                this.parameters.geometry.depth
                );
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.useQuaternion = true;

        this.physics.position.copy(this.mesh.position);
        //this.physics.quaternion.copy(this.mesh.quaternion);
    }

});


