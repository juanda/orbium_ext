/**
 * Main Viewport
 * -------------
 *
 * It's the main container holding the UI elements
 */

Ext.define('Orbium.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Orbium.view.ToolbarContainer',
        'Orbium.view.ToolbarBodies',
        'Orbium.view.ToolbarPlayer',
        'Orbium.view.World',
        'Orbium.world.World',
        'Orbium.view.BodyMenu'
    ],
    alias: 'widget.orbiumviewport',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start',
    },
    initComponent: function() {
        this.items = [            
            {
                xtype: 'world'
            }

        ];

        this.callParent();
    }
});