Ext.define('Orbium.view.World', {
    extend: 'Ext.Component',
    alias: 'widget.world',
    id: 'viewer',
    
    
    initComponent: function() {
        Orbium.app.consoleLog('initComponent de Orbium.view.World');                
    },
    
    getViewer: function(){
        return Ext.get('viewer').dom;
    }
   
});


