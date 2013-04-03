Ext.define('Orbium.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Orbium.view.ToolbarBodies',
        'Orbium.view.ToolbarPlayer',
        'Orbium.view.World'
    ],
    alias: 'orbiumviewport',
    layout: 'column',
    initComponent: function() {
        this.items = [
            {
                xtype: 'orbiumtoolbarplayer'
            },
            {
                xtype: 'orbiumtoolbarbodies'
            },
            {
                xtype: 'world'
            }
        ];

        this.callParent();
            }
});