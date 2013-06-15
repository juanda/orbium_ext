/**
 * Toolbar 
 */

Ext.define('Orbium.view.ToolbarContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.orbiumtoolbarcontainer',
    layout: 'column',
    floating: true,
    draggable: true,
    
    initComponent: function() {
        
        this.items = [
            {
                xtype: 'orbiumtoolbarplayer'
            },
            {
                xtype: 'orbiumtoolbarbodies'
            }
        ];

        this.callParent();
    }
});


