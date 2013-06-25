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
 * - createBody
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

        this.physics = {}; // Object for physics (ammo.js) info
        this.mesh = {};    // Object for mesh (cubicvr.js) info         
    },
    updatePhysicsAndMeshBodies: function() {

        // the solution to update the physics and mesh bodies
        // asociated to the body is:
        // - 1, remove the body from the world/scene
        // - 2, create new physics body/mesh
        // - 3, add these new physics to the world/scene
        // - 4, render the world

        // remove the physics body from the physics World
        
        console.log(this);        
        this.setInitParams();
        
        Orbium.app.mundo.scene.render();
    },
    setInitParams: function() {
        this.mesh.position = [this.data.position_x, this.data.position_y, this.data.position_z];
        this.physics.setPosition([this.data.position_x, this.data.position_y, this.data.position_z]);
        this.physics.setLinearVelocity([this.data.velocity_x, this.data.velocity_y, this.data.velocity_z]);

    }
});

