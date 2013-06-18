Ext.define('Orbium.model.Cube', {
    extend: 'Orbium.model.Body',
    fields: [
        {name: 'geometry_width', type: 'number'},
        {name: 'geometry_height', type: 'number'},
        {name: 'geometry_depth', type: 'number'}
    ],
    createPhysicBody: function() {

        var shape = new CANNON.Box(
                new CANNON.Vec3(this.data.geometry_width / m,
                this.data.geometry_height / m,
                this.data.geometry_depth / m)
                );

        this.physics = new CANNON.RigidBody(this.data.physicParams_mass, shape);

        this.setPhysicParams();
    },
    createMeshBody: function() {
    
        var me = this;
        
        this.mesh = new CubicVR.SceneObject({
            mesh: Orbium.app.mundo.meshes.boxMesh,
            scale: [this.data.geometry_width, this.data.geometry_height, this.data.geometry_depth],
            position: [this.data.position_x, this.data.position_y, this.data.position_z],
            rotation: [0, 0, 0]
        });
        
        this.physics = new CubicVR.RigidBody(me.mesh, {
            type: CubicVR.enums.physics.body.DYNAMIC,
            collision: {
                type: CubicVR.enums.collision.shape.BOX,
                size: me.mesh.scale
            }
        });
        
    }
});

