Ext.define('Orbium.model.Body', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'physicParams_mass', type: 'number'},
        {name: 'physicParams_angularDamping', type: 'number'},
        {name: 'position_x', type: 'number'},
        {name: 'position_y', type: 'number'},
        {name: 'position_z', type: 'number'},
        {name: 'velocity_x', type: 'number'},
        {name: 'velocity_y', type: 'number'},
        {name: 'velocity_z', type: 'number'},
        {name: 'angularVelocity_x', type: 'number'},
        {name: 'angularVelocity_y', type: 'number'},
        {name: 'angularVelocity_z', type: 'number'}
    ],
    constructor: function() {

        this.callParent();

        this.physics = {};
        this.mesh = {};               

    },
    createPhysicAndMeshBodies: function() {
        this.createPhysicBody();
        this.createMeshBody();
        this.sincroPosition();
    },
    edit: function() {
        this.editPhysicBody();
        this.editMeshBody();
        this.sincroPosition();

    },
    setPhysicParams: function() {

        this.physics.position.x = this.data.position_x;
        this.physics.position.y = this.data.position_y;
        this.physics.position.z = this.data.position_z;

        this.physics.velocity.x = this.data.velocity_x;
        this.physics.velocity.y = this.data.velocity_y;
        this.physics.velocity.z = this.data.velocity_z;

        this.physics.angularVelocity.x = this.data.angularVelocity_x;
        this.physics.angularVelocity.y = this.data.angularVelocity_y;
        this.physics.angularVelocity.z = this.data.angularVelocity_z;

        this.physics.angularDamping = this.data.physicParams_angularDamping;

    },
    createMesh: function(geometry) {
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.useQuaternion = true;
    },
    sincroPosition: function() {
        this.physics.position.copy(this.mesh.position);
        //this.physics.quaternion.copy(this.mesh.quaternion);
    }
});

