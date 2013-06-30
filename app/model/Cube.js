Ext.define('Orbium.model.Cube', {
    extend: 'Orbium.model.Body',
    fields: [
        {name: 'geometry_width', type: 'number'},
        {name: 'geometry_height', type: 'number'},
        {name: 'geometry_depth', type: 'number'}
    ],
    createBody: function() {
    
        var me = this;
        
        this.mesh = new CubicVR.SceneObject({
            mesh: Orbium.app.mundo.boxMesh(),
            scale: [this.data.geometry_width, this.data.geometry_height, this.data.geometry_depth],
            position: [this.data.position_x, this.data.position_y, this.data.position_z],
            rotation: [0, 0, 0]
        });
        
        this.physics = new CubicVR.RigidBody(me.mesh, {
            type: CubicVR.enums.physics.body.DYNAMIC,
            restitution: 0.99999,
            collision: {
                type: CubicVR.enums.collision.shape.BOX,
                size: me.mesh.scale               
            }
        });
        
         this.setInitParams();
    },
    editBody: function(){        

        this.mesh.scale = [this.data.geometry_width, this.data.geometry_height, this.data.geometry_depth];
        this.mesh.position = [this.data.position_x, this.data.position_y, this.data.position_z];
        this.setInitParams();

         Orbium.app.mundo.scene.render();
    }
});

