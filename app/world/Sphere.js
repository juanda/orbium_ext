Ext.define('Orbium.world.Sphere', {
    extend: 'Orbium.world.BaseBody',
    
    initPhysics: function() {

        var m = this.cannonToThreeMultiplier;

        var shape = new CANNON.Sphere(this.parameters.geometry.radius / m);

        // Shape on plane       
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
        var geometry = new THREE.SphereGeometry(this.parameters.geometry.radius, 20, 20);

        var material = new THREE.MeshBasicMaterial({color: 0xff0000});

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.useQuaternion = true;
        
        this.physics.position.copy(this.mesh.position);
        //this.physics.quaternion.copy(this.mesh.quaternion);
    }

});


