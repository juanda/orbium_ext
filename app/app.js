/**
 * Orbium, yhe physisc simulator
 * -----------------------------
 *
 * Application boostrapping
 */

Ext.application({
    requires: [
        'Ext.ComponentQuery',
        'Orbium.view.Viewport',
        'Orbium.model.Cube',
        'Orbium.model.Sphere',
        'Orbium.model.Body'
    ],
    name: 'Orbium',
    appFolder: 'app',
    controllers: ['Toolbar', 'BodyMenu'],
    debug: true,
    launch: function() {
        // Removes the contexmenu associated to the right button
        Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});

        Ext.create('Orbium.view.Viewport');
    },
    consoleLog: function(c) {
        if (Orbium.app.debug) {
            console.log(c);
        }
    }
});