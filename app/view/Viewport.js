Ext.define('Orbium.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Orbium.view.Toolbar',
        'Orbium.view.World'
    ],
    alias: 'orbiumviewport',
    initComponent: function() {
        this.items = [
            {
                xtype: 'orbiumtoolbar'             
            },
            {
                xtype: 'world'
            }
        ];

        this.callParent();
    }
});