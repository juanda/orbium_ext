Ext.define('Orbium.controller.World', {
    extend: 'Ext.app.Controller',
    init: function() {

        this.control({
            'world': {
                render: this.onWorldRendered
            }
        });
    },
    requires: ['Orbium.world.World'],
    onWorldRendered: function() {
        Orbium.app.consoleLog('Orbium.controller.World worldRendered');
        
        var worlds = Ext.ComponentQuery.query('world');
        //Orbium.app.consoleLog(worlds);
        var world = worlds[0];    
        //Orbium.app.consoleLog(world.getViewer());
        
        // Creacion del mundo
        Orbium.app.mundo = Ext.create('Orbium.world.World', world);      
    }
});


