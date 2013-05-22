
Ext.application({
    requires: ['Orbium.view.Viewport', 'Ext.ComponentQuery'],
    name: 'Orbium',
    appFolder: 'app',
    controllers: ['Toolbar', 'BodyMenu'],
    debug: true,
    launch: function() {
        Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
        Ext.create('Orbium.view.Viewport');        
    },
    consoleLog: function(c) {
        if (Orbium.app.debug) {
            console.log(c);
        }
    }
});