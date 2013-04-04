Ext.define('Orbium.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Orbium.view.ToolbarBodies',
        'Orbium.view.ToolbarPlayer',
        'Orbium.view.World',
        'Orbium.view.ChartWindow',
        'Orbium.view.CubeForm'
    ],
    alias: 'widget.orbiumviewport',
    layout: 'column',
    id: 'kuku',
    initComponent: function() {
        this.items = [
            {
                xtype: 'orbiumtoolbarplayer'
            },
            {
                xtype: 'orbiumtoolbarbodies'
            },   
            {
                xtype: 'orbiumcubeform'
            },
            {
                xtype: 'world'
            }
            
        ];

        this.callParent();
            }
});