/**
 * Compoponent to render the world
 * -------------------------------
 * 
 * This component is intended to hold a canvas elemente
 * where the world will be rendered
 */

Ext.define('Orbium.view.World', {
    extend: 'Ext.Component',
    alias: 'widget.world',
    id: 'viewer',
    autoEl: {
        tag: 'div',
        cls: 'world'
    },
    onRender: function() {
        this.callParent();

        // And the world is created on the div hooked to the component
        Orbium.app.mundo = Ext.create('Orbium.world.World', this);
    }

});
