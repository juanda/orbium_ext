Ext.define('Orbium.model.Sphere', {
    extend: 'Orbium.model.Body',
    fields: [
        {name: 'geometry_radius', type: 'number'}
    ],
    createBody: function() {

        var me = this;
        this.mesh = new CubicVR.SceneObject(
                {
                    mesh: Orbium.app.mundo.sphereMesh(),
                    scale: [this.data.geometry_radius, this.data.geometry_radius, this.data.geometry_radius],
                    position: [this.data.position_x, this.data.position_y, this.data.position_z]
                }
        );
        this.physics = new CubicVR.RigidBody(me.mesh, {
            type: CubicVR.enums.physics.body.DYNAMIC,
            restitution: 0.99,
            collision: {
                type: CubicVR.enums.collision.shape.SPHERE,
                radius: me.data.geometry_radius                
            }
        });

        this.setInitParams();
    },

     editBody: function(){        

        this.mesh.scale = [this.data.geometry_radius, this.data.geometry_radius, this.data.geometry_radius];
        this.mesh.position = [this.data.position_x, this.data.position_y, this.data.position_z];
        this.setInitParams();

         Orbium.app.mundo.scene.render();
    }
});

