/**
 * Base model for all bodies
 * -------------------------
 *
 * It's a Ext model with some addons for 
 * physics and mesh creation.
 * 
 * Each concrete  body which extends this model
 * must implement the following methods:
 *
 * - createPhysicBody
 * - createMeshBody
 * 
 * See Orbium.model.Cube implementation to get
 * an example.
 */

Ext.define('Orbium.model.Body', {
    extend: 'Ext.data.Model',
    // Common fields
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
        
        this.cannonToThreeMultiplier = 2;
        this.physics = {}; // Object for physics (cannon.js) info
        this.mesh = {};    // Object for mesh (three.js) info         
    },
    createPhysicAndMeshBodies: function() {
        this.createPhysicBody();
        this.createMeshBody();
        this.sincroPosition();
    },
    updatePhysicsAndMeshBodies: function(){
        
        // the solution to update the physics and mesh bodies
        // asociated to the body is:
        // - 1, remove the body from the world/scene
        // - 2, create new physics body/mesh
        // - 3, add these new physics to the world/scene
        // - 4, render the world

        // remove the physics body from the physics World
        Orbium.app.mundo.physicsWorld.remove(this.physics);
        Orbium.app.mundo.scene.remove(this.mesh);

        this.physics  = {};
        this.mesh     = {};

        this.createPhysicAndMeshBodies();

        Orbium.app.mundo.physicsWorld.add(this.physics);
        Orbium.app.mundo.scene.add(this.mesh);

        Orbium.app.mundo.render();
    },
    // Set common physics params from model to cannon.js object
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
        this.physics.linearDamping = 0;

    },
    // Create a mesh (three.js) from a given geometry 
    createMeshFromGeometry: function(geometry) {
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.useQuaternion = true;
    },
    // sincronize mesh and physics position
    sincroPosition: function() {
        this.physics.position.copy(this.mesh.position);
        //this.physics.quaternion.copy(this.mesh.quaternion);
    }
});

