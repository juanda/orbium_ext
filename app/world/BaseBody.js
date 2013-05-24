Ext.define('Orbium.world.BaseBody', {
    cannonToThreeMultiplier: 2,
    constructor: function(params) {

        this.parameters = params;

        this.physics = {};
        this.mesh = {};

        this.createPhysicBody();
        this.createMeshBody();               
        this.sincroPosition();

    },
    edit: function(params) {
        this.parameters = params;
        this.editPhysicBody();
        this.editMeshBody();
        this.sincroPosition();
        
    },   
    setPhysicParams: function() {

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
    createMesh: function(geometry) {
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.useQuaternion = true; 
    },
    sincroPosition: function() {
        this.physics.position.copy(this.mesh.position);
        //this.physics.quaternion.copy(this.mesh.quaternion);
    },
    addToWorld: function(world) {

        world.physicsWorld.add(this.physics);
        world.scene.add(this.mesh);

    }
});