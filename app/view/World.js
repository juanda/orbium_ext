Ext.define('Orbium.view.World', {
    extend: 'Ext.Component',
    alias: 'widget.world',
    id: 'viewer',
    requires: [
        'Orbium.view.BodyMenu',
        'Orbium.view.ChartWindow',
        'Orbium.view.CubeForm',
        'Orbium.view.SphereForm'
    ],
    initComponent: function() {
        Orbium.app.consoleLog('initComponent de Orbium.view.World');

        this.callParent();

    }

});


