Ext.define('Orbium.controller.World', {
    extend: 'Ext.app.Controller',
    init: function() {

        this.control({
            'world': {
                render: this.onWorldRendered
            }
        });
    },
    onWorldRendered: function() {
        console.log('Orbium.controller.World worldRendered');
        
        worlds = Ext.ComponentQuery.query('world');
        console.log(worlds);
        world = worlds[0];    
        console.log(world.getViewer());
        
        mundo = Ext.create('Orbium.world.World', world);      
    }
});


