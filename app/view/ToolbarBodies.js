/**
 * Toolbar for bodies control
 * --------------------------
 * 
 * These tools are controlled by envents
 * on app/controller/Toolbar.js
 */

Ext.define('Orbium.view.ToolbarBodies', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.orbiumtoolbarbodies',
    width: 400,
    initComponent: function() {

        this.items = [
            {
                xtype: 'button',
                action: 'addCube',
                text: 'Add Cube'
            },
            {
                xtype: 'button',
                action: 'addBall',
                text: 'Add Ball'
            },
            {
                xtype: 'button',
                action: 'floor',
                text: 'Floor',
                enableToggle: true
            },
            {
                xtype: 'button',
                action: 'gravity',
                text: 'Gravity 0',
                enableToggle: true
            }
        ];

        this.callParent();
    }
});


