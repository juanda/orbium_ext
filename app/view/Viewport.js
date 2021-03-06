/**
 * Main Viewport
 * -------------
 *
 * It's the main container holding the UI elements
 */

Ext.define('Orbium.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Orbium.view.ToolbarBodies',
        'Orbium.view.ToolbarPlayer',
        'Orbium.view.World',
        'Orbium.world.World',
        'Orbium.view.BodyMenu'
    ],
    alias: 'widget.orbiumviewport',
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