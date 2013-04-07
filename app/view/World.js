Ext.define('Orbium.view.World', {
    extend: 'Ext.Component',
    alias: 'widget.world',
    id: 'viewer',
    initComponent: function() {
        Orbium.app.consoleLog('initComponent de Orbium.view.World');
        var me = this;
        this.listeners = {
            el: {
                mousemove: function(e) {
//                    console.log(e.browserEvent.clientX);
                    me.mouseX = e.browserEvent.clientX;
                    me.mouseY = e.browserEvent.clientY;
                }
            }
        };
        this.callParent();
    },
    getViewer: function() {
        return Ext.get('viewer').dom;
    }

});


