Ext.application({
    requires: ['Orbium.view.Viewport', 'Ext.ComponentQuery'],
    name: 'Orbium',
    appFolder: 'app',
    controllers: ['Toolbar', 'World'],
    debug: true,
    launch: function() {


        Ext.create('Orbium.view.Viewport');
    },
    consoleLog: function(c) {
        if (Orbium.app.debug) {
            console.log(c);
        }
    }
});