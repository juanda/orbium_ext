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
                text: 'play'
            },
            {
                xtype: 'button',
                action: 'pause',
                text: 'pause'
            },
            {
                xtype: 'button',
                action: 'stop',
                text: 'stop'
            }
        ];

        this.callParent();
    }
});


