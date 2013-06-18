Ext.define('Orbium.model.Sphere', {
    extend: 'Orbium.model.Body',
    fields: [
        {name: 'geometry_radius', type: 'number'}
    ],
    createPhysicBody: function() {

        //var m = this.cannonToThreeMultiplier;

        var shape = new CANNON.Sphere(this.data.geometry_radius /* m*/);

        // Shape on plane       
        this.physics = new CANNON.RigidBody(this.data.physicParams_mass, shape);

        this.setPhysicParams();

    },
    createMeshBody: function() {
        
        var me = this;
        this.mesh = new CubicVR.SceneObject(
                {
                    mesh: Orbium.app.mundo.meshes.sphereMesh,
                    scale: [this.data.geometry_radius, this.data.geometry_radius, this.data.geometry_radius],
                    position: [this.data.position_x, this.data.position_y, this.data.position_z]
                }
        );
        this.physics = new CubicVR.RigidBody(me.mesh, {
            type: CubicVR.enums.physics.body.DYNAMIC,
            collision: {
                type: CubicVR.enums.collision.shape.BOX,
                size: me.mesh.scale
            }
        });
    }
});

