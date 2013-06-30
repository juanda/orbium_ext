/**
 * Toolbar for player control
 * --------------------------
 * 
 * These tools are controlled by envents
 * on app/controller/Toolbar.js
 */

Ext.define('Orbium.view.ToolbarPlayer', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.orbiumtoolbarplayer',
    width: 140,
    initComponent: function() {
        this.items = [
            {
                xtype: 'button',
                action: 'play',
                text: 'Play',
                enableToggle: true,
            },
            {
                xtype: 'button',
                action: 'reset',
                text: 'Reset'
            }
        ];

        this.callParent();
    }
});


